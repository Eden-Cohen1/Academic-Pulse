// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
  ],
  imports: {
    dirs: ["stores"],
  },
  css: ["~/assets/main.css"],
  googleFonts: {
    families: {
      Montserrat: true,
      "Open+Sans": true,
      Roboto: true,
      Lato: true,
      "Space+Mono": true,
      Poppins: true,
      Playpen: true,
      "Playpen+Sans": true,
    },
  },
  tailwindcss: {},
  supabase: {
    redirectOptions: {
      login: "/login",
      exclude: ["/login/reset"],
    },
  },
});
