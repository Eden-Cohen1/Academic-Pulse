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
  <main class="text-txt text-md">
    <nav
      class="sticky flex top-2 border-b border-borderColor w-full p-5 max-h-20 justify-between items-center bg-secondary"
    >
      <div class="flex gap-8">
        <ButtonDarkMode />
        <ul v-show="user" class="flex gap-10 nav-links">
          <a href="#">My Schedule</a>
          <a href="#">Add Courses</a>
        </ul>
      </div>
      <div class="logo mt-2.5" v-show="user">
        <NuxtImg :src="darkMode.getLogo" />
      </div>
      <div>
        <a class="logout" v-show="user" @click="logout">Logout</a>
      </div>
    </nav>
  </main>
  <slot />
</template>

<style scoped>
main {
  height: 30px;
}
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
