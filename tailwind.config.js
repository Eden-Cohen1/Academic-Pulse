export default {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-sec)",
        third: "var(--color-third)",
        btn: "var(--color-btn)",
        btnHover: "var(--color-btn-hover)",
        btnTxt: "var(--color-btn-txt)",
        txt: "var(--color-text)",
        txtLight: "var(--color-light-text)",
        borderColor: "var(--color-border)",
      },
    },
  },
  plugins: [],
};
