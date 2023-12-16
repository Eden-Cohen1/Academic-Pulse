<script setup>
const isActive = ref(false);
const classState = ref("hidden");
const icons = ref("solar:hamburger-menu-broken");
const changeState = () => {
  isActive.value = !isActive.value;
  icons.value = isActive.value
    ? "material-symbols-light:close-small-rounded"
    : "solar:hamburger-menu-broken";
  classState.value = isActive.value ? "active" : "hidden";
};
const darkMode = useDark();
const client = useSupabaseClient();
const logout = async () => {
  try {
    const { error } = await client.auth.signOut();
    if (error) throw error;
    navigateTo("/login");
  } catch (error) {
    errorMsg.value = error.message;
  }
};
</script>

<template>
  <div class="sticky flex justify-center">
    <div class="flex gap-3">
      <button :class="{ 'text-white': darkMode.isDark }">
        <icon :name="icons" class="h-auto w-8" @click="changeState" />
      </button>
      <ButtonDarkMode />
    </div>
    <div class="logo mt-2">
      <NuxtImg :src="darkMode.getLogo" />
    </div>
  </div>
  <main class="overflow-hidden bg-primary text-txt" :id="classState">
    <ul
      class="border-bot flex max-h-full flex-col items-center justify-center gap-5 pb-2 pt-5"
    >
      <NuxtLink
        class="border-bot w-full pb-1 text-center"
        @click="changeState"
        to="/"
        >Home</NuxtLink
      >
      <NuxtLink
        class="border-bot w-full pb-1 text-center"
        @click="changeState"
        to="/courses"
        >Add Courses</NuxtLink
      >
      <NuxtLink
        class="border-bot w-full pb-1 text-center"
        @click="changeState"
        to="/schedule"
        >My Schedule</NuxtLink
      >
      <button
        class="logout mb-3 max-h-9 w-28 cursor-pointer rounded-md text-center font-medium text-white shadow-sm"
        @click="logout"
      >
        Logout
      </button>
    </ul>
  </main>
</template>

<style scoped>
ul {
  top: 0;
}
#hidden {
  height: 0;
  transition: height 500ms;
}
#active {
  height: 12rem;
  transition: height 500ms;
}
#hidden a,
#hidden button {
  height: 0;
  transition: height 500ms;
}
#active a,
#active button {
  height: 2.3rem;
  transition: height 500ms;
}
.logo {
  left: 0;
  right: 0;
  top: 20px;
  width: 11rem;
  margin-left: auto;
  margin-right: auto;
  z-index: 10;
}
</style>
