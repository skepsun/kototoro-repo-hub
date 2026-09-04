# How to add a repository

This directory is a plain VitePress site. The repository list lives in a single
TypeScript data file:

```
docs/.vitepress/repo-catalog.ts
```

## Add or edit an entry

1. Edit `docs/.vitepress/repo-catalog.ts`.
2. Add or update an object in the `repos` array:

```ts
{
  kind: "MIHON",
  name: "Example Repo",
  url: "https://example.com/index.min.json",
  note: "Optional note shown on the card",
  contentTypes: ["MANGA"],
  languages: ["English", "Japanese"],
},
```

3. `kind` must be one of the Kototoro unified source kinds:

| Kind | Used for |
| --- | --- |
| `JAR` | Kototoro parser jar indexes |
| `CLOUDSTREAM` | CloudStream provider repositories |
| `MIHON` | Mihon/Tachiyomi extension repositories |
| `ANIYOMI` | Aniyomi extension repositories |
| `IREADER` | IReader extension repositories |
| `LNREADER` | LNReader plugin indexes |
| `LEGADO` | Legado book source lists |
| `TVBOX` | TVBox source lists |
| `TSUNDOKU` | Tsundoku novel extension repositories |

4. `contentTypes` is one or more of `MANGA`, `NOVEL`, `VIDEO`.
5. `languages` is one or more of the language labels used on the site, e.g.
   `English`, `Chinese`, `Japanese`, `French`, `Turkish`, `Multilingual`.

The site generates an **Install** link automatically:

```
kototoro://add-repo?url=<encoded-url>&kind=<KIND>
```

Kototoro opens the repository dialog with the URL pre-filled.

## Test locally

```bash
npm install
npm run docs:dev
```

## Deploy

Push to the `main` branch. The GitHub Actions workflow in
`.github/workflows/deploy-pages.yml` builds the site and publishes it to GitHub Pages.
Set the repository's GitHub Pages source to **GitHub Actions**.

## Maintenance notes

Keep entries factual and up to date. If a repository stops working or no longer
resolves, remove it or open a pull request with the fix.
