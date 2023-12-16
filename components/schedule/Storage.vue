<script setup>
const props = defineProps({
  courses: {
    type: Array,
  },
});
const isActive = ref(false);
const hiddenState = ref("hidden");
const changeState = () => {
  isActive.value = !isActive.value;
  hiddenState.value = isActive.value ? "active" : "hidden";
};
const storageCourses = computed(() => {
  return props.courses?.filter((course) => {
    if (!course.year || !course.semester) {
      return course;
    }
  });
});
const finish = (item, emit) => {
  if (item.added) {
    item.added.element.year = null;
    item.added.element.semester = null;
    emit("course", item.added.element);
  }
};
defineEmits(["course"]);
</script>

<template>
  <div
    :id="hiddenState"
    class="fixed -right-5 top-[32%] z-20 order-2 flex h-[65%] max-w-[60%] overflow-y-auto overflow-x-hidden rounded-2xl rounded-br-none rounded-tr-none border-[1px] border-borderColor bg-third p-2 pr-5 md:top-[32%]"
  >
    <div class="order-1 flex h-full w-[20rem] flex-col items-center gap-2 pl-5">
      <h1
        class="m-2 rounded-xl bg-secondary p-3 text-center text-sm font-bold text-txt md:text-xl"
      >
        Courses Storage
      </h1>
      <draggable
        :list="storageCourses"
        group="courses"
        item-key="id"
        class="flex h-full w-[80%] flex-col gap-2"
        @change="finish($event, $emit)"
      >
        <template #item="{ element: course }">
          <div
            :id="course.status"
            class="course flex h-fit cursor-grab flex-col gap-0.5 rounded-lg border-[1px] border-btn bg-secondary p-2 text-center text-txt"
          >
            <h1 class="w-full break-words text-sm">{{ course.name }}</h1>
            <p class="text-xs text-txtLight">{{ course.number }}</p>
            <p class="text-xs text-txtLight">{{ course.points }} points</p>
          </div>
        </template>
      </draggable>
    </div>
    <button class="fixed h-[70%] text-txt" @click="changeState">
      <icon
        v-if="!isActive"
        name="streamline:interface-arrows-button-to-left-arrow-line-to-left"
      />
      <icon
        v-else
        name="streamline:interface-arrows-button-to-right-arrow-line-to-right"
      />
    </button>
  </div>
</template>

<style scoped>
.course,
svg {
  animation: hover-shrink 0.2s forwards;
}
.course:hover,
svg:hover {
  animation: hover-grow 0.2s forwards;
  color: var(--color-btn);
}

#hidden {
  width: 3rem;
  overflow-y: hidden;
  transition: width 500ms;
}
#active {
  width: 20rem;
  overflow-y: scroll;
  transition: width 500ms;
}
.course-list .course {
  width: 30%;
}
</style>
