import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    title: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    title: "Secondary Button",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    title: "Outline Button",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    title: "Ghost Button",
    variant: "ghost",
  },
};

export const Small: Story = {
  args: {
    title: "Small Button",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    title: "Large Button",
    size: "large",
  },
};

export const FullWidth: Story = {
  args: {
    title: "Full Width Button",
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled Button",
    disabled: true,
  },
};

export const Submit: Story = {
  args: {
    title: "Submit Form",
    type: "submit",
  },
};

export const Clickable: Story = {
  args: {
    title: "Click Me",
    onClick: () => {
      // Story interaction handler
    },
  },
};