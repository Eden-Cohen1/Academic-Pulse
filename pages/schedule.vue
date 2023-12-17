<script setup>
const client = useSupabaseClient();
const modalOpen = ref(false);
const { data } = await getAllCourses(client);
const courses = ref(data);
const progress = reactive({
  donePoints: 0,
  allPoints: 0,
  upcoming: 0,
  inprogress: 0,
  finished: 0,
});
const cards = ref([]);
const messages = reactive({
  errorMsg: "",
  successMsg: "",
});

onMounted(() => {
  courses.value.forEach((course) => {
    progress.allPoints += course.points;
    if (course.status === "finished") {
      progress.donePoints += course.points;
      progress.finished += 1;
    } else if (course.status === "in-progress") progress.inprogress += 1;
    else {
      progress.upcoming += 1;
    }
    makeUniqueAndSort(course, cards);
  });
});
const addCard = (newCard) => {
  messages.errorMsg = makeUniqueAndSort(newCard, cards);
};
const updateCourses = (course) => {
  courses.value = courses.value.map((oldCourse) => {
    if (oldCourse.id === course.id) {
      return course;
    }
    return oldCourse;
  });
};
const deleteCard = (card) => {
  const cardIndex = cards.value.indexOf(card);
  if (cardIndex != -1) {
    cards.value.splice(cardIndex, 1);
    courses.value = courses.value.map((course) => {
      if (course.year === card.year && course.semester === card.semester) {
        course.year = null;
        course.semester = null;
      }
      return course;
    });
  }
};
</script>

<template>
  <Alert type="error" :text="messages.errorMsg" v-if="messages.errorMsg" />
  <Alert
    type="success"
    :text="messages.successMsg"
    v-if="messages.successMsg"
  />
  <main class="flex w-full flex-col">
    <ScheduleHeader />
    <div class="relative flex h-full min-h-screen w-full overflow-hidden">
      <ScheduleStorage :courses="courses" />
      <div
        class="mt-32 flex h-full w-full flex-col flex-wrap items-center gap-5 overflow-y-auto p-2 md:mt-12 md:flex-row md:p-16"
      >
        <div class="absolute left-5 top-5 flex items-start text-txt">
          <button @click="modalOpen = true">
            <icon
              name="material-symbols:add-box-outline-rounded"
              class="h-auto w-6"
            />
          </button>
          <button
            @click="updateCoursesDB(courses, messages)"
            class="btn-primary relative left-4 pt-1 text-sm"
          >
            Save
          </button>

          <div
            class="relative left-16 flex flex-col gap-2 text-txt sm:flex-row sm:items-center md:left-20"
          >
            <div class="flex items-center gap-2">
              <div
                class="ml-2 h-4 w-4 rounded-md border-[3px] border-borderColor"
              ></div>
              <p>Upcoming({{ progress.upcoming }})</p>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="ml-2 h-4 w-4 rounded-md border-[3px] border-orange-400"
              ></div>
              <p>In-proggess({{ progress.inprogress }})</p>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="ml-2 h-4 w-4 rounded-md border-[3px] border-btn"
              ></div>
              <p>Finished({{ progress.finished }})</p>
            </div>
          </div>
        </div>
        <p
          class="absolute left-5 top-16 w-fit rounded-lg border-[1px] border-borderColor p-2 text-sm font-semibold text-txt md:left-[85%] md:top-4 lg:left-[90%]"
        >
          {{ progress.donePoints }} / {{ progress.allPoints }} Points
        </p>
        <ScheduleCard
          v-for="card in cards"
          :card="card"
          :courses="courses"
          @course="updateCourses"
          @deleteClick="deleteCard"
        />
      </div>
    </div>
    <ScheduleModal
      v-if="modalOpen"
      @newCard="addCard"
      @close="modalOpen = false"
    />
  </main>
</template>
