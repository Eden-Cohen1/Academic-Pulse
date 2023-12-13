<script setup>
const props = defineProps({
  card: {
    type: Object,
  },
  courses: {
    type: Array,
  },
});
const cardCourses = computed(() => {
  return props.courses.filter((course) => {
    if (
      course.year === props.card.year &&
      course.semester === props.card.semester
    ) {
      return course;
    }
  });
});
const finish = (item, emit) => {
  if (item.added) {
    item.added.element.year = props.card.year;
    item.added.element.semester = props.card.semester;
    emit("course", item.added.element);
  }
};
defineEmits(["course", "deleteClick"]);
</script>

<template>
  <div
    class="flex flex-col card w-[80%] border-borderColor border-[2px] md:w-96 md:m h-80 rounded-3xl bg-third items-start"
  >
    <header
      class="relative flex justify-center items-center w-full h-12 rounded-t-3xl bg-secondary"
    >
      <h1 class="w-fit break-words text-md font-bold text-txt">
        {{ card.year }} - {{ card.semester }}
      </h1>
      <button class="absolute right-5" @click="$emit('deleteClick', card)">
        <icon name="ci:trash-full" class="hover:text-red-800 text-txt" />
      </button>
    </header>
    <div
      class="flex justify-center w-full h-full rounded-b-3xl overflow-x-hidden overflow-y-auto p-3"
    >
      <draggable
        :list="cardCourses"
        group="courses"
        item-key="id"
        class="flex flex-wrap gap-2 w-[90%] h-full"
        @change="finish($event, $emit)"
      >
        <template #item="{ element: course }">
          <div
            class="course flex flex-col rounded-lg h-fit bg-secondary text-txt text-center gap-0.5 border-btn border-[1px] p-1.5 cursor-grab"
            :id="course.status"
          >
            <h1
              class="w-full break-words text-sm text-semibold rounded-t-lg p-2 pb-0.5 pt-0.5"
            >
              {{ course.name }}
            </h1>
            <p class="text-txtLight text-xs">{{ course.number }}</p>
            <p class="text-txtLight text-xs">{{ course.points }} points</p>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.course {
  animation: hover-shrink 0.2s forwards;
}
.course:hover {
  animation: hover-grow 0.2s forwards;
  color: var(--color-btn);
}
</style>
