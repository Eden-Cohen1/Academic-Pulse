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
    class="card md:m flex h-80 w-[80%] flex-col items-start rounded-3xl border-[2px] border-borderColor bg-third md:w-96"
  >
    <header
      class="relative flex h-12 w-full items-center justify-center rounded-t-3xl bg-secondary"
    >
      <h1 class="text-md w-fit break-words font-bold text-txt">
        {{ card.year }} - {{ card.semester }}
      </h1>
      <button class="absolute right-5" @click="$emit('deleteClick', card)">
        <icon name="ci:trash-full" class="text-txt hover:text-red-800" />
      </button>
    </header>
    <div
      class="flex h-full w-full justify-center overflow-y-auto overflow-x-hidden rounded-b-3xl p-3"
    >
      <draggable
        :list="cardCourses"
        group="courses"
        item-key="id"
        class="flex h-full w-[90%] flex-wrap gap-2"
        @change="finish($event, $emit)"
      >
        <template #item="{ element: course }">
          <div
            class="course flex h-fit cursor-grab flex-col gap-0.5 rounded-lg border-[1px] border-btn bg-secondary p-1.5 text-center text-txt"
            :id="course.status"
          >
            <h1
              class="text-semibold w-full break-words rounded-t-lg p-2 pb-0.5 pt-0.5 text-sm"
            >
              {{ course.name }}
            </h1>
            <p class="text-xs text-txtLight">{{ course.number }}</p>
            <p class="text-xs text-txtLight">{{ course.points }} points</p>
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
