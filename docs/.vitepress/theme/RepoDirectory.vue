<script setup lang="ts">
import { computed, ref } from "vue";
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

const typeLabels: Record<string, string> = {
  MANGA: "Manga",
  NOVEL: "Novel",
  VIDEO: "Video",
};

const languagePriority = [
  "Multilingual",
  "English",
  "Chinese",
  "Japanese",
  "Korean",
  "French",
  "Italian",
  "Turkish",
  "Hindi",
  "Bengali",
  "Indonesian",
  "Ukrainian",
];

const query = ref("");
const activeKind = ref<string>("ALL");
const typeFilter = ref<string>("ALL");
const nsfwFilter = ref<string>("ALL");
const languageFilter = ref<string>("ALL");
const copiedKey = ref<string | null>(null);

const allGroups = computed(() => {
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

const kindChips = computed(() => {
  const total = repos.length;
  const rest = allGroups.value.map((group) => ({
    kind: group.kind,
    label: group.label,
    count: group.items.length,
  }));
  return [{ kind: "ALL", label: "All repositories", count: total }, ...rest];
});

const languageOptions = computed(() => {
  const present = new Set<string>();
  for (const repo of repos) {
    for (const language of repo.languages) {
      present.add(language);
    }
  }
  const sorted = [...present].sort((a, b) => {
    const ai = languagePriority.indexOf(a);
    const bi = languagePriority.indexOf(b);
    const ao = ai === -1 ? languagePriority.length : ai;
    const bo = bi === -1 ? languagePriority.length : bi;
    return ao - bo || a.localeCompare(b);
  });
  return sorted;
});

function matchesRepo(repo: RepoEntry): boolean {
  const q = query.value.trim().toLowerCase();
  if (q) {
    const haystack = `${repo.name} ${repo.url} ${repo.note ?? ""} ${repo.kind}`.toLowerCase();
    if (!haystack.includes(q)) {
      return false;
    }
  }

  if (typeFilter.value !== "ALL" && !repo.contentTypes.includes(typeFilter.value)) {
    return false;
  }

  if (nsfwFilter.value === "SFW" && repo.nsfw) {
    return false;
  }
  if (nsfwFilter.value === "NSFW" && !repo.nsfw) {
    return false;
  }

  if (languageFilter.value !== "ALL" && !repo.languages.includes(languageFilter.value)) {
    return false;
  }

  return true;
}

const visibleGroups = computed(() => {
  const groups = activeKind.value === "ALL"
    ? allGroups.value
    : allGroups.value.filter((group) => group.kind === activeKind.value);

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter(matchesRepo),
    }))
    .filter((group) => group.items.length > 0);
});

const visibleCount = computed(() => {
  return visibleGroups.value.reduce((sum, group) => sum + group.items.length, 0);
});

function repoKey(repo: RepoEntry): string {
  return `${repo.kind}:${repo.url}`;
}

function installHref(repo: RepoEntry): string {
  return `kototoro://add-repo?url=${encodeURIComponent(repo.url)}&kind=${encodeURIComponent(repo.kind)}`;
}

function fallbackCopy(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

async function copyUrl(repo: RepoEntry) {
  const text = repo.url;
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      copied = true;
    }
  } catch {
    copied = false;
  }
  if (!copied) {
    copied = fallbackCopy(text);
  }
  if (copied) {
    copiedKey.value = repoKey(repo);
    window.setTimeout(() => {
      if (copiedKey.value === repoKey(repo)) {
        copiedKey.value = null;
      }
    }, 1500);
  }
}
</script>

<template>
  <div class="repo-dir">
    <div class="repo-controls">
      <input
        v-model="query"
        type="search"
        class="repo-search"
        placeholder="Search by repository name, URL, or keyword..."
        aria-label="Search repositories"
      />

      <div class="repo-selects">
        <label class="repo-select">
          <span>Type</span>
          <select v-model="typeFilter">
            <option value="ALL">All types</option>
            <option value="MANGA">Manga</option>
            <option value="NOVEL">Novel</option>
            <option value="VIDEO">Video</option>
          </select>
        </label>

        <label class="repo-select">
          <span>NSFW</span>
          <select v-model="nsfwFilter">
            <option value="ALL">All</option>
            <option value="SFW">SFW only</option>
            <option value="NSFW">18+ only</option>
          </select>
        </label>

        <label class="repo-select">
          <span>Language</span>
          <select v-model="languageFilter">
            <option value="ALL">All languages</option>
            <option v-for="language in languageOptions" :key="language" :value="language">
              {{ language }}
            </option>
          </select>
        </label>
      </div>
    </div>

    <div class="repo-toolbar" aria-label="Repository type filter">
      <button
        v-for="chip in kindChips"
        :key="chip.kind"
        type="button"
        class="repo-chip"
        :class="{ active: activeKind === chip.kind }"
        @click="activeKind = chip.kind"
      >
        <span>{{ chip.label }}</span>
        <span class="repo-chip-count">{{ chip.count }}</span>
      </button>
    </div>

    <p class="repo-summary">
      Showing <strong>{{ visibleCount }}</strong> repositories
      <template v-if="activeKind !== 'ALL'"> in {{ kindLabels[activeKind] ?? activeKind }}</template>
      <template v-if="typeFilter !== 'ALL'"> · {{ typeLabels[typeFilter] }}</template>
      <template v-if="nsfwFilter !== 'ALL'"> · {{ nsfwFilter }}</template>
      <template v-if="languageFilter !== 'ALL'"> · {{ languageFilter }}</template>
      <template v-if="query.trim()"> · matching “{{ query.trim() }}”</template>
    </p>

    <p v-if="visibleCount === 0" class="repo-empty">
      No repositories match the current filters.
    </p>

    <section v-for="group in visibleGroups" :key="group.kind" class="repo-section">
      <div class="repo-section-heading">
        <h3 :id="`kind-${group.kind.toLowerCase()}`">{{ group.label }}</h3>
        <span class="repo-section-count">{{ group.items.length }}</span>
      </div>

      <div class="repo-grid">
        <article v-for="repo in group.items" :key="repoKey(repo)" class="repo-card">
          <div class="repo-card-top">
            <span class="repo-kind-badge" :class="`kind-${repo.kind.toLowerCase()}`">
              {{ repo.kind }}
            </span>
            <span v-if="repo.nsfw" class="repo-nsfw">18+</span>
          </div>

          <h4 class="repo-name">{{ repo.name }}</h4>

          <div class="repo-meta">
            <span v-for="type in repo.contentTypes" :key="type" class="repo-meta-tag">
              {{ typeLabels[type] ?? type }}
            </span>
            <span v-for="language in repo.languages" :key="language" class="repo-meta-tag language">
              {{ language }}
            </span>
          </div>

          <p v-if="repo.note" class="repo-note">{{ repo.note }}</p>

          <div class="repo-url-row">
            <code class="repo-url">{{ repo.url }}</code>
            <button
              type="button"
              class="repo-copy"
              :class="{ copied: copiedKey === repoKey(repo) }"
              @click="copyUrl(repo)"
            >
              {{ copiedKey === repoKey(repo) ? "Copied" : "Copy" }}
            </button>
          </div>

          <div class="repo-actions">
            <a class="install-button" :href="installHref(repo)">Install</a>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.repo-dir {
  margin-top: 0.25rem;
}

