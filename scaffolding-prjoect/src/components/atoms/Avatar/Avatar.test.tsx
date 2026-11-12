import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithTheme } from '../../../test-utils/renderWithTheme';
import { UserAvatar } from './index';

describe('UserAvatar atom', () => {
  it('renders the avatar image with the default alt text', () => {
    renderWithTheme(<UserAvatar />);
    // MUI Avatar renders an <img> with the given alt
    const avatars = screen.getAllByAltText('Kane Cooper');
    expect(avatars.length).toBeGreaterThan(0);
  });

  it('renders the avatar with a custom name alt text', () => {
    renderWithTheme(<UserAvatar alt="Jane Doe" name="Jane Doe" />);
    const avatars = screen.getAllByAltText('Jane Doe');
    expect(avatars.length).toBeGreaterThan(0);
  });

  it('opens the popover menu when the avatar is clicked', async () => {
    renderWithTheme(<UserAvatar name="Kane Cooper" />);
    // Popover is not visible initially
    expect(screen.queryByText('Kane Cooper')).not.toBeInTheDocument();

    // Click the avatar trigger area (first avatar element's parent)
    const avatar = screen.getAllByRole('img')[0];
    fireEvent.click(avatar.closest('div[style]') ?? avatar.parentElement!);

    await waitFor(() => {
      expect(screen.getByText('Kane Cooper')).toBeInTheDocument();
    });
  });

  it('shows "Manage Subscriptions" and "Help" menu items when popover is open', async () => {
    renderWithTheme(<UserAvatar />);
    const avatar = screen.getAllByRole('img')[0];
    fireEvent.click(avatar.parentElement!);

    await waitFor(() => {
      expect(screen.getByText('Manage Subscriptions')).toBeInTheDocument();
      expect(screen.getByText('Help')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Log Out')).toBeInTheDocument();
    });
  });
});
