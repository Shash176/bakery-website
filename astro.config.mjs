// @ts-check
import { defineConfig } from "astro/config";

// Deployed to GitHub Pages as a project site:
// https://<username>.github.io/bakery-website/
// `site` and `base` are updated automatically right before the first
// push once the GitHub username is known (see deploy step in chat).
export default defineConfig({
  site: "https://your-github-username.github.io",
  base: "/bakery-website/",
});
