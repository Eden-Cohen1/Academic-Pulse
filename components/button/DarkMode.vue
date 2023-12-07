<script setup>
const darkMode = useDark();
const toggleDarkMode = () => {
  darkMode.isDark = !darkMode.isDark;
  document.documentElement.classList.toggle("dark", darkMode.isDark);
};
</script>

<template>
  <button class="text-txt top-6 left-5" @click="toggleDarkMode">
    <Icon v-if="darkMode.isDark" name="uil:moon" />
    <Icon v-else name="uil:sun" />
  </button>
</template>

<style scoped>
svg:hover {
  animation: hover-grow 0.2s forwards;
  color: var(--color-btn);
}
svg {
  width: 1.2rem;
  height: auto;
  animation: hover-shrink 0.2s forwards;
}
</style>
