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
  <main class="flex content-center h-screen text-txt">
    <div
      class="form-div flex flex-col m-auto sm:w-fit border border-solid border-borderColor rounded-3xl bg-secondary max-h-80 w-[21rem]"
    >
      <div
        class="flex justify-around relative top-0 bg-btn w-full rounded-t-3xl content-center cursor-pointer"
      >
        <div class="w-full p-3 rounded-tl-3xl hover:bg-btnHover cursor-pointer">
          <h1 class="formHeader">Update Password</h1>
        </div>
      </div>
      <div class="p-5 pt-7 pb-2">
        <form @submit.prevent="update" class="flex flex-col">
          <InputAuth
            v-model="password"
            type="password"
            class="m-auto mt-1"
            :errors="[]"
            label="New Password:"
          />
          <InputSubmit :isValid="false" text="Reset Password" />
          <small> {{ successMsg }} {{ errorMsg }}</small>
        </form>
      </div>
    </div>
  </main>
</template>
