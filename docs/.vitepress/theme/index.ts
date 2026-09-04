import DefaultTheme from "vitepress/theme";
import RepoDirectory from "./RepoDirectory.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("RepoDirectory", RepoDirectory);
  },
};
