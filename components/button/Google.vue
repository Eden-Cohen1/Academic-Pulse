<script setup>
defineProps({
  span: {
    type: String,
  },
});
defineEmits(["googleClick"]);
</script>
<template>
  <p class="mb-6 mt-2 m-auto text-borderColor font-bold">
    <span class="bg-secondary p-[10px]">or</span>
  </p>
  <button class="google" @click="$emit('googleClick')">
    <img
      class="w-6 h-6"
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      alt="google logo"
    />
    <span>{{ span }}</span>
  </button>
</template>

<style scoped>
p {
  width: 85%;
  text-align: center;
  border-bottom: 1px solid;
  line-height: 0.1em;
}
</style>
