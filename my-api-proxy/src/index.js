const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
const FIREBASE_JWKS_URL = "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";
const DEFAULT_FIREBASE_PROJECT_ID = "orange-atlas";
const DEFAULT_MODEL = "mistralai/mistral-small-3.1-24b-instruct:free";
const DEFAULT_FALLBACK_MODELS = [
  "google/gemma-3-27b-it:free",
  "meta-llama/llama-3.3-70b-instruct:free",
];
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1200;
const MAX_TOTAL_CHARS = 4000;
const MAX_RESPONSE_TOKENS = 360;
const JWKS_CACHE_MS = 60 * 60 * 1000;

const ALLOWED_ORIGINS = new Set([
  "https://orange-atlas.web.app",
  "https://orange-atlas.firebaseapp.com",
  "https://orange-neon.github.io",
]);

let jwksCache = {
  expiresAt: 0,
  keys: [],
};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function corsHeaders(request) {
  const headers = new Headers({
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "3600",
    Vary: "Origin",
  });
  const origin = request.headers.get("Origin") || "";
  if (isAllowedOrigin(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }
  return headers;
}

function responseHeaders(request, extra = {}) {
  const headers = corsHeaders(request);
  headers.set("Cache-Control", "no-store");
  headers.set("X-Content-Type-Options", "nosniff");
  Object.entries(extra).forEach(([key, value]) => headers.set(key, value));
  return headers;
}

function jsonResponse(request, status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: responseHeaders(request, {
      "Content-Type": "application/json",
    }),
  });
}

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function decodeBase64UrlJson(value) {
  return JSON.parse(new TextDecoder().decode(decodeBase64Url(value)));
}

