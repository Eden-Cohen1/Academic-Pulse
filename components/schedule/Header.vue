<script setup>
const props = defineProps({
  courses: {
    type: Array,
  },
});
const { width } = screenWidth();
const isMobile = computed(() => {
  return width.value < 640;
});
const exportXL = async () => {
  const coursesList = props.courses.map((course) => {
    return {
      "Course Name": course.name,
      "Course Number": course.number,
      "Course Points": course.points,
      Year: course.year,
      Semester: course.semester,
      Status: course.status,
    };
  });
  const XLSX = await import(
    "https://cdn.sheetjs.com/xlsx-0.19.2/package/xlsx.mjs"
  );
  const worksheet = XLSX.utils.json_to_sheet(coursesList);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");
  XLSX.writeFile(workbook, "Courses List.xlsx", { compression: true });
};
</script>

<template>
  <div
    class="flex flex-col border-bot w-full h-40 items-center p-5 border-t-[1px] border-borderColor"
  >
    <div class="relative flex items-center mt-5 md:gap-3 gap-1">
      <header class="flex flex-col gap-1 items-center text-txt">
        <h1 class="text-l md:text-xl font-bold text-center">
          Darg & Drop To Arrange Your<span class="text-btn">
            Academic Schedule</span
          >
        </h1>
        <p class="font-medium text-sm md:text-lg" v-show="!isMobile">
          drag each course to it's year/semseter
        </p>
        <button class="btn-primary w-28" @click="exportXL">
          <icon name="file-icons:microsoft-excel" />
          Export
        </button>
      </header>
      <img :src="`drag.png`" class="w-12 h-12" />
    </div>
  </div>
</template>

<style scoped>
svg:hover {
  color: white;
  animation: none;
}
svg {
  animation: none;
}
</style>
