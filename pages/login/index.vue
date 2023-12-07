<script setup>
const loginState = ref(true);
const darkMode = useDark();
</script>
<template>
  <main class="flex flex-col h-screen text-txt p-5 gap-20">
    <div class="relative m-auto top-16">
      <NuxtImg class="w-96" :src="darkMode.getLogo" />
    </div>
    <div
      class="form-div flex flex-col mb-24 sm:mb-48 m-auto w-70 sm:w-96 border border-solid border-borderColor rounded-3xl bg-secondary"
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
