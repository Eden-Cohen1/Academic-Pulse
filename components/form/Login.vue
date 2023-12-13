<script setup>
import suite from "~/validations/login";
const client = useSupabaseClient();
const formData = reactive({
  email: "",
  password: "",
});
const apiResponse = reactive({
  errorMsg: "",
  successMsg: "",
  loading: false,
});
let res = reactive(suite.get());
const login = async () => {
  try {
    apiResponse.loading = true;
    apiResponse.errorMsg = "";
    const { data, error } = await client.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) throw error;
    navigateTo("/");
  } catch (error) {
    apiResponse.errorMsg = error.message;
  } finally {
    apiResponse.loading = false;
  }
};
const googleLogin = async () => {
  try {
    apiResponse.errorMsg = "";
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/`,
      },
    });
    if (error) throw error;
  } catch (error) {
    apiResponse.errorMsg = error.message;
  }
};

const validate = (name) => {
  res = suite({ email: formData.email, password: formData.password }, name);
};
</script>
<template>
  <Alert
    v-if="apiResponse.errorMsg"
    :text="apiResponse.errorMsg"
    type="error"
  />
  <main class="flex flex-col m-5 mt-0">
    <form @submit.prevent="login" class="flex flex-col">
      <InputAuth
        v-model="formData.email"
        type="email"
        class="m-auto mb-5"
        :errors="res.getErrors('email')"
        label="Email Address"
        @update:modelValue="validate('email')"
      />
      <InputAuth
        v-model="formData.password"
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
      <ButtonSubmit
        :isValid="!res.isValid()"
        text="Login"
        class="w-56 m-auto mt-8 mb-4"
        :loading="formData.loading"
      />
    </form>
    <ButtonGoogle @googleClick="googleLogin" span="Login With Google" />
  </main>
</template>

<style scoped></style>
