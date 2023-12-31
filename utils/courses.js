export const addCourse = async function (apiResponse, client, formData) {
  const userData = useUser();
  apiResponse.loading = true;
  apiResponse.errorMsg = "";
  apiResponse.successMsg = "";
  const user = await userData.getUserData();
  const newCourse = {
    name: formData.courseName,
    number: formData.number,
    points: formData.points,
    status: formData.status,
    userId: user?.id,
  };
  try {
    const { data, error } = await client
      .from("courses")
      .insert([newCourse])
      .select();
    if (error) throw error;
    apiResponse.successMsg = "Course added successfully";
    return data[0];
  } catch (error) {
    apiResponse.errorMsg = error.message;
  } finally {
    formData.courseName = formData.number = formData.points = "";
    apiResponse.loading = false;
  }
};
export const checkIfExists = (courses, formData, apiResponse) => {
  setTimeout(() => {
    apiResponse.errorMsg = "";
    if (apiResponse.successMsg) apiResponse.successMsg = "";
  }, 5000);
  const isNameExists = courses.some(
    (course) => course.name === formData.courseName,
  );
  const isNumberExists = courses.some(
    (course) => course.number == formData.number,
  );
  if (isNameExists) {
    apiResponse.errorMsg = "Course name already exists";
    return true;
  }
  if (isNumberExists) {
    apiResponse.errorMsg = "Course number already exists";
    return true;
  }
  return false;
};
export const getAllCourses = async (client) => {
  const userData = useUser();
  const user = await userData.getUserData();
  const courses = await client
    .from("courses")
    .select()
    .order("id", { ascending: true })
    .eq("userId", user?.id);
  return courses;
};
export const deleteCourse = async (id, courses) => {
  const client = useSupabaseClient();
  try {
    const { error } = await client.from("courses").delete().eq("id", id);
    if (error) throw error;
    const courseIndex = courses.findIndex((course) => course.id == id);
    courses.splice(courseIndex, 1);
  } catch (error) {
    console.log(error);
  }
};
export const updateCourses = async (courses, client) => {
  const { data } = await getAllCourses(client);
  courses.length = 0;
  courses.push(...data);
};
export const saveChanges = async (emit, formData, apiResponse) => {
  const client = useSupabaseClient();
  const courses = await getAllCourses(client);
  courses.data.splice(
    courses.data.findIndex(
      (course) =>
        formData.courseName === course.name || formData.number == course.number,
    ),
    1,
  );
  const isExist = checkIfExists(courses.data, formData, apiResponse);
  if (isExist) {
    return;
  }
  const { error } = await client
    .from("courses")
    .update({
      name: formData.courseName,
      number: formData.number,
      points: formData.points,
      status: formData.status,
    })
    .eq("id", formData.courseId);
  emit("updateCourses");
  setTimeout(() => {
    formData.isEdit = false;
  }, 500);
  if (error) {
    errorMsg.value = "Can't edit course, try again later..";
  }
};
