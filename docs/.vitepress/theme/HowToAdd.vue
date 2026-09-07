<script setup lang="ts">
import { tr } from "./i18n";
</script>

<template>
  <div class="how-to-add">
    <h1>{{ tr("How to add a repository", "如何添加仓库") }}</h1>

    <p>
      {{
        tr(
          "This directory is a plain VitePress site. The repository list lives in a single TypeScript data file:",
          "本站是一个 VitePress 站点。仓库列表统一维护在同一个 TypeScript 数据文件中：",
        )
      }}
    </p>

    <pre><code>docs/.vitepress/repo-catalog.ts</code></pre>

    <h2>{{ tr("Add or edit an entry", "添加或修改条目") }}</h2>

    <ol>
      <li>
        {{ tr("Edit", "编辑") }} <code>docs/.vitepress/repo-catalog.ts</code>
      </li>
      <li>
        {{ tr("Add or update an object in the", "在") }}
        <code>repos</code>
        {{ tr("array:", "数组中新增或更新一个对象：") }}
      </li>
    </ol>

    <pre><code class="language-ts">{
  kind: "MIHON",
  name: "Example Repo",
  url: "https://example.com/index.min.json",
  note: "Optional note shown on the card",
  contentTypes: ["MANGA"],
  languages: ["English", "Japanese"],
}</code></pre>

    <h3>kind</h3>
    <p>{{ tr("Must be one of the Kototoro unified source kinds:", "必须是 Kototoro 统一源类型之一：") }}</p>
    <table>
      <thead>
        <tr>
          <th>Kind</th>
          <th>{{ tr("Used for", "用途") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>JAR</td><td>{{ tr("Kototoro parser jar indexes", "Kototoro 解析器 JAR 索引") }}</td></tr>
        <tr><td>CLOUDSTREAM</td><td>{{ tr("CloudStream provider repositories", "CloudStream 源仓库") }}</td></tr>
        <tr><td>MIHON</td><td>{{ tr("Mihon/Tachiyomi extension repositories", "Mihon/Tachiyomi 扩展仓库") }}</td></tr>
        <tr><td>ANIYOMI</td><td>{{ tr("Aniyomi extension repositories", "Aniyomi 扩展仓库") }}</td></tr>
        <tr><td>IREADER</td><td>{{ tr("IReader extension repositories", "IReader 扩展仓库") }}</td></tr>
        <tr><td>LNREADER</td><td>{{ tr("LNReader plugin indexes", "LNReader 插件索引") }}</td></tr>
        <tr><td>LEGADO</td><td>{{ tr("Legado book source lists", "Legado 书源列表") }}</td></tr>
        <tr><td>TVBOX</td><td>{{ tr("TVBox source lists", "TVBox 源列表") }}</td></tr>
        <tr><td>TSUNDOKU</td><td>{{ tr("Tsundoku novel extension repositories", "Tsundoku 小说扩展仓库") }}</td></tr>
      </tbody>
    </table>

    <h3>contentTypes</h3>
    <p>
      {{
        tr(
          "One or more of MANGA, NOVEL, VIDEO.",
          "取值：MANGA（漫画）、NOVEL（小说）、VIDEO（视频），可填一个或多个。",
        )
      }}
    </p>

    <h3>languages</h3>
    <p>
      {{
        tr(
          "One or more language labels used on the site, e.g. English, Chinese, Japanese, French, Turkish, Multilingual.",
          "使用本站展示的语言标签，例如 English、Chinese、Japanese、French、Turkish、Multilingual。",
        )
      }}
    </p>

    <p>
      {{ tr("The site generates an", "站点会自动生成") }}
      <strong>Install / 安装</strong>
      {{ tr("link automatically:", "链接：") }}
    </p>

    <pre><code>kototoro://add-repo?url=&lt;encoded-url&gt;&amp;kind=&lt;KIND&gt;</code></pre>

    <p>
      {{ tr("Kototoro opens the add-repository dialog with the URL pre-filled.", "Kototoro 会打开添加仓库对话框并预填 URL。") }}
    </p>

    <h2>{{ tr("Test locally", "本地预览") }}</h2>
    <pre><code>npm install
npm run docs:dev</code></pre>

    <h2>{{ tr("Deploy", "部署") }}</h2>
    <p>
      {{
        tr(
          "Push to the main branch. The GitHub Actions workflow in .github/workflows/deploy-pages.yml builds and publishes the site to GitHub Pages. Set the repository's GitHub Pages source to GitHub Actions.",
          "推送到 main 分支后，.github/workflows/deploy-pages.yml 会自动构建并发布到 GitHub Pages。在仓库设置中把 Settings → Pages → Source 设为 GitHub Actions。",
        )
      }}
    </p>

    <h2>{{ tr("Maintenance notes", "维护说明") }}</h2>
    <p>
      {{
        tr(
          "Keep entries factual and up to date. If a repository stops working or no longer resolves, remove it or open a pull request with the fix.",
          "保持条目真实且及时更新。如果某个仓库已失效或不再可用，请移除该条目或提交 PR 修复。",
        )
      }}
    </p>
  </div>
</template>

<style scoped>
.how-to-add h1 {
  margin-bottom: 1rem;
}

.how-to-add pre {
  overflow-x: auto;
}
</style>
