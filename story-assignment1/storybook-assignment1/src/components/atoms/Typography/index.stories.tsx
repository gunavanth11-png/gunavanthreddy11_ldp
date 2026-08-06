import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./index";

const meta: Meta<typeof Typography> = {
  title: "Atoms/Typography",
  component: Typography,
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Heading: Story = {
  args: {
    text: "Cash Acceleration",
    size: "24px",
    weight: 700,
  },
};
