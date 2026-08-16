import { parse } from "acorn";

type StaticValue = string | number | boolean | null | StaticValue[] | { [key: string]: StaticValue };
type StaticRecord = { [key: string]: StaticValue };

export interface ReviewQuestionDetail {
  id: string | number;
  section: string;
  type: "mc" | "free";
  prompt: string;
  choices: string[];
  correct: string;
  answers: string[];
  display: string;
  explanation: string;
  passage: { title: string; body: string } | null;
  media: string;
  englishAnswer: boolean;
}

export interface LegacyTestData {
  questionDetails: Record<string, ReviewQuestionDetail>;
  questionCount: number;
  sections: string[];
}

const DECLARATIONS_TO_READ = new Set([
  "QS",
  "QUESTIONS",
  "PASSAGE",
  "READING_PASSAGE",
  "SECTIONS",
  "SECS",
]);

const isRecord = (value: unknown): value is StaticRecord =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const toStringValue = (value: StaticValue | undefined) =>
  value === undefined || value === null ? "" : String(value);

const toStringArray = (value: StaticValue | undefined) =>
  Array.isArray(value) ? value.map((item) => toStringValue(item)).filter(Boolean) : [];

function readStaticValue(node: any): StaticValue | undefined {
  if (!node) return undefined;

  if (node.type === "Literal") return node.value as StaticValue;

  if (node.type === "TemplateLiteral") {
    if (node.expressions.length) return undefined;
    return node.quasis.map((part: any) => part.value.cooked ?? part.value.raw).join("");
  }

  if (node.type === "UnaryExpression" && ["+", "-"].includes(node.operator)) {
    const argument = readStaticValue(node.argument);
    if (typeof argument !== "number") return undefined;
    return node.operator === "-" ? -argument : argument;
  }

  if (node.type === "ArrayExpression") {
    const values: StaticValue[] = [];
    for (const element of node.elements) {
      const value = readStaticValue(element);
      if (value === undefined) return undefined;
      values.push(value);
    }
    return values;
  }

  if (node.type === "ObjectExpression") {
    const value: StaticRecord = {};
    for (const property of node.properties) {
      if (property.type !== "Property" || property.kind !== "init" || property.computed) return undefined;
      const key = property.key.type === "Identifier"
        ? property.key.name
        : toStringValue(readStaticValue(property.key));
      const propertyValue = readStaticValue(property.value);
      if (!key || propertyValue === undefined) return undefined;
      value[key] = propertyValue;
    }
    return value;
  }

  return undefined;
}

function readDeclarations(source: string) {
  const declarations = new Map<string, StaticValue>();
  const inlineScripts = source.matchAll(/<script(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi);

  for (const match of inlineScripts) {
    let program: any;
    try {
      program = parse(match[1], { ecmaVersion: "latest", sourceType: "script" });
    } catch {
      continue;
    }

    for (const statement of program.body) {
      if (statement.type !== "VariableDeclaration") continue;
      for (const declaration of statement.declarations) {
        if (declaration.id?.type !== "Identifier" || !DECLARATIONS_TO_READ.has(declaration.id.name)) {
          continue;
        }
        const value = readStaticValue(declaration.init);
        if (value !== undefined) declarations.set(declaration.id.name, value);
      }
    }
  }

  return declarations;
}

function sectionTitles(declarations: Map<string, StaticValue>) {
  const sections = declarations.get("SECTIONS") ?? declarations.get("SECS");
  const titles = new Map<string, string>();
  if (!Array.isArray(sections)) return titles;

  for (const section of sections) {
    if (!isRecord(section)) continue;
    const id = toStringValue(section.id);
    const title = toStringValue(section.title ?? section.name ?? section.label ?? section.id);
    if (id && title) titles.set(id, title);
  }
  return titles;
}

function normalizeQuestion(
  question: StaticRecord,
  titles: Map<string, string>,
  passageBody: string,
): ReviewQuestionDetail | null {
  const id = question.id;
  const prompt = toStringValue(question.prompt);
  if ((typeof id !== "string" && typeof id !== "number") || !prompt) return null;

  const choices = toStringArray(question.ch ?? question.choices);
  const rawType = toStringValue(question.type).toLowerCase();
  const type = choices.length ? "mc" : "free";
  const correct = toStringValue(question.cor ?? question.correct);
  const display = toStringValue(question.disp ?? question.display ?? correct);
  const answers = toStringArray(question.acc ?? question.accepted ?? question.answers);
  if (type === "free") {
    for (const answer of [correct, display]) {
      if (answer && !answers.includes(answer)) answers.push(answer);
    }
  }

  const sectionId = toStringValue(question.secTitle ?? question.sec ?? question.s) || "Uncategorized";
  const hasPassage = Boolean(
    passageBody
      && (question.passage || question.showPassage || rawType === "reading" || rawType === "rd"),
  );

  return {
    id,
    section: titles.get(sectionId) ?? sectionId,
    type,
    prompt,
    choices,
    correct,
    answers,
    display: display || answers[0] || "",
    explanation: toStringValue(question.exp ?? question.explanation),
    passage: hasPassage ? { title: "Texto de lectura", body: passageBody } : null,
    media: toStringValue(question.media),
    englishAnswer: Boolean(question.eng),
  };
}

export function extractLegacyTestData(source: string): LegacyTestData {
  const declarations = readDeclarations(source);
  const questions = declarations.get("QUESTIONS") ?? declarations.get("QS");
  const passageBody = toStringValue(
    declarations.get("READING_PASSAGE") ?? declarations.get("PASSAGE"),
  );
  const titles = sectionTitles(declarations);
  const details = Array.isArray(questions)
    ? questions
        .filter(isRecord)
        .map((question) => normalizeQuestion(question, titles, passageBody))
        .filter((question): question is ReviewQuestionDetail => question !== null)
    : [];

  return {
    questionDetails: Object.fromEntries(details.map((question) => [String(question.id), question])),
    questionCount: details.length,
    sections: [...new Set(details.map((question) => question.section))],
  };
}
