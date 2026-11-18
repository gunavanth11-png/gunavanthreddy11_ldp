import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../../test-utils/renderWithTheme';
import { StatusChip } from './index';

describe('StatusChip atom', () => {
  it('renders with "Available" status label by default', () => {
    renderWithTheme(<StatusChip />);
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('renders "Pending" label when status is Pending', () => {
    renderWithTheme(<StatusChip status="Pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders "Financed" label when status is Financed', () => {
    renderWithTheme(<StatusChip status="Financed" />);
    expect(screen.getByText('Financed')).toBeInTheDocument();
  });

  it('renders a custom label prop instead of the status text', () => {
    renderWithTheme(<StatusChip status="Available" label="Ready" />);
    expect(screen.getByText('Ready')).toBeInTheDocument();
    expect(screen.queryByText('Available')).not.toBeInTheDocument();
  });
});
