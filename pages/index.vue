<script setup>
onMounted(async () => {
  const location = useRoute().fullPath;
  checkInDbAndAddUser(location);
});
</script>

<template>
  <main class="flex flex-col pt-10 h-fit">
    <section>
      <SectionHero />
    </section>
    <section>
      <SectionAbout />
    </section>
  </main>
</template>

<style scoped></style>
