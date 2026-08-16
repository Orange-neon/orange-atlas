export const DEFAULT_COURSE = "Spanish 2";

export function inferUnitFromSlug(slug: string) {
  if (slug.startsWith("ap-world-vocab-")) return "Vocabulary & Geography";
  if (slug.startsWith("ap-world-reading-")) return "Chapters 1–2 Mixed Reading";
  if (slug.startsWith("ap-world-ch1-2-review")) return "Chapters 1–2 Content Review";
  if (slug.startsWith("final-")) return "Semester 2 Final Review";
  if (slug.startsWith("la-vivienda-")) return "Unidad 6 - La Vivienda";
  if (slug.startsWith("interpretive-")) return "Unidad 5 - La Tecnologia";
  if (slug.includes("tecnologia")) return "Unidad 5 - La Tecnologia";
  return DEFAULT_COURSE;
}
