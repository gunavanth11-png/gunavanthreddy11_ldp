import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

const defaultArgs = {
  title: "Button",
};

export const Primary: Story = {
  args: defaultArgs,
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const Submit: Story = {
  args: {
    ...defaultArgs,
    type: "submit",
  },
};

export const Clickable: Story = {
  args: {
    ...defaultArgs,
    onClick: () => alert("Button clicked"),
  },
};