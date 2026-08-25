import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import { NavItem } from './index';

const meta: Meta<typeof NavItem> = {
  title: 'Molecules/NavItem',
  component: NavItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    icon: <AutoAwesomeMosaicOutlinedIcon />,
    label: 'Cash Acceleration',
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    icon: <AutoAwesomeMosaicOutlinedIcon />,
    label: 'Home',
    active: false,
  },
};
