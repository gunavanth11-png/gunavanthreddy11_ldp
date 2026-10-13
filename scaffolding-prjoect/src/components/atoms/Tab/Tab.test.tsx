import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../../test-utils/renderWithTheme';
import { TabPill } from './index';

describe('TabPill atom', () => {
  it('renders with the given label', () => {
    renderWithTheme(<TabPill label="Invoices" />);
    expect(screen.getByText('Invoices')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    renderWithTheme(<TabPill label="Invoices" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Invoices'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as active when active prop is true', () => {
    renderWithTheme(<TabPill label="Active Tab" active={true} />);
    // When active, the text has fontWeight 600; verify the element renders
    const text = screen.getByText('Active Tab');
    expect(text).toBeInTheDocument();
    // The Typography has sx fontWeight 600 when active
    expect(text).toHaveStyle({ fontWeight: '600' });
  });

  it('renders as inactive by default (active=false)', () => {
    renderWithTheme(<TabPill label="Inactive Tab" />);
    const text = screen.getByText('Inactive Tab');
    expect(text).toBeInTheDocument();
    // fontWeight is 400 when not active
    expect(text).toHaveStyle({ fontWeight: '400' });
  });
});
