import type { Meta, StoryObj } from "@storybook/react";
import StatCard from "./index";

const meta: Meta<typeof StatCard> = {
  title: "Molecules/StatCard",
  component: StatCard,
};

export default meta;

type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    icon: "📅",
    title: "Term Cap",
    value: "12 Months",
  },
};