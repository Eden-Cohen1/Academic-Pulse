import { create, test, enforce, only } from "vest";

const suite = create((data = {}, currentField) => {
  only(currentField);

  test("name", "Course Name is required", () => {
    enforce(data.name).isNotEmpty();
  });

  test("name", "3 >= characters <= 30", () => {
    enforce(data.name).longerThanOrEquals(3).shorterThanOrEquals(30);
  });

  test("number", "Course Number is required", () => {
    enforce(data.number).isNotEmpty();
  });

  test("number", "3 <= digits <= 10", () => {
    enforce(data.number).isBetween(100, 9999999999);
  });

  test("number", "has to be a number", () => {
    enforce(data.number).isNumeric();
  });

  test("points", "Course Points is required", () => {
    enforce(data.points).isNotEmpty();
  });

  test("points", "has to be a number", () => {
    enforce(data.points).isNumeric();
  });

  test("points", "1 <= points <= 10", () => {
    enforce(data.points).isBetween(1, 10);
  });
});

export default suite;
