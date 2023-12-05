<script setup>
onMounted(() => {
  document.documentElement.classList.add("bg-primary");
});
</script>

<template>
  <main>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<style scoped></style>
