<script setup lang="ts">
import { computed } from "vue";
import { repos, type RepoEntry } from "../repo-catalog";

const kindOrder = [
  "JAR",
  "MIHON",
  "ANIYOMI",
  "IREADER",
  "TSUNDOKU",
  "CLOUDSTREAM",
  "LNREADER",
  "LEGADO",
  "TVBOX",
] as const;

const kindLabels: Record<string, string> = {
  JAR: "Kototoro parser jars",
  MIHON: "Mihon / Tachiyomi",
  ANIYOMI: "Aniyomi",
  IREADER: "IReader",
  TSUNDOKU: "Tsundoku novels",
  CLOUDSTREAM: "CloudStream providers",
  LNREADER: "LNReader plugins",
  LEGADO: "Legado book sources",
  TVBOX: "TVBox sources",
};

const groups = computed(() => {
  const byKind = new Map<string, RepoEntry[]>();
  for (const repo of repos) {
    const list = byKind.get(repo.kind) ?? [];
    list.push(repo);
    byKind.set(repo.kind, list);
  }
  return kindOrder
    .filter((kind) => byKind.has(kind))
    .map((kind) => ({
      kind,
      label: kindLabels[kind] ?? kind,
      items: byKind.get(kind) ?? [],
    }));
});

function installHref(repo: RepoEntry): string {
  return `kototoro://add-repo?url=${encodeURIComponent(repo.url)}&kind=${encodeURIComponent(repo.kind)}`;
}
</script>

<template>
  <section v-for="group in groups" :key="group.kind" class="repo-group">
    <h3 :id="`kind-${group.kind.toLowerCase()}`">
      {{ group.label }}
      <span class="repo-count">{{ group.items.length }}</span>
    </h3>

    <div v-for="repo in group.items" :key="`${repo.kind}:${repo.url}`" class="repo-card">
      <div class="repo-title-line">
        <strong>{{ repo.name }}</strong>
        <span v-if="repo.nsfw" class="repo-nsfw">18+</span>
      </div>
      <code class="repo-url">{{ repo.url }}</code>
      <p v-if="repo.note" class="repo-note">{{ repo.note }}</p>
      <div class="repo-actions">
        <a class="install-button" :href="installHref(repo)">Install</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.repo-group {
  margin-top: 1.5rem;
}

.repo-count {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-left: 0.4rem;
}

.repo-title-line {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
</style>
