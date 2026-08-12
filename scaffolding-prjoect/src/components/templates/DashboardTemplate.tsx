import React from 'react';
import { Box } from '@mui/material';

export interface DashboardTemplateProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  sidebar,
  header,
  children,
}) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0F0E17' }}>
      {sidebar}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: '250px',
          minWidth: 0,
          height: '100vh',
          overflow: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: '#0F0E17',
            padding: '36px 48px 16px',
          }}
        >
          {header}
        </Box>
        <Box sx={{ padding: '0 48px 36px' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
