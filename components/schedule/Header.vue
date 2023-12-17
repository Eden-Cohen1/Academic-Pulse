<script setup>
const client = useSupabaseClient();
const { width } = screenWidth();
const isMobile = computed(() => {
  return width.value < 640;
});
const exportXL = async () => {
  const courses = await getAllCourses(client);
  const coursesList = courses.data.map((course) => {
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
    class="border-bot flex h-40 w-full flex-col items-center border-t-[1px] border-borderColor p-5"
  >
    <div class="relative mt-5 flex items-center gap-1 md:gap-3">
      <header class="flex flex-col items-center gap-1 text-txt">
        <h1 class="text-l text-center font-bold md:text-xl">
          Darg & Drop To Arrange Your<span class="text-btn">
            Academic Schedule</span
          >
        </h1>
        <p class="text-sm font-medium md:text-lg" v-show="!isMobile">
          drag each course to it's year/semseter
        </p>
        <button class="btn-primary w-28" @click="exportXL">
          <icon name="file-icons:microsoft-excel" />
          Export
        </button>
      </header>
      <NuxtImg :src="`drag.png`" class="h-12 w-12" />
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
