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
  <main class="flex flex-col w-full">
    <ScheduleHeader :courses="courses" />
    <div class="relative flex h-full w-full overflow-hidden min-h-screen">
      <ScheduleStorage :courses="courses" />
      <div
        class="w-full h-full flex flex-col md:flex-row flex-wrap items-center md:mt-12 mt-32 md:p-16 p-2 gap-5 overflow-y-auto"
      >
        <div class="absolute flex top-5 left-5 text-txt items-start">
          <button @click="modalOpen = true">
            <icon
              name="material-symbols:add-box-outline-rounded"
              class="w-6 h-auto"
            />
          </button>
          <button
            @click="updateCoursesDB(courses, messages)"
            class="relative btn-primary left-4 pt-1 text-sm"
          >
            Save
          </button>

          <div
            class="relative md:left-20 left-16 flex flex-col sm:flex-row text-txt gap-2 sm:items-center"
          >
            <div class="flex gap-2 items-center">
              <div
                class="w-4 h-4 border-borderColor border-[3px] rounded-md ml-2"
              ></div>
              <p>Upcoming({{ progress.upcoming }})</p>
            </div>
            <div class="flex gap-2 items-center">
              <div
                class="w-4 h-4 border-orange-400 border-[3px] rounded-md ml-2"
              ></div>
              <p>In-proggess({{ progress.inprogress }})</p>
            </div>
            <div class="flex gap-2 items-center">
              <div
                class="w-4 h-4 border-btn border-[3px] rounded-md ml-2"
              ></div>
              <p>Finished({{ progress.finished }})</p>
            </div>
          </div>
        </div>
        <p
          class="absolute left-5 lg:left-[90%] md:left-[85%] md:top-4 top-16 text-txt text-sm font-semibold p-2 border-borderColor border-[1px] rounded-lg w-fit"
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
