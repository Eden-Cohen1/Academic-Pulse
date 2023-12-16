<script setup>
const props = defineProps({
  text: {
    type: [String, Boolean],
  },
  type: String,
});
const isActive = ref(true);
const icon = {
  success: "icon-park-outline:success",
  error: "ph:seal-warning-bold",
};

onMounted(() => {
  isActive.value = true;
  setTimeout(() => {
    isActive.value = false;
  }, 7000);
});
</script>
<template>
  <main
    v-if="isActive"
    v-bind="$attrs"
    class="absolute bottom-4 left-0 right-0 z-20 ml-auto mr-auto flex h-14 w-72 items-center justify-between gap-4 rounded-xl border-[1px] border-solid bg-secondary p-3"
    :class="type"
  >
    <div class="">
      <Icon :name="icon[type]" class="h-auto w-7 text-txt" />
    </div>
    <div>
      <p class="text-sm text-txt">{{ text }}</p>
    </div>
    <div class="cursor-pointer">
      <button @click="isActive = false">
        <Icon
          name="material-symbols-light:close-small-rounded"
          class="h-auto w-7 text-txt"
        />
      </button>
    </div>
  </main>
</template>

<style scoped>
main {
  animation: 1.2s forwards slideInFromBottom;
}
@keyframes slideInFromBottom {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
