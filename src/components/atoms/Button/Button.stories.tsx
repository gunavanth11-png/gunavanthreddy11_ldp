import type {
  Meta,
  StoryObj,
} from "@storybook/react";

import { fn } from "storybook/test";
import Button from "./index";

const meta: Meta<typeof Button> = {
  title: "ATOMS/Button",
  component: Button,

  argTypes: {
    text: {
      control: "text",
    },

    backgroundColor: {
      control: "color",
    },

    color: {
      control: "color",
    },

    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    text: "Submit",
    backgroundColor: "green",
    color: "white",
    disabled: false,
    onClick: fn(),
  },
};