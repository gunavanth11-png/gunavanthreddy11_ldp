import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TableHeader } from './index';

const meta: Meta<typeof TableHeader> = {
  title: 'Molecules/TableHeader',
  component: TableHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeTab: 'myContracts',
    onTabChange: (tab: any) => console.log('Tab changed:', tab),
    onSync: () => console.log('Syncing...'),
  },
};
