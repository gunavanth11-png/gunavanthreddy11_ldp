import type { Meta, StoryObj } from "@storybook/react";
import SidebarItem from "./index";

const meta: Meta<typeof SidebarItem> = {
  title: "Molecules/SidebarItem",
  component: SidebarItem,
};

export default meta;

type Story = StoryObj<typeof SidebarItem>;

export const Default: Story = {
  args: {
    icon: "🏠",
    title: "house\n",
  },
};