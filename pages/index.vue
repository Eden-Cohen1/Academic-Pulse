<script setup>
definePageMeta({
  middleware: "auth",
});
const router = useRouter();
const client = useSupabaseClient();
const user = useSupabaseUser();
const errorMsg = ref(null);
const logout = async () => {
  try {
    const { error } = await client.auth.signOut();

    console.log(console.log(user.value));
    if (error) throw error;
  } catch (error) {
    errorMsg.value = error.message;
  }
};
watchEffect(() => {
  if (!user.value) {
    router.push("/login");
  }
});
</script>

<template>
  <main>
    <h1>MAIN APP PAGE</h1>
    <button class="primary-btn" @click="logout">Logout</button>
    <h1>{{ errorMsg }}</h1>
  </main>
</template>
