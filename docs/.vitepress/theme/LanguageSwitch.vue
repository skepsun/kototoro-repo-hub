<script setup lang="ts">
import { onMounted } from "vue";
import { applySystemLang, tr, isZh, toggleLang } from "./i18n";

onMounted(applySystemLang);
</script>

<template>
  <button
    type="button"
    class="lang-switch"
    :title="tr('Switch language', '切换语言')"
    @click="toggleLang"
  >
    {{ isZh ? "EN" : "中文" }}
  </button>
</template>

<style scoped>
.lang-switch {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
}

.lang-switch:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
</style>
