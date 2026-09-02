import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './index';

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activePath: '/cash-acceleration',
  },
};
