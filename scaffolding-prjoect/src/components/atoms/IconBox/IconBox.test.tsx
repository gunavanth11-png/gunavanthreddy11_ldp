import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../../test-utils/renderWithTheme';
import { IconBox } from './index';

describe('IconBox atom', () => {
  it('renders its children content', () => {
    renderWithTheme(<IconBox>⭐</IconBox>);
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('renders a React element as children', () => {
    renderWithTheme(
      <IconBox>
        <span data-testid="icon-child">icon</span>
      </IconBox>
    );
    expect(screen.getByTestId('icon-child')).toBeInTheDocument();
  });

  it('accepts a custom bg color without crashing', () => {
    const { container } = renderWithTheme(
      <IconBox bg="#ff0000">
        <span>child</span>
      </IconBox>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
