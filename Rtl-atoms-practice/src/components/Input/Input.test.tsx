import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

test("finds input using getByRole", () => {
  render(<Input label="Username" />);

  const input = screen.getByRole("textbox", {
    name: "Username",
  });

  expect(input).toBeInTheDocument();
});

test("finds input using getByLabelText", () => {
  render(<Input label="Username" />);

  const input = screen.getByLabelText("Username");

  expect(input).toBeInTheDocument();
});

test("checks input using queryBy", () => {
  render(<Input label="Username" />);

  const errorMessage = screen.queryByText(
    "Username is required"
  );

  expect(errorMessage).not.toBeInTheDocument();
});

test("finds input using findBy", async () => {
  render(<Input label="Username" />);

  const input = await screen.findByRole("textbox", {
    name: "Username",
  });

  expect(input).toBeInTheDocument();
});

test("allows user to type", async () => {
  const user = userEvent.setup();

  render(
    <Input
      label="Username"
      placeholder="Enter username"
    />
  );

  const input = screen.getByLabelText("Username");

  await user.type(input, "Praveen");

  expect(input).toHaveValue("Praveen");
});