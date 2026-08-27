import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("shows initial count", () => {
  render(<Counter />);

  expect(screen.getByText("Count: 0")).toBeInTheDocument();
});

test("increments count", async () => {
  const user = userEvent.setup();

  render(<Counter />);

  const button = screen.getByRole("button", {
    name: "Increment",
  });

  await user.click(button);

  expect(
    await screen.findByText("Count: 1")
  ).toBeInTheDocument();
});

test("increment button exists", () => {
  render(<Counter />);

  const button = screen.getByRole("button", {
    name: "Increment",
  });

  expect(button).toBeInTheDocument();
});

test("does not show count 10 initially", () => {
  render(<Counter />);

  const count = screen.queryByText("Count: 10");

  expect(count).not.toBeInTheDocument();
});