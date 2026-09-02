import type { Meta, StoryObj } from "@storybook/react";
import StatCard from "./StatCard";
import CalendarIconSvg from "../../../assets/icons/statcard.svg";

const meta: Meta<typeof StatCard> = {
  title: "Components/Molecules/StatCard",
  component: StatCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof StatCard>;

const CalendarIcon = <img src={CalendarIconSvg} alt="Calendar" width={28} height={28} />;

const defaultArgs = {
  icon: CalendarIcon,
  title: "Term Cap",
  value: "12 Months",
};

export const Default: Story = {
  args: defaultArgs,
};

export const Applications: Story = {
  args: {
    ...defaultArgs,
    title: "Applications",
    value: "85",
  },
};

export const Selected: Story = {
  args: {
    ...defaultArgs,
    title: "Selected",
    value: "25",
  },
};
