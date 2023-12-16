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
    name,
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
    class="relative top-10 flex h-fit w-full flex-col items-center justify-center p-10 pt-10 md:pt-32"
  >
    <h1 class="m-auto pb-1 text-center text-2xl font-bold text-txt md:text-3xl">
      Courses Dashboard
    </h1>
    <h2 class="text-md pb-4 text-center text-txt md:text-lg">
      Add a new course or manage your existing courses
    </h2>
    <div
      class="h-fit min-w-[100vw] rounded-xl border-[1px] border-btn bg-third p-5 pt-12 md:rounded-[4rem] md:p-12 lg:min-w-[60vw]"
    >
      <h1 class="text-xl font-semibold text-txt">Add A Course</h1>
      <form
        @submit.prevent="callAddCourse"
        class="mb-10 flex w-fit flex-col items-start justify-start gap-5 rounded-xl p-5 pl-0"
      >
        <div class="justify-left flex flex-wrap items-start gap-5 text-sm">
          <InputAuth
            v-model.trim="formData.courseName"
            type="text"
            label="Course Name"
            :errors="res.getErrors('name')"
            class="max-w-[100%] md:max-w-full"
            @update:modelValue="validate('name')"
            required
          />
          <InputAuth
            v-model.trim="formData.number"
            type="text"
            label="Course Number"
            :errors="res.getErrors('number')"
            class="max-w-[100%] md:max-w-full"
            @update:modelValue="validate('number')"
          />
        </div>
        <div class="justify-left flex flex-wrap gap-5">
          <InputAuth
            v-model.trim="formData.points"
            type="text"
            label="Points"
            :errors="res.getErrors('points')"
            class="max-w-[100%] md:max-w-full"
            @update:modelValue="validate('points')"
          />
          <div class="flex flex-col items-start justify-start gap-2">
            <label class="text-left text-sm font-medium text-txt">Status</label>
            <select
              class="h-8 rounded-md border-[1px] border-borderColor bg-primary p-1 text-sm text-txt"
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
      <h1 class="pb-3 text-xl font-semibold text-txt">My Courses</h1>
      <div class="geid-cols-1 grid gap-4">
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
