<template>
  <main class="flex content-center h-screen text-txt">
    <div
      class="form-div flex flex-col m-auto w-fit border border-solid border-borderColor rounded-3xl bg-secondary"
    >
      <div
        class="flex justify-around relative top-0 bg-btn w-full mb-10 rounded-t-3xl content-center cursor-pointer"
      >
        <div class="w-full p-3 rounded-tl-3xl hover:bg-btnHover cursor-pointer">
          <h1 class="formHeader">Reset Password</h1>
        </div>
      </div>
      <div class="gap-5 items-center p-5 pt-0">
        <label class="block text-sm font-medium leading-6 pb-1"
          >Account Email Adress:</label
        >
        <input type="email" class="input m-auto mb-1" />
      </div>
      <input type="submit" value="Send" class="btn-primary w-62 mb-4 m-auto" />
    </div>
  </main>
</template>
