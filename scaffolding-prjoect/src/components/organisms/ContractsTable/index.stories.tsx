import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContractsTable } from './index';
import { mockContracts } from '@/mock/data';

const meta: Meta<typeof ContractsTable> = {
  title: 'Organisms/ContractsTable',
  component: ContractsTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MyContracts: Story = {
  args: {
    contracts: mockContracts,
    activeTab: 'myContracts',
    onTabChange: (tab: any) => console.log('Tab changed:', tab),
    onSync: () => console.log('Sync clicked'),
  },
};

export const EmptyCashKicks: Story = {
  args: {
    contracts: [],
    activeTab: 'myCashKicks',
    onTabChange: (tab: any) => console.log('Tab changed:', tab),
  },
};
