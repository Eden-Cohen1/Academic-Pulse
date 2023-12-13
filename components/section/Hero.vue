<script setup>
const darkMode = useDark();
const heroPath = computed(() => {
  return darkMode.isDark ? "hero-dark.png" : "hero.png";
});
</script>
<template>
  <main
    class="flex relative top-0 justify-center align-middle items-end border-b-[1px] border-borderColor w-screen pt-14"
  >
    <div class="relative flex flex-col gap-5">
      <h1 class="font-[900] text-center text-5xl md:text-7xl xl:text-8xl">
        Stay In Tune
      </h1>
      <h1 class="font-[900] text-center text-2xl md:text-4xl xl:text-5xl">
        With Your
        <span>Academic</span> Schedule
      </h1>
      <NuxtImg :src="heroPath" class="m-auto w-52 md:w-72" />
    </div>
  </main>
</template>

<style scoped>
main {
  background-image: url(hero-bg.png);
  background-repeat: no-repeat;
}
h1 {
  background: -webkit-linear-gradient(315deg, #33a06f, #00dc82 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
button {
  background: -webkit-linear-gradient(315deg, #33a06f, #00dc82 100%);
}
button:hover {
  background: -webkit-linear-gradient(315deg, #33a06f, #242323 200%);
}
.dark span {
  background: -webkit-linear-gradient(315deg, white, rgb(36, 36, 36) 120%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
span {
  background: -webkit-linear-gradient(315deg, black, rgb(141, 141, 141) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
