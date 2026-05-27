import { defineConfig } from "astro/config";

const site = process.env.ASTRO_SITE ?? "https://orange-neon.github.io";
const base = process.env.ASTRO_BASE ?? "/orange-atlas";

export default defineConfig({
  site,
  base,
});
