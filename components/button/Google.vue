<script setup>
defineProps({
  span: {
    type: String,
  },
});
defineEmits(["googleClick"]);
</script>
<template>
  <p class="m-auto mb-6 mt-2 font-bold text-borderColor">
    <span class="bg-secondary p-[10px]">or</span>
  </p>
  <button class="google" @click="$emit('googleClick')">
    <img
      class="h-6 w-6"
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