.repo-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.repo-search {
  width: 100%;
  padding: 0.6rem 0.85rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.repo-search:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.repo-selects {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.repo-select {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.repo-select select {
  padding: 0.35rem 0.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.82rem;
}

.repo-toolbar {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.25rem 0 0.75rem;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
}

.repo-chip {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}

.repo-chip:hover {
  border-color: var(--vp-c-brand-1);
}

.repo-chip.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

.repo-chip-count {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.05rem 0.45rem;
  border-radius: 999px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
}

.repo-chip.active .repo-chip-count {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.repo-summary {
  margin: 0.5rem 0 1rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.repo-empty {
  padding: 1.5rem 0;
  text-align: center;
  color: var(--vp-c-text-3);
}

.repo-section {
  margin-top: 1.75rem;
}

.repo-section-heading {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.repo-section-heading h3 {
  margin: 0;
  font-size: 1.25rem;
}

.repo-section-count {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
}

.repo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 0.9rem;
}

.repo-card {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
}

.repo-card:hover {
  border-color: var(--vp-c-brand-2);
  box-shadow: 0 8px 24px rgba(15, 118, 110, 0.12);
  transform: translateY(-1px);
}

.repo-card-top {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.repo-kind-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.12rem 0.55rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.kind-jar { background: rgba(99, 102, 241, 0.12); color: #6366f1; }
.kind-mihon { background: rgba(15, 118, 110, 0.12); color: #0f766e; }
.kind-aniyomi { background: rgba(249, 115, 22, 0.12); color: #ea580c; }
.kind-ireader { background: rgba(37, 99, 235, 0.12); color: #2563eb; }
.kind-tsundoku { background: rgba(147, 51, 234, 0.12); color: #9333ea; }
.kind-cloudstream { background: rgba(8, 145, 178, 0.12); color: #0e7490; }
.kind-lnreader { background: rgba(219, 39, 119, 0.12); color: #db2777; }
.kind-legado { background: rgba(101, 163, 13, 0.12); color: #4d7c0f; }
.kind-tvbox { background: rgba(87, 83, 78, 0.14); color: #57534e; }

.repo-nsfw {
  font-size: 0.68rem;
  font-weight: 700;
  color: #b91c1c;
  border: 1px solid #fca5a5;
  border-radius: 999px;
  padding: 0.03rem 0.45rem;
}

.repo-name {
  margin: 0;
  font-size: 1rem;
  line-height: 1.35;
}

.repo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.repo-meta-tag {
  font-size: 0.7rem;
  padding: 0.08rem 0.45rem;
  border-radius: 999px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
}

.repo-meta-tag.language {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.repo-note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.repo-url-row {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: auto;
}

.repo-url {
  flex: 1;
  min-width: 0;
  padding: 0.4rem 0.55rem;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  font-size: 0.74rem;
  line-height: 1.4;
  word-break: break-all;
  color: var(--vp-c-text-2);
}

.repo-copy {
  flex: 0 0 auto;
  padding: 0.35rem 0.65rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
}

.repo-copy:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.repo-copy.copied {
  border-color: #16a34a;
  color: #16a34a;
  background: rgba(22, 163, 74, 0.08);
}

.repo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.install-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 1rem;
  border-radius: 10px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  transition: background 0.15s ease;
}

.install-button:hover {
  background: var(--vp-c-brand-2);
  color: #fff;
  text-decoration: none;
}

@media (max-width: 640px) {
  .repo-grid {
    grid-template-columns: 1fr;
  }

  .repo-selects {
    flex-direction: column;
    align-items: stretch;
  }

  .repo-select {
    justify-content: space-between;
  }

  .repo-select select {
    flex: 1;
  }

  .repo-url-row {
    flex-direction: column;
  }

  .repo-copy {
    align-self: flex-end;
  }
}
</style>
