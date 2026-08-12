import React from 'react';
import { Box, Typography } from '@mui/material';

export interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        padding: '12px 16px',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: active ? theme.palette.background.paper : 'transparent',
        border: active ? `1px solid ${theme.palette.border.light}` : '1px solid transparent',
        color: active ? theme.palette.text.primary : theme.palette.text.secondary,
        '&:hover': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          color: active ? theme.palette.text.primary : theme.palette.text.secondary,
        })}
      >
        {icon}
      </Box>
      <Typography variant="body2" sx={{ fontWeight: active ? 600 : 400 }}>
        {label}
      </Typography>
    </Box>
  );
};

