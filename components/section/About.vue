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
    class="grid grid-cols-1 h-fit justify-items-center pr-8 pl-8 md:pt-36 lg:pl-0 2xl:pl-32 lg:pr-8 2xl:pr-32 pt-12 pb-16"
  >
    <h1
      class="md:text-4xl text-2xl font-bold text-txt text-center md:justify-self-start md:ml-24 mt-12"
    >
      <span class="text-btn">How</span> does it work ?
    </h1>
    <div
      class="step flex flex-col md:flex-row gap-3 md:w-[80%] h-fit items-center md:items-start md:justify-around mt-24"
    >
      <div
        ref="text1"
        class="flex flex-col relative text-txt max-w-sm md:order-2 md:top-16 items-center text-center md:items-start md:text-left gap-2"
      >
        <h1 class="text-btn font-bold text-xl">Add Courses</h1>
        <p class="text-lg">
          Start by adding courses to your storage. Specify details like name,
          number, points, and status for each course.
        </p>
      </div>
      <div
        ref="image1"
        class="flex flex-col items-center gap-5 img max-w-lg h-auto"
      >
        <NuxtImg :src="images.add" />
      </div>
    </div>
    <div
      class="step flex flex-col md:flex-row md:w-[80%] h-fit items-center md:items-start md:justify-around gap-4 mt-40 md:mt-60"
    >
      <div
        ref="text2"
        class="flex flex-col relative text-txt max-w-sm md:top-16 items-center text-center md:items-start md:text-left gap-2"
      >
        <h1 class="text-btn font-bold text-xl">Arrange Plan</h1>
        <p class="text-lg">
          Arrange your academic plan easily by using our
          <b>Drag & Drop</b> planner. Add your courses and place them in the
          desired year/semester with a simple and user-friendly experience.
        </p>
      </div>
      <div
        ref="image2"
        class="flex flex-col items-center gap-5 img max-w-lg h-auto"
      >
        <NuxtImg :src="images.schedule" />
      </div>
    </div>
    <div
      class="flex flex-col w-full items-center md:gap-10 gap-5 mt-32 md:mt-44"
    >
      <h1 class="md:text-4xl text-2xl font-bold text-txt text-center">
        Keep track of your <span class="text-btn">Academic Pulse</span>
        <icon class="ml-2" name="bi:clipboard-pulse" />
      </h1>
      <button class="btn-primary w-60">
        <NuxtLink to="/courses">Get Started</NuxtLink>
      </button>
    </div>
  </main>
</template>
