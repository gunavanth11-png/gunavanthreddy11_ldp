import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../../test-utils/renderWithTheme';
import { SeederLogo } from './index';

describe('SeederLogo atom', () => {
  it('renders "Seeder" text by default (showText=true)', () => {
    renderWithTheme(<SeederLogo />);
    expect(screen.getByText('Seeder')).toBeInTheDocument();
  });

  it('hides "Seeder" text when showText is false', () => {
    renderWithTheme(<SeederLogo showText={false} />);
    expect(screen.queryByText('Seeder')).not.toBeInTheDocument();
  });

  it('renders an SVG icon', () => {
    const { container } = renderWithTheme(<SeederLogo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders two rect elements inside the SVG', () => {
    const { container } = renderWithTheme(<SeederLogo />);
    const rects = container.querySelectorAll('rect');
    expect(rects).toHaveLength(2);
  });
});
