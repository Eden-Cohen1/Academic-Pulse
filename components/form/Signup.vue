<script setup>
import suite from "~/validations/signup";
const client = useSupabaseClient();
const inputType = computed(() => {
  return {
    type: isVisible.value ? "text" : "password",
    text: isVisible.value ? "hide password" : "show password",
  };
});
const isVisible = ref(false);
const formData = reactive({
  email: "",
  password: "",
  fullName: "",
});
const apiResponse = reactive({
  errorMsg: "",
  successMsg: "",
  loading: false,
});
let res = reactive(suite.get());

const validate = (name) => {
  res = suite(
    {
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
    },
    name,
  );
};
</script>

<template>
  <main class="m-5 mt-0 flex flex-col">
    <Alert
      v-if="apiResponse.errorMsg"
      :text="apiResponse.errorMsg"
      type="error"
    />
    <Alert
      v-if="apiResponse.successMsg"
      :text="apiResponse.successMsg"
      type="success"
    />
    <form
      @submit.prevent="signUp(apiResponse, formData, client)"
      class="flex flex-col"
    >
      <InputAuth
        v-model="formData.fullName"
        type="text"
        class="m-auto mb-5"
        :errors="res.getErrors('fullName')"
        label="Full Name"
        @update:modelValue="validate('fullName')"
        required
      />
      <InputAuth
        v-model="formData.email"
        type=""
        class="m-auto mb-5"
        :errors="res.getErrors('email')"
        label="Email Address"
        @update:modelValue="validate('email')"
      />
      <InputAuth
        v-model="formData.password"
        :type="inputType.type"
        class="m-auto"
        :errors="res.getErrors('password')"
        label="Password"
        @update:modelValue="validate('password')"
      />
      <NuxtLink
        @click="isVisible = !isVisible"
        class="relative left-1.5 w-fit cursor-pointer text-gray-400 underline hover:font-semibold sm:left-5"
        ><small>{{ inputType.text }}</small></NuxtLink
      >
      <ButtonSubmit
        :isValid="!res.isValid()"
        text="Signup"
        class="m-auto mb-4 mt-8 w-56"
      />
      <div class="feedback relative top-1 m-auto h-5 w-fit"></div>
    </form>
    <ButtonGoogle
      @googleClick="googleSignUp(apiResponse, client)"
      span="Signup with Google"
    />
  </main>
</template>
