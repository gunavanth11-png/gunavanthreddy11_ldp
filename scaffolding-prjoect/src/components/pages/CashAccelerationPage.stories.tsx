import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CashAccelerationPage } from './CashAccelerationPage';

const meta: Meta<typeof CashAccelerationPage> = {
  title: 'Pages/CashAccelerationPage',
  component: CashAccelerationPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
