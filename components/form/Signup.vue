<script setup>
import suite from "~/validations/signup";

const client = useSupabaseClient();
const fullName = ref("");
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const successMsg = ref("");
let res = reactive(suite.get());

const signUp = async () => {
  try {
    errorMsg.value = "";
    successMsg.value = "";
    const { data, error } = await client.auth.signUp({
      email: email?.value,
      password: password?.value,
      data: {
        name: fullName?.value,
      },
    });
    if (error) throw error;
    else successMsg.value = "Check your email to confirm your account.";
  } catch (error) {
    errorMsg.value = error.message;
  }
};
const googleSignUp = async () => {
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
  res = suite(
    { email: email.value, password: password.value, fullName: fullName.value },
    name
  );
};
</script>

<template>
  <main class="flex flex-col m-5 mt-0">
    <form @submit.prevent="signUp" class="flex flex-col">
      <InputAuth
        v-model="fullName"
        type="text"
        class="m-auto mb-5"
        :errors="res.getErrors('fullName')"
        label="Full Name"
        @update:modelValue="validate('fullName')"
        required
      />
      <InputAuth
        v-model="email"
        type=""
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
      <InputSubmit :isValid="!res.isValid()" text="Signup" class="w-56" />
      <div class="relative feedback h-5 top-1 w-fit m-auto">
        <small class="text-red-500">{{ errorMsg }}</small>
        <small class="text-green-500">{{ successMsg }}</small>
      </div>
    </form>

    <ButtonGoogle @googleClick="googleSignUp" span="Signup with Google" />
  </main>
</template>
