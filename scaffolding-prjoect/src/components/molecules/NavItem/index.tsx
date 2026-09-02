import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const StyledNavItemBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5, 2),
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
}));

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
}));

const NavLabelText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  fontWeight: active ? 600 : 400,
}));

export const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => {
  return (
    <StyledNavItemBox active={active} onClick={onClick}>
      <IconWrapper active={active}>{icon}</IconWrapper>
      <NavLabelText variant="body2" active={active}>
        {label}
      </NavLabelText>
    </StyledNavItemBox>
  );
};
