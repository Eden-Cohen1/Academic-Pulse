<script setup>
const darkMode = useDark();
onMounted(() => {
  document.documentElement.classList.add("bg-primary");
});

onBeforeMount(() => {
  darkMode.isDark = JSON.parse(localStorage.getItem("isDark"));
  document.documentElement.classList.toggle("dark", darkMode.isDark);
});

watch(darkMode, () => {
  localStorage.setItem("isDark", JSON.stringify(darkMode.isDark));
});
</script>

<template>
  <main class="h-screen">
    <SeoKit />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<style scoped></style>
