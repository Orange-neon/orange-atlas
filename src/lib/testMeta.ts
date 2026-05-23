export const DEFAULT_COURSE = "Spanish 2";

export function inferUnitFromSlug(slug: string) {
  if (slug.startsWith("final-")) return "Semester 2 Final Review";
  if (slug.startsWith("la-vivienda-")) return "Unidad 6 - La Vivienda";
  if (slug.startsWith("interpretive-")) return "Unidad 5 - La Tecnologia";
  if (slug.includes("tecnologia")) return "Unidad 5 - La Tecnologia";
  return DEFAULT_COURSE;
}
