<script setup>
const client = useSupabaseClient();
const email = ref("");
const password = ref(null);
const errorMsg = ref(null);
const successMsg = ref(null);
const login = async () => {
  try {
    errorMsg.value = "";
    successMsg.value = "";
    let { data, error } = await client.auth.signInWithPassword({
      email: email?.value,
      password: password?.value,
    });
    if (error) throw error;
    else successMsg.value = "Check your email to confirm your account.";
  } catch (error) {
    errorMsg.value = error.message;
  }
};
const googleLogin = async () => {
  try {
    errorMsg.value = "";
    successMsg.value = "";
    let { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) throw error;
    else successMsg.value = "Check your email to confirm your account.";
  } catch (error) {
    errorMsg.value = error.message;
  }
};
</script>
<template>
  <main class="flex flex-col m-5">
    <form @submit.prevent="login" class="flex flex-col">
      <label class="block text-sm font-medium leading-6 pb-1 ml-3"
        >Email Adress</label
      >
      <input type="email" class="input m-auto mb-5" v-model="email" />
      <label class="block text-sm font-medium pb-1 ml-3">Password</label>
      <input type="password" class="input m-auto" v-model="password" />
      <NuxtLink
        to="login/reset"
        class="relative left-[13.5rem] w-fit text-btn hover:font-semibold cursor-pointer"
        ><small>Forgot password?</small></NuxtLink
      >
      <input
        type="submit"
        value="Login"
        class="btn-primary w-56 mt-4 mb-4 m-auto"
      />
      <small> {{ successMsg }} {{ errorMsg }}</small>
    </form>
    <p class="mb-6 mt-4 m-auto text-borderColor font-bold">
      <span class="bg-secondary p-[10px]">or</span>
    </p>
    <button class="google" @click="googleLogin">
      <img
        class="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Login with Google</span>
    </button>
  </main>
</template>

<style scoped>
p {
  width: 85%;
  text-align: center;
  border-bottom: 1px solid;
  line-height: 0.1em;
}
</style>
