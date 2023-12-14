import { defineStore } from "pinia";

export const useDark = defineStore("darkMode", {
  state: () => {
    return {
      isDark: false,
    };
  },
  getters: {
    getLogo: (state) => {
      return state.isDark ? `logo-dark.png` : `logo.png`;
    },
  },
});
