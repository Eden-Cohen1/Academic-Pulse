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
      class="relative bottom-2 h-auto w-11"
    />
    <p v-else>{{ text }}</p>
  </button>
</template>
