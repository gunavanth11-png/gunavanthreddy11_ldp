import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Typography>;

const defaultArgs = {
  text: "Typography",
};

export const Default: Story = {
  args: defaultArgs,
};

export const Large: Story = {
  args: {
    ...defaultArgs,
    size: "24px",
  },
};

export const Bold: Story = {
  args: {
    ...defaultArgs,
    weight: 700,
  },
};

export const CustomColor: Story = {
  args: {
    ...defaultArgs,
    color: "#0000FF",
  },
};

export const LargeBold: Story = {
  args: {
    ...defaultArgs,
    size: "24px",
    weight: 700,
  },
};