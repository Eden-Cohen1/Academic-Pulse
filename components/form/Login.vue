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
  <main class="m-5 mt-0 flex flex-col">
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
        class="relative left-[11rem] w-fit cursor-pointer text-btn hover:font-semibold sm:left-[13.5rem]"
        ><small>Forgot password?</small></NuxtLink
      >
      <ButtonSubmit
        :isValid="!res.isValid()"
        text="Login"
        class="m-auto mb-4 mt-8 w-56"
        :loading="formData.loading"
      />
    </form>
    <ButtonGoogle
      @googleClick="googleSignUp(apiResponse, client)"
      span="Login With Google"
    />
  </main>
</template>
