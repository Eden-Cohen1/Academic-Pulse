<script setup>
defineProps({
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
  <input
    type="submit"
    :value="text"
    class="btn-primary mt-8 mb-4 m-auto"
    v-bind="$attrs"
    :disabled="isValid"
  />
  <!-- <Icon name="eos-icons:three-dots-loading" /> -->
</template>
