import DefaultTheme from "vitepress/theme";
import RepoDirectory from "./RepoDirectory.vue";
import LanguageSwitch from "./LanguageSwitch.vue";
import BilingualHero from "./BilingualHero.vue";
import HowToAdd from "./HowToAdd.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("RepoDirectory", RepoDirectory);
    app.component("LanguageSwitch", LanguageSwitch);
    app.component("BilingualHero", BilingualHero);
    app.component("HowToAdd", HowToAdd);
  },
};
