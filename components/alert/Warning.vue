<script setup>
const props = defineProps({
  text: {
    type: [String, Boolean],
  },
});
const isWarn = ref(false);
watch(props.text, () => {
  if (props.text) {
    isWarn.value = true;
    setTimeout(() => {
      isWarn.value = false;
    }, 5000);
  }
});
</script>
<template>
  <main
    v-show="isWarn"
    class="absolute bottom-4 ml-auto mr-auto left-0 right-0 flex gap-4 w-72 h-14 border-solid border-[1px] rounded-xl border-red-500 bg-secondary items-center justify-between p-3"
  >
    <div class="">
      <Icon name="ph:seal-warning-bold" class="text-txt w-7 h-auto" />
    </div>
    <div>
      <p class="text-sm text-txt">{{ text }}</p>
    </div>
    <div class="cursor-pointer">
      <Icon
        name="material-symbols-light:close-small-rounded"
        class="text-txt w-7 h-auto"
      />
    </div>
  </main>
</template>

<style scoped></style>
