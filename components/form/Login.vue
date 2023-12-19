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
        class="m-auto"
        :errors="res.getErrors('email')"
        label="Email Address"
        @update:modelValue="validate('email')"
      />
      <small class="relative left-1 mb-5 w-fit text-gray-500 text-txt sm:left-4"
        ><b>Demo:</b> edenfortesting@gmail.com</small
      >
      <InputAuth
        v-model="formData.password"
        type="password"
        class="m-auto"
        :errors="res.getErrors('password')"
        label="Password"
        @update:modelValue="validate('password')"
      />
      <div class="flex">
        <small
          class="relative left-1 top-0.5 w-fit text-gray-500 text-txt sm:left-4"
          ><b>Demo:</b> 123456</small
        >
        <NuxtLink
          to="login/reset"
          class="relative left-[5rem] w-fit cursor-pointer text-btn hover:font-semibold sm:left-[8rem]"
          ><small>Forgot password?</small></NuxtLink
        >
      </div>
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
