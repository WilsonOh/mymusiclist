const { render } = require("@testing-library/react");
import Signup from "./Signup";
import userEvent from "@testing-library/user-event";

test("login form can only be submitted after all fields are filled", () => {
  const { getByRole, getByLabelText } = render(<Signup />);
  expect(
    getByRole("button", {
      name: /sign up/i,
    })
  ).toBeDisabled();
  userEvent.type(getByLabelText(/first name/i), "foo");
  userEvent.type(getByLabelText(/last name/i), "bar");
  userEvent.type(getByLabelText(/email address/i), "foo@bar.com");
  userEvent.type(getByLabelText(/password/i), "123123");
  userEvent.type(getByLabelText(/confirm password/i), "123123");
  expect(
    getByRole("button", {
      name: /sign up/i,
    })
  ).toBeEnabled();
});
