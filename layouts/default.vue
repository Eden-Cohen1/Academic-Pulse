<script setup>
const darkMode = ref(false);
const loginState = ref(true);
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  document.documentElement.classList.toggle("dark", darkMode.value);
};
</script>
<template>
  <main>
    <button class="themeBtn absolute text-txt" @click="toggleDarkMode">
      <Icon v-if="darkMode" name="uil:moon" />
      <Icon v-else name="uil:sun" />
    </button>
  </main>
  <slot />
</template>

<style scoped>
main {
  height: 30px;
}
</style>
