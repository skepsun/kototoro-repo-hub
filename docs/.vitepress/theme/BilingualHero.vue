<script setup lang="ts">
import { withBase } from "vitepress";
import { tr } from "./i18n";
</script>

<template>
  <section class="bilingual-hero">
    <h1>{{ tr("Kototoro Repo Hub", "Kototoro 仓库聚合站") }}</h1>
    <p class="hero-text">{{ tr("Repository directory for Kototoro", "Kototoro 第三方仓库目录") }}</p>
    <p class="hero-tagline">
      {{
        tr(
          "Install extension and source repositories with one tap. Kototoro ships zero curated repositories — this site is maintained separately by the community.",
          "一键安装扩展和源仓库。Kototoro 应用本身不内置、不推荐任何第三方仓库，本站由社区独立维护。",
        )
      }}
    </p>
    <div class="hero-actions">
      <a class="hero-button primary" href="#repositories">
        {{ tr("Browse repositories", "浏览仓库") }}
      </a>
      <a class="hero-button" :href="withBase('/how-to-add')">
        {{ tr("How to add a repo", "如何添加仓库") }}
      </a>
    </div>
  </section>
</template>

<style scoped>
.bilingual-hero {
  padding: 2.5rem 0 1.25rem;
  text-align: center;
}

.bilingual-hero h1 {
  margin: 0 0 0.5rem;
  font-size: 2.2rem;
  line-height: 1.2;
}

.hero-text {
  margin: 0 0 0.6rem;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.hero-tagline {
  margin: 0 auto 1.5rem;
  max-width: 640px;
  font-size: 0.95rem;
  color: var(--vp-c-text-3);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 1.1rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.hero-button:hover {
  border-color: var(--vp-c-brand-1);
  text-decoration: none;
}

.hero-button.primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

.hero-button.primary:hover {
  background: var(--vp-c-brand-2);
  color: #fff;
}

@media (max-width: 640px) {
  .bilingual-hero {
    padding: 1.5rem 0 1rem;
  }

  .bilingual-hero h1 {
    font-size: 1.7rem;
  }

  .hero-text {
    font-size: 1.05rem;
  }
}
</style>
