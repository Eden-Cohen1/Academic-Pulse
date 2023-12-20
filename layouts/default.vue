<script setup>
const isLoggedIn = computed(() => {
  return !useRoute().fullPath.includes("login");
});
const isMobile = computed(() => {
  return width.value <= 767;
});
provide("isMobile", isMobile);
</script>
<template>
  <main v-show="isLoggedIn">
    <MenuMobile v-if="isMobile" />
    <MenuDesktop v-else />
  </main>
  <slot />
</template>

<style scoped>
input {
  outline: none;
  min-height: 2.4rem;
}
</style>
