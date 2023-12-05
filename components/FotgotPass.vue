<script setup>
const forgotPass = async () => {};
</script>
<template>
  <main class="flex flex-col m-5">
    <form @submit.prevent="forgotPass" class="flex flex-col">
      <label class="block text-sm font-medium leading-6 pb-1 ml-3"
        >Email Adress</label
      >
      <input type="email" class="input m-auto mb-5" v-model="email" />
      <button class="btn-primary w-56 mt-4 mb-4 m-auto" @click="forgotPass">
        Send Reset Email
      </button>
      <small> {{ successMsg }} {{ errorMsg }}</small>
    </form>
  </main>
</template>
