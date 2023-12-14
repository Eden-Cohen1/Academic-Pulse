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
        <icon :name="icons" class="w-8 h-auto" @click="changeState" />
      </button>
      <ButtonDarkMode />
    </div>
    <div class="logo mt-2">
      <NuxtImg :src="darkMode.getLogo" />
    </div>
  </div>
  <main class="text-txt bg-primary overflow-hidden" :id="classState">
    <ul
      class="flex flex-col gap-5 items-center justify-center pt-5 pb-2 max-h-full border-bot"
    >
      <NuxtLink
        class="border-bot pb-1 w-full text-center"
        @click="changeState"
        to="/"
        >Home</NuxtLink
      >
      <NuxtLink
        class="border-bot pb-1 w-full text-center"
        @click="changeState"
        to="/courses"
        >Add Courses</NuxtLink
      >
      <NuxtLink
        class="border-bot pb-1 w-full text-center"
        @click="changeState"
        to="/schedule"
        >My Schedule</NuxtLink
      >
      <button
        class="logout rounded-md font-medium shadow-sm text-center cursor-pointer w-28 max-h-9 text-white mb-3"
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
