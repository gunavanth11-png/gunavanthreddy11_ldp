import type { Meta, StoryObj } from "@storybook/react";
import StatCard from "./index";
import statCardIcon from "../../../assets/icons/statcard.svg";

const meta: Meta<typeof StatCard> = {
  title: "Molecules/StatCard",
  component: StatCard,
};

export default meta;

type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    icon: statCardIcon,
    title: "Total Candidates",
    value: "84",
  },
};
