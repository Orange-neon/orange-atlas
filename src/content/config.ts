import { defineCollection, z } from "astro:content";

const tests = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    duration: z.number(),
    difficulty: z.string(),
    description: z.string(),
    examCode: z.string().optional(),
    heroTitle: z.string().optional(),
    heroAccent: z.string().optional(),
    topbarTitle: z.string().optional(),
    questionCount: z.number().optional(),
    sourceCount: z.number().optional(),
    extraStatValue: z.union([z.string(), z.number()]).optional(),
    extraStatLabel: z.string().optional(),
    rules: z.array(z.string()).optional(),
    infographicTitle: z.string().optional(),
    infographicSrc: z.string().optional(),
    audioTitle: z.string().optional(),
    audioDescription: z.string().optional(),
    audioSrc: z.string().optional(),
    passagesJson: z.string().optional(),
    questionsJson: z.string().optional(),
  }),
});

export const collections = {
  tests,
};
