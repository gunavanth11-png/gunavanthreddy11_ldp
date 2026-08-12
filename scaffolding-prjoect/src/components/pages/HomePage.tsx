import React from 'react';
import { Box, Typography } from '@mui/material';
import { DashboardTemplate } from '../templates/DashboardTemplate';
import { Sidebar } from '../organisms/Sidebar';
import { Header } from '../organisms/Header';

export interface HomePageProps {
  onNavigate?: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <DashboardTemplate
      sidebar={<Sidebar activePath="/home" onNavigate={onNavigate} />}
      header={<Header title="Home Overview" subtitle="Welcome back to Seeder financial dashboard" />}
    >
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: '16px',
          padding: '40px',
          border: `1px solid ${theme.palette.border.default}`,
          textAlign: 'center',
        })}
      >
        <Typography variant="h2" sx={(theme) => ({ color: theme.palette.text.primary, marginBottom: 2 })}>
          Home Overview
        </Typography>
        <Typography variant="body1" sx={(theme) => ({ color: theme.palette.text.secondary })}>
          Select &apos;Cash Acceleration&apos; from the sidebar navigation to view active contracts and launch cash advances.
        </Typography>
      </Box>
    </DashboardTemplate>
  );
};
