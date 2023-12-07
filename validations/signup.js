import { create, test, enforce, only } from "vest";
import "vest/enforce/email";
const suite = create((data = {}, currentField) => {
  only(currentField);

  test("email", "Email is required", () => {
    enforce(data.email).isNotEmpty();
  });

  test("email", "not an email", () => {
    enforce(data.email).isEmail();
  });

  test("password", "Password is required", () => {
    enforce(data.password).isNotEmpty();
  });

  test("password", "must be at least 6 characters", () => {
    enforce(data.password.trim()).longerThanOrEquals(6);
  });

  test("fullName", "Full name is required", () => {
    enforce(data.fullName.trim()).isNotEmpty();
  });

  test("fullName", "space is required", () => {
    enforce(data.fullName.trim()).matches(/\s/);
  });

  test("fullName", "must be at least 4 chars", () => {
    enforce(data.fullName.trim()).longerThanOrEquals(4);
  });
});

export default suite;
