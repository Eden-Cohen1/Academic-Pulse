<script setup>
const props = defineProps({
  courses: {
    type: Array,
  },
});
const isActive = ref(false);
const hiddenState = ref(isActive ? "active" : "hidden");
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
    class="fixed -right-5 md:top-[32%] top-[32%] flex order-2 h-[65%] max-w-[60%] overflow-y-auto overflow-x-hidden bg-third z-20 border-[1px] border-borderColor rounded-2xl rounded-tr-none rounded-br-none p-2 pr-5"
  >
    <div class="flex flex-col w-[20rem] h-full gap-2 order-1 items-center pl-5">
      <h1
        class="text-sm md:text-xl font-bold text-txt p-3 rounded-xl text-center bg-secondary m-2"
      >
        Courses Storage
      </h1>
      <draggable
        :list="storageCourses"
        group="courses"
        item-key="id"
        class="flex flex-col gap-2 w-[80%] h-full"
        @change="finish($event, $emit)"
      >
        <template #item="{ element: course }">
          <div
            :id="course.status"
            class="course flex flex-col rounded-lg h-fit p-2 bg-secondary text-txt text-center gap-0.5 border-btn border-[1px] cursor-grab"
          >
            <h1 class="w-full break-words text-sm">{{ course.name }}</h1>
            <p class="text-txtLight text-xs">{{ course.number }}</p>
            <p class="text-txtLight text-xs">{{ course.points }} points</p>
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
