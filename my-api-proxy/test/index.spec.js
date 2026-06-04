import { env, createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker, {
  clientStatusForUpstream,
  modelCandidates,
  providerCandidates,
  shouldRetryUpstream,
  upstreamErrorMessage,
} from "../src/index.js";

const ALLOWED_ORIGIN = "https://orange-atlas.web.app";

function request(path = "/api/chat", init = {}) {
  return new Request(`https://worker.example${path}`, {
    ...init,
    headers: {
      Origin: ALLOWED_ORIGIN,
      ...(init.headers || {}),
    },
  });
}

async function fetchUnit(request) {
  const ctx = createExecutionContext();
  const response = await worker.fetch(request, env, ctx);
  await waitOnExecutionContext(ctx);
  return response;
}

describe("Orange Atlas API proxy", () => {
  it("handles CORS preflight for the deployed app", async () => {
    const response = await fetchUnit(request("/api/chat", { method: "OPTIONS" }));

    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(ALLOWED_ORIGIN);
    expect(response.headers.get("Access-Control-Allow-Methods")).toContain("POST");
    expect(response.headers.get("Access-Control-Allow-Headers")).toContain("Authorization");
  });

  it("does not echo untrusted origins", async () => {
    const response = await fetchUnit(request("/api/chat", {
      method: "OPTIONS",
      headers: {
        Origin: "https://example.com",
      },
    }));

    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });

  it("rejects non-POST requests", async () => {
    const response = await fetchUnit(request("/api/chat", { method: "GET" }));
    const payload = await response.json();

    expect(response.status).toBe(405);
    expect(payload.error).toBe("Method not allowed.");
  });

  it("requires a Firebase bearer token", async () => {
    const response = await fetchUnit(request("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "When do I use preterite?" }],
      }),
    }));
    const payload = await response.json();

    expect(response.status).toBe(401);
    expect(payload.error).toBe("Sign in with Google to use the tutor.");
  });

  it("rejects malformed Firebase tokens", async () => {
    const response = await fetchUnit(request("/api/chat", {
      method: "POST",
      headers: {
        Authorization: "Bearer not-a-jwt",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "When do I use preterite?" }],
      }),
    }));
    const payload = await response.json();

    expect(response.status).toBe(401);
    expect(payload.error).toBe("Sign in again to use the tutor.");
  });

  it("turns upstream auth errors into an actionable key message", () => {
    expect(upstreamErrorMessage(401, { error: { message: "No auth credentials found" } }))
      .toContain("OPENROUTER_API_KEY");
  });

  it("turns upstream billing errors into an actionable credits message", () => {
    expect(upstreamErrorMessage(402, { error: { message: "Insufficient credits" } }))
      .toContain("credits");
  });

  it("keeps configured models first and de-duplicates fallbacks", () => {
    const models = modelCandidates({
      OPENROUTER_MODEL: "example/primary:free",
      OPENROUTER_FALLBACK_MODELS: "example/backup:free, example/primary:free",
    });

    expect(models.slice(0, 2)).toEqual(["example/primary:free", "example/backup:free"]);
  });

  it("prefers Groq when a Groq key is configured", () => {
    const providers = providerCandidates({
      GROQ_API_KEY: "gsk_test",
      OPENROUTER_API_KEY: "sk-or-test",
      GROQ_MODEL: "llama-3.1-8b-instant",
      OPENROUTER_MODEL: "example/openrouter:free",
    });

    expect(providers[0].provider).toBe("groq");
    expect(providers[0].model).toBe("llama-3.1-8b-instant");
  });

  it("returns a client rate-limit status for upstream rate limits", () => {
    expect(clientStatusForUpstream(429, { error: { message: "Provider rate limit exceeded" } }))
      .toBe(429);
  });

  it("retries provider limits but not billing failures", () => {
    expect(shouldRetryUpstream(429, { error: { message: "Provider returned error" } }))
      .toBe(true);
    expect(shouldRetryUpstream(402, { error: { message: "Insufficient credits" } }))
      .toBe(false);
  });
});
