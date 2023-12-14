<script setup>
import suite from "~/validations/course";
const client = useSupabaseClient();
const formData = reactive({
  courseName: "",
  number: "",
  points: "",
  status: "upcoming",
});
const apiResponse = reactive({
  errorMsg: "",
  successMsg: "",
  loading: false,
});
const { data } = await getAllCourses(client);
const courses = ref(data);
const options = ["upcoming", "in-progress", "finished"];
let res = reactive(suite.get());

const callAddCourse = async () => {
  const course = await addCourse(apiResponse, client, formData);
  courses.value.push(course);
};
const validate = (name) => {
  res = suite(
    {
      name: formData.courseName,
      number: formData.number,
      points: formData.points,
    },
    name
  );
};
</script>

<template>
  <Alert
    type="error"
    :text="apiResponse.errorMsg"
    v-if="apiResponse.errorMsg"
  />
  <Alert
    type="success"
    :text="apiResponse.successMsg"
    v-else-if="apiResponse.successMsg"
  />
  <main
    class="relative h-fit w-full flex flex-col top-10 justify-center items-center p-10 pt-10 md:pt-32"
  >
    <h1 class="text-3xl pb-1 font-bold text-txt">Courses Dashboard</h1>
    <h2 class="text-lg text-txt pb-4 text-center">
      Add a new course or manage your existing courses
    </h2>
    <div
      class="h-fit min-w-[100vw] lg:min-w-[60vw] bg-third rounded-xl md:rounded-[4rem] p-5 md:p-12 pt-12 border-[1px] border-btn"
    >
      <h1 class="text-xl font-semibold text-txt">Add A Course</h1>
      <form
        @submit.prevent="callAddCourse"
        class="flex flex-col w-fit p-5 pl-0 rounded-xl justify-start items-start gap-5 mb-10"
      >
        <div class="flex justify-left flex-wrap items-start gap-5 text-sm">
          <InputAuth
            v-model.trim="formData.courseName"
            type="text"
            label="Course Name"
            :errors="res.getErrors('name')"
            class="md:max-w-full max-w-[100%]"
            @update:modelValue="validate('name')"
            required
          />
          <InputAuth
            v-model.trim="formData.number"
            type="text"
            label="Course Number"
            :errors="res.getErrors('number')"
            class="md:max-w-full max-w-[100%]"
            @update:modelValue="validate('number')"
          />
        </div>
        <div class="flex flex-wrap justify-left gap-5">
          <InputAuth
            v-model.trim="formData.points"
            type="text"
            label="Points"
            :errors="res.getErrors('points')"
            class="md:max-w-full max-w-[100%]"
            @update:modelValue="validate('points')"
          />
          <div class="flex flex-col gap-2 justify-start items-start">
            <label class="text-txt text-sm font-medium text-left">Status</label>
            <select
              class="bg-primary p-1 text-txt h-8 border-borderColor border-[1px] text-sm rounded-md"
              name="status"
              v-model="formData.status"
            >
              <option
                class="rounded-md"
                v-for="option in options"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>
        <ButtonSubmit
          text="Add Course"
          class="m-0"
          :isValid="!res.isValid() || false"
          :loading="apiResponse.loading"
        />
      </form>
      <h1 class="text-xl font-semibold text-txt pb-3">My Courses</h1>
      <div class="grid geid-cols-1 gap-4">
        <CourseEdit
          v-for="course in courses"
          :name="course.name"
          :number="course.number"
          :points="course.points"
          :courseId="course.id"
          :status="course.status"
          @deleteClick="deleteCourse(course.id, courses)"
          @updateCourses="updateCourses(courses, client)"
        />
      </div>
    </div>
  </main>
</template>
