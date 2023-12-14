// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-nocheck
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    "/": { prerender: true },
  },
  modules: [
    "nuxt-icon",
    "nuxt-gtag",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    ["@pinia/nuxt", { autoImports: ["defineStore"] }],
  ],
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
    image: {
      providers: {
        random: {
          provider: "netlify",
          netlify: {
            baseURl: "",
          },
        },
      },
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
        cssnano:
          process.env.NODE_ENV === "production"
            ? { preset: ["default", { discardComments: { removeAll: true } }] }
            : false, // disable cssnano when not in production
      },
    },
  },
});
