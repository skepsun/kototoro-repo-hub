import { computed, ref } from "vue";

const STORAGE_KEY = "kototoro-lang";

// Keep the SSR initial value stable ("en") to avoid hydration mismatch.
// The real default (system language or saved preference) is applied on mount.
export const lang = ref<"en" | "zh">("en");

export const isZh = computed(() => lang.value === "zh");

export function applySystemLang() {
  if (typeof window === "undefined") {
    return;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "zh") {
    lang.value = stored;
    return;
  }
  const navLang = (navigator.language || "en").toLowerCase();
  lang.value = navLang.startsWith("zh") ? "zh" : "en";
}

export function setLang(value: "en" | "zh") {
  lang.value = value;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, value);
  }
}

export function toggleLang() {
  setLang(isZh.value ? "en" : "zh");
}

export function tr(en: string, zh: string): string {
  return isZh.value ? zh : en;
}
