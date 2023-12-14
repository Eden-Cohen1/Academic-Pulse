<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const errorMsg = ref("");
const darkMode = useDark();
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
  <main class="text-txt text-md h-[80px]">
    <nav
      class="sticky flex top-2 w-full p-5 max-h-20 justify-between items-center bg-primary"
    >
      <div class="flex gap-8">
        <ButtonDarkMode />
        <ul v-show="user" class="flex gap-10 nav-links items-center">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/courses">Add Courses</NuxtLink>
          <NuxtLink to="/schedule">My Schedule</NuxtLink>
          <button
            class="logout p-1 pl-2 pr-2 rounded-md font-medium shadow-sm text-center cursor-pointer max-h-9 text-white"
            v-show="user"
            @click="logout"
          >
            Logout
          </button>
        </ul>
      </div>
      <div class="flex gap-10 items-center">
        <div class="logo mt-4" v-show="user">
          <NuxtImg provider="random" :src="darkMode.getLogo" />
        </div>
      </div>
    </nav>
  </main>
</template>

<style scoped>
.nav-links a:hover {
  animation: hover-grow 0.2s forwards;
  color: var(--color-btn);
}
.nav-links a {
  animation: hover-shrink 0.2s forwards;
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
