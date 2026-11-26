import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusChip } from './index';

const meta: Meta<typeof StatusChip> = {
  title: 'Atoms/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {
  args: {
    status: 'Available',
    label: 'Available',
  },
};

export const Pending: Story = {
  args: {
    status: 'Pending',
    label: 'Pending',
  },
};
