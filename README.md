# Kototoro Repo Hub

Community-maintained directory of third-party source/extension repositories for [Kototoro](https://github.com/Kototoro-App/Kototoro).

Click **Install** on any repository card; Kototoro opens the add-repository dialog with the URL pre-filled. Nothing is installed automatically.

## Repository list

The source of truth is `docs/.vitepress/repo-catalog.ts`.

See [docs/how-to-add.md](docs/how-to-add.md) for the field reference and local test commands.

## Local development

```bash
npm install
npm run docs:dev
```

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` builds and publishes the site to GitHub Pages. In the repository settings, set **Settings → Pages → Source** to **GitHub Actions**.
