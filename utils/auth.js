export const signUp = async (apiResponse, formData, client) => {
  try {
    apiResponse.errorMsg = "";
    apiResponse.successMsg = "";
    const { data, error } = await client.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    if (error) throw error;
    apiResponse.successMsg = "Check your email to confirm your account.";
    insertToDB(data.user.id, client, formData, apiResponse);
  } catch (error) {
    apiResponse.errorMsg = error.message;
  }
};
export const googleSignUp = async (apiResponse, formData, client) => {
  try {
    apiResponse.errorMsg = "";
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://academic-pulse.netlify.app/`,
      },
    });
    if (error) throw error;
  } catch (error) {
    apiResponse.errorMsg = error.message;
  }
};

export const insertToDB = async (id, formData, client, apiResponse = {}) => {
  try {
    const { data, error } = await client.from("users").insert([
      {
        email: formData.email,
        full_name: formData.fullName,
        uuid: id,
      },
    ]);
    if (error) throw error;
  } catch (error) {
    // apiResponse?.errorMsg = error.message;
  }
};

export const checkInDbAndAddUser = async (location) => {
  const client = useSupabaseClient();
  if (location.includes("code")) {
    const {
      data: { user },
    } = await client.auth.getUser();
    const isExist = await client
      .from("users")
      .select()
      .eq("uuid", user.id)
      .eq("email", user.email);
    if (!isExist.data.length) {
      insertToDB(
        user.id,
        { email: user.email, fullName: user.user_metadata?.full_name },
        client
      );
    }
  }
};
