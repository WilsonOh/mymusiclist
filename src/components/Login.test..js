const { render } = require("@testing-library/react");
import Login from "./Login";
import userEvent from "@testing-library/user-event";

test("login form can only be submitted after all fields are filled", () => {
  const { getByRole, getByLabelText } = render(<Login />);
  expect(
    getByRole("button", {
      name: /login/i,
    })
  ).toBeDisabled();
  userEvent.type(getByLabelText(/email address/i), "foo");
  userEvent.type(getByLabelText(/password/i), "bar");
  expect(
    getByRole("button", {
      name: /login/i,
    })
  ).toBeEnabled();
});
