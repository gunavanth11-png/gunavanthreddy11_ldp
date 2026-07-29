import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import Checkbox from "./index";

const meta: Meta<typeof Checkbox> = {
  title: "ATOMS/Checkbox",
  component: Checkbox,

  argTypes: {
    checked: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    onChange: fn(),
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    onChange: fn(),
  },
};