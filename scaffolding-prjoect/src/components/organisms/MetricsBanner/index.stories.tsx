import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MetricsBanner } from './index';
import { mockSummary } from '@/mock/data';

const meta: Meta<typeof MetricsBanner> = {
  title: 'Organisms/MetricsBanner',
  component: MetricsBanner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  termCap: '12 months',
  availableCredit: '$880.0k',
  maxInterestRate: '12.00%',
  totalAvailableAdvance: '$880,000.00',
}
