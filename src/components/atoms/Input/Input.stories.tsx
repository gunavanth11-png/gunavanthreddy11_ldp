import type { Meta, StoryObj } from "@storybook/react";
import Input from "./index";

const meta: Meta<typeof Input> = {
  title: "ATOMS/Input",
  component: Input,

  argTypes: {
    value: {
      control: "text",
    },

    type: {
      control: "select",
      options: ["text", "email", "password"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Password: Story = {
  args: {
    value: "sreehjaaa",
    type: "password",
  },
};