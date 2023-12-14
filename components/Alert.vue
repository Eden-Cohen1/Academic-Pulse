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
    class="absolute bottom-4 ml-auto mr-auto left-0 right-0 flex gap-4 w-72 h-14 border-solid border-[1px] rounded-xl bg-secondary items-center justify-between p-3 z-20"
    :class="type"
  >
    <div class="">
      <Icon :name="icon[type]" class="text-txt w-7 h-auto" />
    </div>
    <div>
      <p class="text-sm text-txt">{{ text }}</p>
    </div>
    <div class="cursor-pointer">
      <button @click="isActive = false">
        <Icon
          name="material-symbols-light:close-small-rounded"
          class="text-txt w-7 h-auto"
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
