import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LaunchKickCard } from './index';

const meta: Meta<typeof LaunchKickCard> = {
  title: 'Organisms/LaunchKickCard',
  component: LaunchKickCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    availableAmount: '$880,000.00',
    onLaunchClick: () => console.log('Launch clicked'),
  },
};
