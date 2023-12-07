<script setup>
import suite from "~/validations/login";
const client = useSupabaseClient();
const email = ref("");
const password = ref("");
const errorMsg = ref("");
let res = reactive(suite.get());
const login = async () => {
  try {
    errorMsg.value = "";
    const { data, error } = await client.auth.signInWithPassword({
      email: email?.value,
      password: password?.value,
    });
    if (error) throw error;
    navigateTo("/");
  } catch (error) {
    errorMsg.value = error.message;
  }
};
const googleLogin = async () => {
  try {
    errorMsg.value = "";
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/`,
      },
    });
    if (error) throw error;
  } catch (error) {
    errorMsg.value = error.message;
  }
};

const validate = (name) => {
  res = suite({ email: email.value, password: password.value }, name);
};
</script>
<template>
  <AlertWarning :text="errorMsg" class="alert" />
  <main class="flex flex-col m-5 mt-0">
    <form @submit.prevent="login" class="flex flex-col">
      <InputAuth
        v-model="email"
        name="email"
        type="email"
        class="m-auto mb-5"
        :errors="res.getErrors('email')"
        label="Email Address"
        @update:modelValue="validate('email')"
      />
      <InputAuth
        v-model="password"
        type="password"
        class="m-auto"
        :errors="res.getErrors('password')"
        label="Password"
        @update:modelValue="validate('password')"
      />

      <NuxtLink
        to="login/reset"
        class="relative left-[11rem] sm:left-[13.5rem] w-fit text-btn hover:font-semibold cursor-pointer"
        ><small>Forgot password?</small></NuxtLink
      >
      <InputSubmit :isValid="!res.isValid()" text="Login" class="w-56" />
    </form>
    <ButtonGoogle @googleClick="googleLogin" span="Login With Google" />
  </main>
</template>

<style scoped>
.alert {
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
