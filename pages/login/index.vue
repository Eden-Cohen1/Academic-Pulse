<script setup>
const loginState = ref(true);
const darkMode = useDark();
</script>
<template>
  <main class="flex h-screen flex-col gap-20 p-5 text-txt">
    <div class="relative top-16 m-auto">
      <NuxtImg class="w-96" :src="darkMode.getLogo" />
    </div>
    <div
      class="form-div w-70 m-auto mb-24 flex flex-col rounded-3xl border border-solid border-borderColor bg-secondary sm:mb-48 sm:w-96"
    >
      <div
        class="relative top-0 mb-10 flex w-full cursor-pointer content-center justify-around rounded-t-3xl bg-btn"
      >
        <div
          :class="[
            'w-full cursor-pointer rounded-tl-3xl p-3 hover:bg-btnHover',
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
            'w-full rounded-tr-3xl p-3 hover:bg-btnHover',
            { 'bg-btnHover': !loginState },
          ]"
          @click="loginState = false"
        >
          <h1 class="formHeader">Sign Up</h1>
        </div>
      </div>
      <FormLogin v-if="loginState" />
      <FormSignup v-else />
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
</style>
