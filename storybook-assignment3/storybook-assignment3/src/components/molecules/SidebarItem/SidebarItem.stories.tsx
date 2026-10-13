import type { Meta, StoryObj } from "@storybook/react";
import SidebarItem from "./SidebarItem";
import HomeIconSvg from "../../../assets/icons/Home.svg";

const meta: Meta<typeof SidebarItem> = {
  title: "Components/Molecules/SidebarItem",
  component: SidebarItem,
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    title: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SidebarItem>;

const HomeIcon = <img src={HomeIconSvg} alt="" />;

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
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const CustomTitle: Story = {
  args: {
    ...defaultArgs,
    title: "Dashboard",
  },
};