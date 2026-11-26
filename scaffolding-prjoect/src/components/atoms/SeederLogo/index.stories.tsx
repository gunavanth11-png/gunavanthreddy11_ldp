import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SeederLogo } from './index';

const meta: Meta<typeof SeederLogo> = {
  title: 'Atoms/SeederLogo',
  component: SeederLogo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SeederLogo>;

export const Default: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    iconSize: 40,
    fontSize: '2rem',
  },
};

export const IconOnly: Story = {
  args: {
    showText: false,
  },
};
