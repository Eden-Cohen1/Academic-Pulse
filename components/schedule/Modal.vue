<script setup>
const currentYear = new Date().getFullYear();
const YearOptions = [];
const semOptions = ["A", "B", "C"];
const formData = reactive({
  year: currentYear,
  semester: "A",
});
for (let y = 0; y <= 5; y++) {
  YearOptions.push(currentYear + y);
}
const addCard = (emit) => {
  const values = { year: formData.year, semester: formData.semester };
  emit("newCard", values);
  emit("close");
};

defineEmits(["newCard", "close"]);
</script>
<template>
  <main
    class="absolute top-[22%] left-4 w-64 h-fit bg-secondary rounded-xl p-5 border-[2px] border-borderColor"
  >
    <button @click="$emit('close')" class="absolute right-0 top-0 text-txt">
      <icon name="material-symbols-light:close-small-rounded" />
    </button>
    <form @submit.prevent="addCard($emit)" class="flex flex-col gap-2">
      <label class="text-txt">Choose a year:</label>

      <select name="years" v-model="formData.year">
        <option v-for="option in YearOptions" :value="option">
          {{ option }}
        </option>
      </select>
      <label class="text-txt">Choose a semester:</label>
      <select name="sem" v-model="formData.semester">
        <option v-for="option in semOptions" :value="option">
          {{ option }}
        </option>
      </select>
      <button class="btn-primary m-4" type="submit">Add</button>
    </form>
  </main>
</template>

<style scoped>
svg {
  width: 2rem;
  height: auto;
}
</style>
