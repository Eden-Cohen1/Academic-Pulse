<script setup>
const darkMode = useDark();
const heroPath = computed(() => {
  return darkMode.isDark ? `hero-dark.png` : `hero.png`;
});
</script>
<template>
  <main
    class="relative top-0 flex w-screen items-end justify-center border-b-[1px] border-borderColor pt-14 align-middle"
  >
    <div class="relative flex flex-col gap-5">
      <h1 class="text-center text-5xl font-[900] md:text-7xl xl:text-8xl">
        Stay In Tune
      </h1>
      <h1 class="text-center text-2xl font-[900] md:text-4xl xl:text-5xl">
        With Your
        <span>Academic</span> Schedule
      </h1>
      <img :src="heroPath" class="m-auto w-52 md:w-72" />
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
  letter-spacing: -0.1rem;
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
