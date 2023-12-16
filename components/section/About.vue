<script setup>
import { animate, inView } from "motion";
const firstLoad = sessionStorage.getItem("firstLoad");
const text1 = ref(null);
const text2 = ref(null);
const image1 = ref(null);
const image2 = ref(null);

onMounted(() => {
  if (!firstLoad) {
    const options = { duration: 2 };
    inView(text1.value, (info) => {
      animate(info.target, { x: [800, 0], opacity: [0, 1] }, options);
    });
    inView(image2.value, (info) => {
      animate(info.target, { x: [800, 0], opacity: [0, 1] }, options);
    });
    inView(text2.value, (info) => {
      animate(info.target, { x: [-800, 0], opacity: [0, 1] }, options);
    });
    inView(image1.value, (info) => {
      animate(info.target, { x: [-800, 0], opacity: [0, 1] }, options);
    });
    sessionStorage.setItem("firstLoad", "1");
  }
});
const darkMode = useDark();
const images = computed(() => {
  if (darkMode.isDark) {
    return {
      add: `add-dark.png`,
      schedule: `schedule-dark.png`,
    };
  }
  return {
    add: `add.png`,
    schedule: `schedule.png`,
  };
});
</script>

<template>
  <main
    class="grid h-fit grid-cols-1 justify-items-center pb-16 pl-8 pr-8 pt-12 md:pt-36 lg:pl-0 lg:pr-8 2xl:pl-32 2xl:pr-32"
  >
    <h1
      class="mt-12 text-center text-2xl font-bold text-txt md:ml-24 md:justify-self-start md:text-4xl"
    >
      <span class="text-btn">How</span> does it work ?
    </h1>
    <div
      class="step mt-24 flex h-fit flex-col items-center gap-3 md:w-[80%] md:flex-row md:items-start md:justify-around"
    >
      <div
        ref="text1"
        class="relative flex max-w-sm flex-col items-center gap-2 text-center text-txt md:top-16 md:order-2 md:items-start md:text-left"
      >
        <h1 class="text-xl font-bold text-btn">Add Courses</h1>
        <p class="text-lg">
          Start by adding courses to your storage. Specify details like name,
          number, points, and status for each course.
        </p>
      </div>
      <div
        ref="image1"
        class="img flex h-auto max-w-lg flex-col items-center gap-5"
      >
        <NuxtImg :src="images.add" />
      </div>
    </div>
    <div
      class="step mt-40 flex h-fit flex-col items-center gap-4 md:mt-60 md:w-[80%] md:flex-row md:items-start md:justify-around"
    >
      <div
        ref="text2"
        class="relative flex max-w-sm flex-col items-center gap-2 text-center text-txt md:top-16 md:items-start md:text-left"
      >
        <h1 class="text-xl font-bold text-btn">Arrange Plan</h1>
        <p class="text-lg">
          Arrange your academic plan easily by using our
          <b>Drag & Drop</b> planner. Add your courses and place them in the
          desired year/semester with a simple and user-friendly experience.
        </p>
      </div>
      <div
        ref="image2"
        class="img flex h-auto max-w-lg flex-col items-center gap-5"
      >
        <NuxtImg :src="images.schedule" />
      </div>
    </div>
    <div
      class="mt-32 flex w-full flex-col items-center gap-5 md:mt-44 md:gap-10"
    >
      <h1 class="text-center text-2xl font-bold text-txt md:text-4xl">
        Keep track of your <span class="text-btn">Academic Pulse</span>
        <icon class="ml-2" name="bi:clipboard-pulse" />
      </h1>
      <button class="btn-primary w-60">
        <NuxtLink to="/courses">Get Started</NuxtLink>
      </button>
    </div>
  </main>
</template>
