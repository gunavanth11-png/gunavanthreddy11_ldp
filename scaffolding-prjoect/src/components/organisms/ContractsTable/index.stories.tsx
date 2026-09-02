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
  contracts: [
    {
      id: '1',
      name: 'Contract 1',
      status: 'Available',
      type: 'Monthly',
      perPayment: '$12,000.25',
      totalFinanced: '—',
      totalAvailable: '$126,722.64',
    },
  ],
}

export const EmptyCashKicks: Story = {
  args: {
    contracts: [],
    activeTab: 'myCashKicks',
    onTabChange: (tab: any) => console.log('Tab changed:', tab),
  },
};
