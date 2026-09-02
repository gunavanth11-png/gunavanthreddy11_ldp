import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { MetricItem } from './index';
import { colors } from '../../../theme/colors';

const meta: Meta<typeof MetricItem> = {
  title: 'Molecules/MetricItem',
  component: MetricItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TermCap: Story = {
  args: {
    icon: <CalendarTodayOutlinedIcon style={{ color: colors.text.primary }} />,
    label: 'Term cap',
    value: '12 months',
    tooltipText: 'Maximum term period for cash kick',
  },
};
