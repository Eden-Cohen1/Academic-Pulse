<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  errors: {
    type: Array,
    default: [],
  },
  label: {
    type: String,
  },
  placeholder: {
    type: [String, Number],
    default: "",
  },
});
defineEmits(["update:modelValue", "update:modelValue"]);
</script>

<template>
  <div class="mb-0 flex flex-col">
    <div class="flex items-end">
      <label class="text-sm text-txt font-medium leading-6 ml-1">{{
        label
      }}</label>
      <p
        class="relative text-[0.7rem] ml-auto w-fit h-fit text-red-500"
        v-for="error in errors"
      >
        {{ error }}
      </p>
    </div>
    <input
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      :class="[`input max-w-full`, { 'border-red-400': errors.length }]"
    />
  </div>
</template>

<style scoped>
.error {
  border-color: red;
}
</style>
