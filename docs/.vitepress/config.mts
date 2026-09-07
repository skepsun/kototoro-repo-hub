import { defineConfig } from "vitepress";

// Project-site friendly: set BASE_PATH in the GitHub Actions workflow,
// e.g. BASE_PATH=/kototoro-repo-hub/. Local dev and user/org pages use "/".
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["meta", { name: "theme-color", content: "#0f766e" }],
  ],
  locales: {
    "/": {
      label: "English",
      lang: "en-US",
      title: "Kototoro Repo Hub",
      description:
        "Community-maintained extension/source repository directory for Kototoro. Install repositories by clicking a button; Kototoro itself ships zero curated repositories.",
      themeConfig: {
        siteTitle: "Kototoro Repo Hub",
        nav: [
          { text: "Repositories", link: "/" },
          { text: "How to add", link: "/how-to-add" },
          { text: "Kototoro", link: "https://github.com/Kototoro-app/Kototoro" },
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
    },
    "/zh/": {
      label: "简体中文",
      lang: "zh-CN",
      title: "Kototoro 仓库聚合站",
      description:
        "Kototoro 第三方源/扩展仓库社区维护目录。一键安装仓库；Kototoro 应用本身不内置、不推荐任何第三方仓库。",
      themeConfig: {
        siteTitle: "Kototoro 仓库聚合站",
        nav: [
          { text: "仓库列表", link: "/zh/" },
          { text: "如何添加", link: "/zh/how-to-add" },
          { text: "Kototoro", link: "https://github.com/Kototoro-app/Kototoro" },
        ],
        sidebar: [
          {
            text: "仓库聚合站",
            items: [
              { text: "全部仓库", link: "/zh/" },
              { text: "如何添加仓库", link: "/zh/how-to-add" },
            ],
          },
        ],
        footer: {
          message: "Kototoro 第三方仓库社区维护目录",
          copyright: "Kototoro contributors",
        },
        outline: {
          level: [2, 3],
        },
      },
    },
  },
  themeConfig: {
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Kototoro-app/Kototoro" },
    ],
  },
});
