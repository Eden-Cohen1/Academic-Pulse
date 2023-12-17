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
      email?.value,
    );
    if (error) throw error;
    successMsg.value = "Password-reset email sent!";
  } catch (error) {
    errorMsg.value = error.message;
  }
};
</script>

<template>
  <main class="flex h-screen content-center text-txt">
    <div
      class="form-div m-auto flex max-h-80 w-[21rem] flex-col rounded-3xl border border-solid border-borderColor bg-secondary sm:w-fit"
    >
      <div
        class="relative top-0 flex w-full cursor-pointer content-center justify-around rounded-t-3xl bg-btn"
      >
        <div class="w-full rounded-tl-3xl p-3">
          <h1 class="formHeader">Reset Password</h1>
        </div>
      </div>
      <div class="p-5 pb-2 pt-7">
        <form @submit.prevent="sendResetPass" class="flex flex-col gap-1">
          <InputAuth
            v-model="email"
            type="email"
            class="m-auto"
            :errors="[]"
            label="Account Email Address:"
          />
          <small class="flex-wrap pb-3 pl-2 pt-1 text-xs font-semibold">
            You'll receive an email to recover your password.
          </small>
          <div class="h-18 mb-1 flex flex-col items-center gap-0">
            <ButtonSubmit
              :isValid="false"
              text="Send"
              class="m-0 ml-1 mt-1 w-56"
            />
            <small class="text-red-500"> {{ errorMsg }} </small>
            <small class="text-green-500">{{ successMsg }} </small>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
