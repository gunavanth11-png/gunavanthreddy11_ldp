import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { MetricItem } from './index';

const meta: Meta<typeof MetricItem> = {
  title: 'Molecules/MetricItem',
  component: MetricItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TermCap: Story = {
  args: {
    icon: <CalendarTodayOutlinedIcon sx={{ color: '#E8E7F0' }} />,
    label: 'Term cap',
    value: '12 months',
    tooltipText: 'Maximum term period for cash kick',
  },
};
