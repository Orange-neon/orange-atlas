const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret, defineString } = require("firebase-functions/params");
const admin = require("firebase-admin");

admin.initializeApp();

const openRouterApiKey = defineSecret("OPENROUTER_API_KEY");
const openRouterModel = defineString("OPENROUTER_MODEL", {
  default: "openai/gpt-5.2",
});

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const SITE_URL = "https://orange-atlas.web.app";
const MAX_MESSAGES = 12;
const MAX_INPUT_CHARS = 4000;
const MAX_RESPONSE_TOKENS = 600;
const MINUTE_LIMIT = 6;
const DAY_LIMIT = 30;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function json(res, status, payload) {
  res
    .status(status)
    .set("Cache-Control", "no-store")
    .set("X-Content-Type-Options", "nosniff")
    .json(payload);
}

function getBearerToken(req) {
  const header = req.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

function cleanText(value, maxLength) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function validateMessages(value) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new HttpError(400, "Send at least one message.");
  }

  const messages = value
    .slice(-MAX_MESSAGES)
    .map((message) => {
      const role = message?.role;
      const content = cleanText(message?.content, MAX_INPUT_CHARS);
      if ((role !== "user" && role !== "assistant") || !content) return null;
      return { role, content };
    })
    .filter(Boolean);

  if (!messages.length || !messages.some((message) => message.role === "user")) {
    throw new HttpError(400, "Send a valid user message.");
  }

  const inputChars = messages.reduce((total, message) => total + message.content.length, 0);
  if (inputChars > MAX_INPUT_CHARS) {
    throw new HttpError(413, "That message is too long. Try a shorter question.");
  }

  return messages;
}

async function verifyUser(req) {
  const token = getBearerToken(req);
  if (!token) throw new HttpError(401, "Sign in to use the Orange Atlas tutor.");

  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    throw new HttpError(401, "Your sign-in expired. Please sign in again.");
  }
}

async function enforceRateLimit(uid) {
  const db = admin.firestore();
  const now = Date.now();
  const today = new Date(now).toISOString().slice(0, 10);
  const ref = db.collection("chatRateLimits").doc(uid);

  await db.runTransaction(async (transaction) => {
    const snap = await transaction.get(ref);
    const data = snap.exists ? snap.data() || {} : {};

    const minuteStartedAt = Number(data.minuteStartedAt) || 0;
    const isSameMinute = now - minuteStartedAt < 60 * 1000;
    const minuteCount = isSameMinute ? Number(data.minuteCount) || 0 : 0;

    const isSameDay = data.dayKey === today;
    const dayCount = isSameDay ? Number(data.dayCount) || 0 : 0;

    if (minuteCount >= MINUTE_LIMIT) {
      throw new HttpError(429, "Slow down a little. Try again in about a minute.");
    }
    if (dayCount >= DAY_LIMIT) {
      throw new HttpError(429, "You reached today's tutor limit. Try again tomorrow.");
    }

    transaction.set(
      ref,
      {
        uid,
        minuteStartedAt: isSameMinute ? minuteStartedAt : now,
        minuteCount: minuteCount + 1,
        dayKey: today,
        dayCount: dayCount + 1,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  });
}

function makeSystemPrompt(page) {
  const path = cleanText(page?.path, 160) || "/";
  const title = cleanText(page?.title, 180) || "Orange Atlas";

  return [
    "You are Atlas, a warm, concise Spanish 2 tutor inside Orange Atlas.",
    "Help students with grammar, vocabulary, study strategies, and explanations for concepts like relative pronouns, preterite vs. imperfect, commands, subjunctive, audio comprehension, and test review.",
    "Give hints, examples, and short explanations. Do not simply provide direct answers to active practice-test questions; guide the student to reason it out.",
    "If a student asks for an answer, explain the relevant rule and ask them to try applying it.",
    "Keep replies focused, student-friendly, and usually under 180 words.",
    `Current page: ${title} (${path}).`,
  ].join(" ");
}

function usageFrom(data) {
  const usage = data?.usage || {};
  return {
    promptTokens: usage.prompt_tokens,
    completionTokens: usage.completion_tokens,
    totalTokens: usage.total_tokens,
  };
}

exports.chat = onRequest(
  {
    cors: false,
    memory: "256MiB",
    region: "us-central1",
    secrets: [openRouterApiKey],
    timeoutSeconds: 60,
  },
  async (req, res) => {
    try {
      if (req.method !== "POST") {
        res.set("Allow", "POST");
        throw new HttpError(405, "Use POST for chat requests.");
      }

      const user = await verifyUser(req);
      const messages = validateMessages(req.body?.messages);
      await enforceRateLimit(user.uid);

      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterApiKey.value()}`,
          "Content-Type": "application/json",
          "HTTP-Referer": SITE_URL,
          "X-OpenRouter-Title": "Orange Atlas",
        },
        body: JSON.stringify({
          model: openRouterModel.value() || "openai/gpt-5.2",
          messages: [
            { role: "system", content: makeSystemPrompt(req.body?.page) },
            ...messages,
          ],
          max_tokens: MAX_RESPONSE_TOKENS,
          temperature: 0.35,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        console.error("OpenRouter chat request failed", {
          status: response.status,
          error: data?.error || data,
        });
        throw new HttpError(502, "The tutor is unavailable right now. Try again soon.");
      }

      const reply = cleanText(data?.choices?.[0]?.message?.content, 5000);
      if (!reply) throw new HttpError(502, "The tutor did not return a response.");

      json(res, 200, { reply, usage: usageFrom(data) });
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      const message = error instanceof HttpError
        ? error.message
        : "Something went wrong with the tutor.";
      if (!(error instanceof HttpError)) console.error("Orange Atlas chat error", error);
      json(res, status, { error: message });
    }
  },
);
