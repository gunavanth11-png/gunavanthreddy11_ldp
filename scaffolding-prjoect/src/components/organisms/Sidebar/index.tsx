import React from 'react';
import { Box, Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import { NavItem } from '../../molecules/NavItem';
import { SeederLogo } from '../../atoms/SeederLogo';

export interface SidebarProps {
  activePath?: string;
  onNavigate?: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePath = '/cash-acceleration',
  onNavigate,
}) => {
  return (
    <Box
      sx={(theme) => ({
        width: 250,
        height: '100vh',
        backgroundColor: theme.palette.customBackground.sidebar,
        borderRight: `1px solid ${theme.palette.border.subtle}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1200,
      })}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ paddingLeft: 1 }}>
          <SeederLogo iconSize={32} fontSize="1.5rem" />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <NavItem
            icon={<HomeOutlinedIcon sx={{ fontSize: 20 }} />}
            label="Home"
            active={activePath === '/home'}
            onClick={() => onNavigate?.('/home')}
          />
          <NavItem
            icon={<GridViewOutlinedIcon sx={{ fontSize: 20 }} />}
            label="Cash Acceleration"
            active={activePath === '/cash-acceleration'}
            onClick={() => onNavigate?.('/cash-acceleration')}
          />
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          padding: '12px 16px',
          color: theme.palette.text.secondary,
          cursor: 'pointer',
          borderRadius: '12px',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        })}
      >
        <ElectricBoltOutlinedIcon sx={(theme) => ({ fontSize: 18, color: theme.palette.text.secondary })} />
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          Watch how to
        </Typography>
      </Box>
    </Box>
  );
};

