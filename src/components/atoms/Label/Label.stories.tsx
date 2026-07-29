import type { Meta, StoryObj } from "@storybook/react";
import Label from "./index";

const meta: Meta<typeof Label> = {
  title: "ATOMS/Label",
  component: Label,

  argTypes: {
    text: {
      control: "text",
    },

    color: {
      control: "color",
    },

    fontSize: {
      control: {
        type: "range",
        min: 10,
        max: 50,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    text: "Username",
    color: "black",
    fontSize: 20,
  },
};