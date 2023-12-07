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
});

export default suite;
