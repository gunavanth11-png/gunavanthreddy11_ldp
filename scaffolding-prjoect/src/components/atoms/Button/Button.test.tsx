import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../../test-utils/renderWithTheme';
import { Button } from './index';

describe('Button atom', () => {
  it('renders children text', () => {
    renderWithTheme(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders with contained variant by default', () => {
    renderWithTheme(<Button>Default</Button>);
    const btn = screen.getByRole('button', { name: /default/i });
    expect(btn).toBeInTheDocument();
  });

  it('renders with outlined variant', () => {
    renderWithTheme(<Button variant="outlined">Outlined</Button>);
    const btn = screen.getByRole('button', { name: /outlined/i });
    expect(btn).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Press</Button>);
    fireEvent.click(screen.getByRole('button', { name: /press/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button disabled onClick={handleClick}>Disabled</Button>);
    const btn = screen.getByRole('button', { name: /disabled/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
