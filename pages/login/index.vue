<script setup>
const loginState = ref(true);
const user = useSupabaseUser();
const router = useRouter();
watchEffect(() => {
  if (user.value) {
    router.push("/");
  }
});
</script>
<template>
  <main class="flex content-center h-screen text-txt">
    <div
      class="form-div flex flex-col m-auto w-96 border border-solid border-borderColor rounded-3xl bg-secondary"
    >
      <div
        class="flex justify-around relative top-0 bg-btn w-full mb-10 rounded-t-3xl content-center cursor-pointer"
      >
        <div
          :class="[
            'w-full p-3 rounded-tl-3xl hover:bg-btnHover cursor-pointer',
            { 'bg-btnHover': loginState },
          ]"
          @click="loginState = true"
        >
          <h1 class="formHeader">Log In</h1>
        </div>
        <div
          :class="[
            'bg-btnHover text-btnHover',
            { 'tilt-login': loginState, 'tilt-signup': !loginState },
          ]"
        ></div>
        <div
          :class="[
            'w-full p-3 hover:bg-btnHover rounded-tr-3xl',
            { 'bg-btnHover': !loginState },
          ]"
          @click="loginState = false"
        >
          <h1 class="formHeader">Sign Up</h1>
        </div>
      </div>
      <Login v-if="loginState" class="loginComp" />
      <Signup v-else class="signupComp" />
    </div>
  </main>
</template>

<style scoped>
.tilt-login {
  border: 4px solid;
  transform: rotate(8deg);
  position: absolute;
  height: 100%;
}
.tilt-signup {
  border: 4px solid;
  transform: rotate(-8deg);
  position: absolute;
  height: 100%;
}
div {
  transition: transform 0.5s ease-out;
}
.form-div {
  transition: all 0.3 ease;
  min-height: 490px;
}
</style>
