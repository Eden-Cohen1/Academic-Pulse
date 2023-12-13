<script setup>
const location = useRoute().fullPath;
const { width } = screenWidth();
const isMobile = computed(() => {
  return width.value <= 767;
});
provide("isMobile", isMobile);
</script>
<template>
  <main v-show="!location.includes('login')">
    <MenuMobile v-if="isMobile && width > 0" />
    <MenuDesktop v-else-if="width > 0" />
  </main>
  <slot />
</template>

<style scoped>
input {
  outline: none;
  min-height: 2.4rem;
}
</style>
