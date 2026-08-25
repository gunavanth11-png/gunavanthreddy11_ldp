import React from 'react';
import type { Preview } from "@storybook/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../src/theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0F0E17' },
        { name: 'paper', value: '#191823' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ padding: '1.5rem', backgroundColor: '#0F0E17', minHeight: '100vh', color: '#E8E7F0' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
