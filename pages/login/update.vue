<script setup>
const client = useSupabaseClient();
const errorMsg = ref(null);
const successMsg = ref(null);
const password = ref(null);
const update = async () => {
  try {
    errorMsg.value = "";
    successMsg.value = "";
    const { data, error } = await client.auth.updateUser({
      password: password.value,
    });
    console.log(data);
    if (error) throw error;
    successMsg.value = "password has been successfully updated";
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
        <div class="w-full cursor-pointer rounded-tl-3xl p-3">
          <h1 class="formHeader">Update Password</h1>
        </div>
      </div>
      <div class="p-5 pb-2 pt-7">
        <form @submit.prevent="update" class="flex flex-col">
          <InputAuth
            v-model="password"
            type="password"
            class="m-auto mt-1"
            :errors="[]"
            label="New Password:"
          />
          <ButtonSubmit
            :isValid="false"
            text="Reset Password"
            class="m-auto mt-5 w-48"
          />
          <small v-show="errorMsg" class="m-auto mb-2 mt-2 text-red-500">
            {{ errorMsg }}</small
          >
          <small v-show="successMsg" class="m-auto mb-2 mt-2 text-green-500">
            {{ successMsg }}
          </small>
        </form>
      </div>
    </div>
  </main>
</template>
