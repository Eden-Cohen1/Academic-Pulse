// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-nocheck
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1",
      title: "Academic-Pulse",
      meta: [
        {
          name: "description",
          content:
            "Track your academic plan and arrange your learning schedule.",
        },
      ],
    },
  },
  extends: ["nuxt-seo-kit"],
  runtimeConfig: {
    public: {
      siteName: "Academic-Pulse",
      siteUrl: "https://academic-pulse.netlify.app/",
      siteDescription:
        "Track your academic plan and arrange your learning schedule.",
      language: "en",
    },
  },
  devtools: { enabled: true },
  routeRules: {
    "/": { prerender: true },
  },
  modules: [
    "nuxt-icon",
    "nuxt-gtag",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxt/image-edge",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    ["@pinia/nuxt", { autoImports: ["defineStore"] }],
  ],
  gtag: {
    id: "G-FVQR5KRCXJ",
    config: {
      page_title: "Academic-Pulse",
    },
  },
  plugins: [{ src: "~/plugins/vuedraggable.js" }],
  imports: {
    dirs: ["stores"],
  },
  css: ["~/assets/main.css"],
  googleFonts: {
    families: {
      Poppins: true,
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/",
      exclude: ["/login/reset"],
    },
  },
  image: {
    provider: "netlify",
    netlify: {
      baseURl: process.env.IMAGES_URL || "",
    },
  },
});
