import type { Meta, StoryObj } from "@storybook/react";
import SidebarItem from "./SidebarItem";
import HomeIconSvg from "../../../assets/icons/Home.svg";

const meta: Meta<typeof SidebarItem> = {
  title: "Components/Molecules/SidebarItem",
  component: SidebarItem,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SidebarItem>;

const HomeIcon = <img src={HomeIconSvg} alt="Home" width={20} height={20} />;

const defaultArgs = {
  icon: HomeIcon,
  title: "Home",
};

export const Default: Story = {
  args: defaultArgs,
};

export const Active: Story = {
  args: {
    ...defaultArgs,
    className: "active",
  },
};

export const CustomTitle: Story = {
  args: {
    ...defaultArgs,
    title: "Dashboard",
  },
};