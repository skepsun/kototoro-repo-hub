import { defineConfig } from "vitepress";

// Project-site friendly: set BASE_PATH in the GitHub Actions workflow,
// e.g. BASE_PATH=/kototoro-repo-hub/. Local dev and user/org pages use "/".
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  title: "Kototoro Repository Hub",
  description:
    "Community-maintained extension/source repository directory for Kototoro. Install repositories by clicking a button; Kototoro itself ships zero curated repositories.",
  lang: "en-US",
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["meta", { name: "theme-color", content: "#0f766e" }],
  ],
  themeConfig: {
    siteTitle: "Kototoro Repo Hub",
    nav: [
      { text: "Repositories", link: "/" },
      { text: "How to add", link: "/how-to-add" },
      { text: "Kototoro", link: "https://github.com/Kototoro-app/Kototoro" },
    ],
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Kototoro-app/Kototoro" },
    ],
    sidebar: [
      {
        text: "Repo Hub",
        items: [
          { text: "All repositories", link: "/" },
          { text: "How to add a repo", link: "/how-to-add" },
        ],
      },
    ],
    footer: {
      message: "Community-maintained repository directory for Kototoro",
      copyright: "Kototoro contributors",
    },
    outline: {
      level: [2, 3],
    },
  },
});