function bearerToken(request) {
  const authorization = request.headers.get("Authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

async function firebaseJwks() {
  if (jwksCache.keys.length && jwksCache.expiresAt > Date.now()) {
    return jwksCache.keys;
  }

  const response = await fetch(FIREBASE_JWKS_URL, {
    cf: {
      cacheEverything: true,
      cacheTtl: 3600,
    },
  });

  if (!response.ok) {
    throw new HttpError(502, "The tutor auth service is unavailable right now.");
  }

  const payload = await response.json();
  if (!Array.isArray(payload.keys)) {
    throw new HttpError(502, "The tutor auth service returned an unexpected response.");
  }

  jwksCache = {
    expiresAt: Date.now() + JWKS_CACHE_MS,
    keys: payload.keys,
  };

  return jwksCache.keys;
}

async function verifyFirebaseToken(request, env) {
  const token = bearerToken(request);
  if (!token) {
    throw new HttpError(401, "Sign in with Google to use the tutor.");
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new HttpError(401, "Sign in again to use the tutor.");
  }

  let header;
  let payload;
  try {
    header = decodeBase64UrlJson(parts[0]);
    payload = decodeBase64UrlJson(parts[1]);
  } catch {
    throw new HttpError(401, "Sign in again to use the tutor.");
  }

  const projectId = env.FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_PROJECT_ID;
  const issuer = `https://securetoken.google.com/${projectId}`;
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = Number(payload.exp);
  const issuedAt = Number(payload.iat);

  if (header.alg !== "RS256" || !header.kid) {
    throw new HttpError(401, "Sign in again to use the tutor.");
  }
  if (payload.aud !== projectId || payload.iss !== issuer || typeof payload.sub !== "string" || !payload.sub) {
    throw new HttpError(401, "Sign in again to use the tutor.");
  }
  if (!Number.isFinite(expiresAt) || !Number.isFinite(issuedAt) || expiresAt <= now || issuedAt > now + 300) {
    throw new HttpError(401, "Your sign-in expired. Sign in again to use the tutor.");
  }

  const keys = await firebaseJwks();
  const jwk = keys.find((key) => key.kid === header.kid);
  if (!jwk) {
    throw new HttpError(401, "Sign in again to use the tutor.");
  }

  const cryptoKey = await crypto.subtle.importKey(
    "jwk",
    jwk,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["verify"],
  );

  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    decodeBase64Url(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`),
  );

  if (!valid) {
    throw new HttpError(401, "Sign in again to use the tutor.");
  }

  return payload;
}

function cleanText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validateMessages(value) {
  if (!Array.isArray(value)) {
    throw new HttpError(400, "Send at least one message.");
  }

  const messages = value.slice(-MAX_MESSAGES).map((message) => {
    const role = message?.role === "assistant" ? "assistant" : message?.role === "user" ? "user" : "";
    const content = cleanText(message?.content, MAX_MESSAGE_CHARS);
    return { role, content };
  }).filter((message) => message.role && message.content);

  if (!messages.some((message) => message.role === "user")) {
    throw new HttpError(400, "Send at least one question.");
  }

  const totalChars = messages.reduce((total, message) => total + message.content.length, 0);
  if (totalChars > MAX_TOTAL_CHARS) {
    throw new HttpError(400, "Your chat is too long. Reset it and ask a shorter question.");
  }

  return messages;
}

function pageContext(value) {
  const path = cleanText(value?.path, 180) || "the current Orange Atlas page";
  const title = cleanText(value?.title, 180) || "Orange Atlas";
  return { path, title };
}

function systemPrompt(page) {
  return [
    "You are Atlas Tutor, a concise and encouraging Spanish 2 tutor for Orange Atlas.",
    "Help students understand grammar, vocabulary, and study strategy without doing entire graded assignments for them.",
    "Give short explanations, ask follow-up questions when needed, and include Spanish examples with English glosses.",
    "Keep replies under 120 words unless the student asks for more detail.",
    "Use simple Markdown for emphasis and lists, such as **bold** for key terms.",
    `The student is on: ${page.title} (${page.path}).`,
  ].join("\n");
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw new HttpError(400, "Send a valid JSON request.");
  }
}

function modelList(value) {
  return typeof value === "string"
    ? value.split(/[\s,]+/).map((model) => cleanText(model, 180)).filter(Boolean)
    : [];
}

export function modelCandidates(env = {}) {
  const models = [
    ...modelList(env.OPENROUTER_MODEL || DEFAULT_MODEL),
    ...modelList(env.OPENROUTER_FALLBACK_MODELS),
    ...DEFAULT_FALLBACK_MODELS,
  ];
  return [...new Set(models)].slice(0, 4);
}

function upstreamDetail(payload = {}) {
  const error = payload?.error || {};
  return cleanText(
    typeof error === "string" ? error : error.message || payload?.message,
    400,
  ).toLowerCase();
}

export function shouldRetryUpstream(status, payload = {}) {
  const detail = upstreamDetail(payload);

  if (status === 401 || status === 402 || status === 403) return false;
  if (detail.includes("credit") || detail.includes("billing")) return false;

  return status === 404
    || status === 429
    || status >= 500
    || detail.includes("rate limit")
    || detail.includes("temporarily")
    || detail.includes("provider returned error")
    || detail.includes("no endpoints");
}

export function clientStatusForUpstream(status, payload = {}) {
  const detail = upstreamDetail(payload);
  return status === 429 || detail.includes("rate limit") || detail.includes("quota") ? 429 : 502;
}

export function upstreamErrorMessage(status, payload = {}) {
  const detail = upstreamDetail(payload);

  if (status === 401 || status === 403) {
    return "The tutor backend's OpenRouter API key is not being accepted. Set OPENROUTER_API_KEY in Cloudflare and redeploy the Worker.";
  }

  if (status === 402 || detail.includes("credit") || detail.includes("billing")) {
    return "The tutor backend's OpenRouter account needs credits or billing enabled.";
  }

  if (status === 404 || detail.includes("model") || detail.includes("not found")) {
    return "The configured tutor model is not available. Update OPENROUTER_MODEL in the Worker config and redeploy.";
  }

  if (status === 429 || detail.includes("rate limit") || detail.includes("quota")) {
    return "The tutor hit an AI provider rate limit. Try again in a few minutes.";
  }

  return "The tutor is unavailable right now.";
}

async function openRouterChat(apiKey, model, messages, page) {
  const response = await fetch(OPENROUTER_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://orange-atlas.web.app",
      "X-OpenRouter-Title": "Orange Atlas",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt(page) },
        ...messages,
      ],
      max_tokens: MAX_RESPONSE_TOKENS,
      temperature: 0.35,
    }),
  });
  const payload = await response.json().catch(() => ({}));
  return { response, payload };
}

async function handleChat(request, env) {
  await verifyFirebaseToken(request, env);

  const apiKey = env.OPENROUTER_API_KEY || env.AI_API_KEY;
  if (!apiKey) {
    throw new HttpError(500, "The tutor backend is missing OPENROUTER_API_KEY.");
  }

  const body = await readJson(request);
  const messages = validateMessages(body.messages);
  const page = pageContext(body.page);
  const models = modelCandidates(env);
  let lastError = { status: 502, payload: {} };

  for (const [index, model] of models.entries()) {
    let upstream;
    try {
      upstream = await openRouterChat(apiKey, model, messages, page);
    } catch (error) {
      console.error("OpenRouter fetch failed", { model, error: error?.message || error });
      lastError = { status: 503, payload: { error: { message: "OpenRouter request failed." } } };
      if (index < models.length - 1) continue;
      break;
    }

    const { response, payload } = upstream;
    if (response.ok) {
      const reply = cleanText(payload?.choices?.[0]?.message?.content, 5000);
      if (reply) {
        return {
          reply,
          usage: payload.usage || null,
        };
      }

      lastError = { status: 502, payload: { error: { message: "The tutor returned an empty response." } } };
    } else {
      console.error("OpenRouter error", { status: response.status, model, error: payload?.error || payload });
      lastError = { status: response.status, payload };
    }

    if (index < models.length - 1 && shouldRetryUpstream(lastError.status, lastError.payload)) continue;
    break;
  }

  throw new HttpError(
    clientStatusForUpstream(lastError.status, lastError.payload),
    upstreamErrorMessage(lastError.status, lastError.payload),
  );
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    try {
      if (request.method !== "POST") {
        throw new HttpError(405, "Method not allowed.");
      }

      const payload = await handleChat(request, env);
      return jsonResponse(request, 200, payload);
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      const message = error instanceof Error ? error.message : "The tutor is unavailable right now.";

      if (!(error instanceof HttpError)) {
        console.error(error);
      }

      return jsonResponse(request, status, {
        error: message,
      });
    }
  },
};
