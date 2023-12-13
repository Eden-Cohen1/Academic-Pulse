export function screenWidth() {
  const width = ref(0);

  function update(event) {
    width.value = window.innerWidth;
  }

  onMounted(() => {
    window.addEventListener("resize", update);
    update();
  });
  onUnmounted(() => {
    window.addEventListener("resize", update);
    update();
  });
  return { width };
}
