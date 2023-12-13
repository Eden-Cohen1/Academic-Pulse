<script setup>
import suite from "~/validations/signup";

const client = useSupabaseClient();
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
    name
  );
};
</script>

<template>
  <main class="flex flex-col m-5 mt-0">
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
        type="password"
        class="m-auto"
        :errors="res.getErrors('password')"
        label="Password"
        @update:modelValue="validate('password')"
      />
      <ButtonSubmit
        :isValid="!res.isValid()"
        text="Signup"
        class="w-56 m-auto mt-8 mb-4"
      />
      <div class="relative feedback h-5 top-1 w-fit m-auto"></div>
    </form>

    <ButtonGoogle
      @googleClick="googleSignUp(apiResponse, formData, client)"
      span="Signup with Google"
    />
  </main>
</template>
