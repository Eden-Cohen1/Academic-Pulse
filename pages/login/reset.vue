<script setup>
const client = useSupabaseClient();
const errorMsg = ref(null);
const successMsg = ref(null);
const email = ref(null);
const sendResetPass = async () => {
  try {
    successMsg.value = "";
    errorMsg.value = "";
    const { data, error } = await client.auth.resetPasswordForEmail(
      email?.value
    );
    if (error) throw error;
    successMsg.value = "Password-reset email sent!";
  } catch (error) {
    errorMsg.value = error.message;
  }
};
</script>

<template>
  <main class="flex content-center h-screen text-txt">
    <div
      class="form-div flex flex-col m-auto sm:w-fit border border-solid border-borderColor rounded-3xl bg-secondary max-h-80 w-[21rem]"
    >
      <div
        class="flex justify-around relative top-0 bg-btn w-full rounded-t-3xl content-center cursor-pointer"
      >
        <div class="w-full p-3 rounded-tl-3xl cursor-pointer">
          <h1 class="formHeader">Reset Password</h1>
        </div>
      </div>
      <div class="p-5 pt-7 pb-2">
        <form @submit.prevent="sendResetPass" class="flex flex-col gap-1">
          <InputAuth
            v-model="email"
            type="email"
            class="m-auto"
            :errors="[]"
            label="Account Email Address:"
          />
          <small class="text-xs flex-wrap pl-2 pb-3 pt-1 font-semibold">
            You'll receive an email to recover your password.
          </small>
          <div class="flex flex-col gap-0 items-center mb-1 h-18">
            <InputSubmit
              :isValid="false"
              text="Send"
              class="w-56 m-0 mt-1 ml-1"
            />
            <small class="text-red-500"> {{ errorMsg }} </small>
            <small class="text-green-500">{{ successMsg }} </small>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
