import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabPill } from './index';

const meta: Meta<typeof TabPill> = {
  title: 'Atoms/TabPill',
  component: TabPill,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    label: 'My Contracts',
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    label: 'My Cash Kicks',
    active: false,
  },
};
