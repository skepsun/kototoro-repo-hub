# 如何添加仓库

本站是一个 VitePress 站点。仓库列表统一维护在同一个 TypeScript 数据文件中：

```
docs/.vitepress/repo-catalog.ts
```

## 添加或修改条目

1. 编辑 `docs/.vitepress/repo-catalog.ts`。
2. 在 `repos` 数组中新增或更新一个对象：

```ts
{
  kind: "MIHON",
  name: "Example Repo",
  url: "https://example.com/index.min.json",
  note: "可选：卡片上显示的说明",
  contentTypes: ["MANGA"],
  languages: ["English", "Japanese"],
},
```

3. `kind` 必须是 Kototoro 统一源类型之一：

| Kind | 用途 |
| --- | --- |
| `JAR` | Kototoro 解析器 JAR 索引 |
| `CLOUDSTREAM` | CloudStream 源仓库 |
| `MIHON` | Mihon/Tachiyomi 扩展仓库 |
| `ANIYOMI` | Aniyomi 扩展仓库 |
| `IREADER` | IReader 扩展仓库 |
| `LNREADER` | LNReader 插件索引 |
| `LEGADO` | Legado 书源列表 |
| `TVBOX` | TVBox 源列表 |
| `TSUNDOKU` | Tsundoku 小说扩展仓库 |

4. `contentTypes` 取值：`MANGA`（漫画）、`NOVEL`（小说）、`VIDEO`（视频），可填一个或多个。
5. `languages` 使用本站展示的语言标签，例如 `English`、`Chinese`、`Japanese`、`French`、`Turkish`、`Multilingual`。

站点会自动生成 **安装** 链接：

```
kototoro://add-repo?url=<encoded-url>&kind=<KIND>
```

Kototoro 会打开添加仓库对话框并预填 URL。

## 本地预览

```bash
npm install
npm run docs:dev
```

## 部署

推送到 `main` 分支后，`.github/workflows/deploy-pages.yml` 会自动构建并发布到 GitHub Pages。在仓库设置中把 **Settings → Pages → Source** 设为 **GitHub Actions**。

## 维护说明

保持条目真实且及时更新。如果某个仓库已失效或不再可用，请移除该条目或提交 PR 修复。
