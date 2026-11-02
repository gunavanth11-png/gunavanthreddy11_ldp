import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

test("renders button using getByRole", () => {
  render(<Button label="Click Me" />);

  const button = screen.getByRole("button", {
    name: "Click Me",
  });

  expect(button).toBeInTheDocument();
});

test("calls click handler", async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();

  render(
    <Button
      label="Click Me"
      onClick={handleClick}
    />
  );

  const button = screen.getByRole("button", {
    name: "Click Me",
  });

  await user.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("button does not have another label", () => {
  render(<Button label="Click Me" />);

  const button = screen.queryByRole("button", {
    name: "Submit",
  });

  expect(button).not.toBeInTheDocument();
});

test("finds button using findByRole", async () => {
  render(<Button label="Click Me" />);

  const button = await screen.findByRole("button", {
    name: "Click Me",
  });

  expect(button).toBeInTheDocument();
});