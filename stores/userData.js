import { defineStore } from "pinia";

export const useUser = defineStore("userData", {
  state: () => {
    return {
      data: "",
    };
  },
  actions: {
    async getUserData() {
      const client = useSupabaseClient();
      if (this.data?.length > 0) {
        return this.data;
      }
      const {
        data: { user },
      } = await client.auth.getUser();
      const { data, error } = await client
        .from("users")
        .select()
        .eq("uuid", user.id);
      this.data = data[0];
      return this.data;
    },
  },
});
