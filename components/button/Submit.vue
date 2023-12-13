<script setup>
const props = defineProps({
  isValid: {
    type: Boolean,
  },
  text: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
  },
});
</script>
<template>
  <button type="submit" class="btn-primary" v-bind="$attrs" :disabled="isValid">
    <Icon
      v-if="loading"
      name="eos-icons:three-dots-loading"
      class="relative w-11 h-auto bottom-2"
    />
    <p v-else>{{ text }}</p>
  </button>
</template>
