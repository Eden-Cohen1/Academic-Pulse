export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  if (to.path === "/login" || to.path === "/login/reset") {
    if (user.value) {
      return navigateTo("/");
    }
  }
  if (to.path === "/") {
    if (!user.value) {
      return navigateTo("/login");
    }
  }
});
