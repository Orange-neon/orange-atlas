interface ReviewTest {
  slug: string;
  title?: string;
  href?: string;
  titleAliases?: string[];
  course?: string;
  unit?: string;
  questionDetails?: Record<string, Record<string, any>>;
}

interface SavedQuestion {
  id?: string | number;
  sourceId?: string | number;
  questionId?: string | number;
  displayId?: string | number;
  section?: string;
  type?: string;
  prompt?: string;
  choices?: string[];
  correctAnswer?: string;
  acceptedAnswers?: string[];
  displayAnswer?: string;
  explanation?: string;
  passage?: unknown;
  media?: string;
  englishAnswer?: boolean;
}

interface SavedAttempt {
  testSlug?: string;
  testTitle?: string;
  testHref?: string;
  href?: string;
  course?: string;
  unit?: string;
}

const normalizeLookupKey = (value: unknown) => String(value ?? "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/\.html?$/i, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

function lookupKeys(value: unknown) {
  let raw = String(value ?? "").trim();
  if (!raw) return [];
  try {
    raw = decodeURIComponent(raw);
  } catch {
    // Keep malformed historical values usable as plain text.
  }

  const withoutQuery = raw.split(/[?#]/, 1)[0];
  const pathParts = withoutQuery.split(/[\\/]/).filter(Boolean);
  const lastPart = pathParts.at(-1) === "index.html" ? pathParts.at(-2) : pathParts.at(-1);
  const candidates = [raw, withoutQuery, lastPart, lastPart?.replace(/\.html?$/i, "")];
  return [...new Set(candidates.map(normalizeLookupKey).filter(Boolean))];
}

function questionKeys(question: SavedQuestion) {
  const values = [question.id, question.sourceId, question.questionId, question.displayId];
  const keys = new Set<string>();
  for (const value of values) {
    if (value === undefined || value === null || value === "") continue;
    keys.add(String(value));
    const numericMatch = String(value).match(/(?:^|[^0-9])(\d+)(?:[^0-9]|$)/);
    if (numericMatch) keys.add(String(Number(numericMatch[1])));
  }
  return [...keys];
}

function detailFromSnapshot(question: SavedQuestion) {
  if (!question.prompt) return null;
  const choices = Array.isArray(question.choices) ? question.choices : [];
  return {
    id: question.sourceId ?? question.questionId ?? question.id ?? question.displayId ?? "",
    section: question.section || "Uncategorized",
    type: choices.length ? "mc" : (question.type || "free"),
    prompt: question.prompt,
    choices,
    correct: question.correctAnswer || "",
    answers: Array.isArray(question.acceptedAnswers) ? question.acceptedAnswers : [],
    display: question.displayAnswer || question.correctAnswer || question.acceptedAnswers?.[0] || "",
    explanation: question.explanation || "",
    passage: question.passage || null,
    media: question.media || "",
    englishAnswer: Boolean(question.englishAnswer),
  };
}

export function createReviewResolver(tests: ReviewTest[]) {
  const testsBySlug = new Map(tests.map((test) => [String(test.slug), test]));
  const testsByAlias = new Map<string, ReviewTest[]>();

  for (const test of tests) {
    const aliases = [test.slug, test.title, test.href, ...(test.titleAliases || [])];
    for (const alias of aliases) {
      for (const key of lookupKeys(alias)) {
        const matches = testsByAlias.get(key) || [];
        if (!matches.includes(test)) matches.push(test);
        testsByAlias.set(key, matches);
      }
    }
  }

  function resolveTest(attempt: SavedAttempt, question?: SavedQuestion): ReviewTest | null {
    const exact = testsBySlug.get(String(attempt.testSlug ?? ""));
    if (exact) return exact;

    const values = [attempt.testSlug, attempt.testHref, attempt.href, attempt.testTitle];
    for (const value of values) {
      for (const key of lookupKeys(value)) {
        const matches = testsByAlias.get(key) || [];
        if (matches.length === 1) return matches[0];

        if (matches.length > 1) {
          const contextualMatches = matches.filter((test) =>
            (!attempt.course || test.course === attempt.course)
            && (!attempt.unit || test.unit === attempt.unit)
            && (!question || questionKeys(question).some((id) => test.questionDetails?.[id])),
          );
          if (contextualMatches.length === 1) return contextualMatches[0];
        }
      }
    }

    return null;
  }

  function resolveQuestion(attempt: SavedAttempt, question: SavedQuestion) {
    const test = resolveTest(attempt, question);
    const snapshot = detailFromSnapshot(question);
    if (!test) return { test: null, detail: snapshot };

    const unresolvedRandomizedQuestion = test.slug.startsWith("ap-world-vocab-")
      && !question.displayId
      && !snapshot;
    if (unresolvedRandomizedQuestion) return { test, detail: null };

    for (const key of questionKeys(question)) {
      const detail = test.questionDetails?.[key];
      if (detail) return { test, detail };
    }

    return { test, detail: snapshot };
  }

  return { resolveTest, resolveQuestion };
}
