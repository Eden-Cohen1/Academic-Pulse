<script setup>
const location = useRoute().fullPath;
const { width } = screenWidth();
const isMobile = computed(() => {
  return width.value <= 767;
});
provide("isMobile", isMobile);
</script>
<template>
  <main v-show="!location.includes('login') && width">
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
