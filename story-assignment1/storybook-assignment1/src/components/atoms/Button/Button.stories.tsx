import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import Button from "./index";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  args: {
    onClick: fn(), 
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const NewCashKick: Story = {
  args: {
    title: "New Cash Kick",
  },
};

export const SyncNow: Story = {
  args: {
    title: "Sync Now",
  },
};