import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./Typograpghy";

const meta: Meta<typeof Typography> = {
  title: "Components/Atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "body1", "body2", "caption"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "muted", "inverse", "accent", "inherit"],
    },
    as: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

const defaultArgs = {
  text: "Typography",
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    variant: "body1",
  },
};

export const Large: Story = {
  args: {
    ...defaultArgs,
    variant: "h2",
    size: "xl",
  },
};

export const Bold: Story = {
  args: {
    ...defaultArgs,
    weight: "bold",
  },
};

export const CustomColor: Story = {
  args: {
    ...defaultArgs,
    color: "accent",
  },
};

export const LargeBold: Story = {
  args: {
    ...defaultArgs,
    variant: "h1",
    weight: "bold",
    size: "2xl",
  },
};

export const Caption: Story = {
  args: {
    ...defaultArgs,
    variant: "caption",
    color: "muted",
  },
};