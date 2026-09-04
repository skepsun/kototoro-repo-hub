# Kototoro Repo Hub

Community-maintained repository directory for [Kototoro](https://github.com/Kototoro-app/Kototoro).

Kototoro intentionally ships **zero curated/preset repositories** in the app for legal
safety. This standalone repo hosts the directory as a VitePress site on GitHub Pages so
users can still discover repositories and install them with one tap.

Each repository card renders an **Install** button that opens Kototoro's unified source
manager through the deep link:

```
kototoro://add-repo?url=<encoded-url>&kind=<KIND>
```

Kototoro opens the add-repository dialog with the URL pre-filled; the user confirms before
anything is imported. Nothing is installed silently.

## Repository list

The source of truth is a single file:

```
docs/.vitepress/repo-catalog.ts
```

See [docs/how-to-add.md](docs/how-to-add.md) for the field reference and local test
commands.

## Local development

```bash
npm install
npm run docs:dev
```

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` builds and publishes
the site to GitHub Pages. In the repository settings, set **Settings → Pages → Source** to
**GitHub Actions**.

## Legal

This repository is an independent directory. The Kototoro developers do not host, bundle,
curate, or recommend any third-party repository. If you receive a valid takedown request,
open a pull request removing the entry.
