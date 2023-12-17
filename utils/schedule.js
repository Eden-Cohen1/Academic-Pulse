export const makeUniqueAndSort = (course, cards) => {
  if (course.year && course.semester) {
    const newCard = { year: course.year, semester: course.semester };
    if (
      !cards.value.some(
        (card) => JSON.stringify(card) === JSON.stringify(newCard),
      )
    ) {
      cards.value.push({ year: course.year, semester: course.semester });
      const semesterOrder = { A: 1, B: 2, C: 3 };
      cards.value.sort((a, b) => {
        return (
          a.year - b.year ||
          semesterOrder[a.semester] - semesterOrder[b.semester]
        );
      });
    } else {
      return "Semester Already Exists";
    }
  }
};

export const updateCoursesDB = async (courses, messages) => {
  setTimeout(() => {
    messages.successMsg = "";
  }, 5000);
  const clinet = useSupabaseClient();
  const { error } = await clinet.from("courses").upsert(courses);
  if (!error) {
    messages.successMsg = "Schedule Saved Successfully!";
  }
};
