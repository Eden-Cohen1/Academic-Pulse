<script setup>
import suite from "~/validations/course";

const props = defineProps({
  name: {
    type: String,
  },
  number: {
    type: Number,
  },
  points: {
    type: Number,
  },
  courseId: {
    type: Number,
  },
  status: {
    type: String,
  },
});
const options = ["upcoming", "in-progress", "finished"];
const apiResponse = reactive({
  errorMsg: "",
});
const formData = reactive({
  courseName: props.name,
  number: props.number,
  points: props.points,
  courseId: props.courseId,
  status: props.status,
  isEdit: false,
});
let res = reactive(suite.get());

const validate = (name) => {
  res = suite(
    {
      name: formData.courseName,
      number: formData.number,
      points: formData.points,
    },
    name,
  );
};

defineEmits(["deleteClick", "updateCourses"]);
</script>

<template>
  <Alert
    type="error"
    :text="apiResponse.errorMsg"
    v-if="apiResponse.errorMsg"
  />
  <form
    @submit.prevent="saveChanges($emit, formData, apiResponse)"
    :id="status"
    class="relative grid w-full grid-cols-4 gap-4 overflow-hidden border-l-[2px] bg-secondary pb-3 pl-2 pr-16 text-txt"
  >
    <div class="flex flex-col">
      <label class="text-sm text-borderColor">Name</label>
      <p v-if="!formData.isEdit" class="text-xs md:text-sm">{{ name }}</p>
      <InputAuth
        v-else
        v-model="formData.courseName"
        class="w-16 rounded-lg p-1 text-xs md:w-fit"
        :placeholder="name"
        :errors="res.getErrors('name')"
        @update:modelValue="validate('name')"
      />
    </div>
    <div class="flex flex-col">
      <label class="text-sm text-borderColor">Number</label>
      <p v-if="!formData.isEdit" class="text-xs md:text-sm">{{ number }}</p>
      <InputAuth
        v-else
        v-model="formData.number"
        class="flex w-16 rounded-lg p-1 text-xs md:w-fit"
        :placeholder="number"
        :errors="res.getErrors('number')"
        @update:modelValue="validate('number')"
      />
    </div>
    <div class="flex flex-col">
      <label class="text-sm text-borderColor">Points</label>
      <p v-if="!formData.isEdit" class="text-xs md:text-sm">{{ points }}</p>
      <InputAuth
        v-else
        v-model="formData.points"
        class="w-16 rounded-lg p-1 text-xs md:w-fit"
        :placeholder="points"
        :errors="res.getErrors('points')"
        @update:modelValue="validate('points')"
      />
    </div>
    <div class="flex flex-col">
      <label class="text-sm text-borderColor">Status</label>
      <p class="text-xs md:text-sm" v-if="!formData.isEdit">{{ status }}</p>
      <select
        v-else
        required
        v-model="formData.status"
        class="mt-1 rounded-md border-[1px] border-borderColor bg-primary text-sm text-txt"
        name="status"
      >
        <option class="rounded-md" v-for="option in options" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div v-if="!formData.isEdit" class="absolute right-2 top-4 flex gap-3">
      <button @click="formData.isEdit = true">
        <icon name="material-symbols-light:edit-rounded" />
      </button>
      <button @click="$emit('deleteClick')">
        <icon name="ci:trash-full" />
      </button>
    </div>
    <div v-else class="absolute right-5 top-6 flex gap-3">
      <button type="submit">
        <icon name="ic:round-check-circle-outline" />
      </button>
    </div>
  </form>
</template>

<style scoped>
svg {
  animation: hover-shrink 0.2s forwards;
}
svg:hover {
  animation: hover-grow 0.2s forwards;
  color: var(--color-btn);
}
</style>
