export default {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-sec)",
        btn: "var(--color-btn)",
        btnHover: "var(--color-btn-hover)",
        btnTxt: "var(--color-btn-txt)",
        txt: "var(--color-text)",
        borderColor: "var(--color-border)",
      },
    },
  },
  plugins: [],
};
