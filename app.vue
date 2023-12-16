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

useSeoMeta({
  title: "Academic-Pulse",
  ogTitle: "Academic-Pulse",
  description:
    "Track your academic plan and arrange your learning schedule with a user friendly Drag&Drop system.",
  ogDescription:
    "Track your academic plan and arrange your learning schedule with a user friendly Drag&Drop system.",
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
