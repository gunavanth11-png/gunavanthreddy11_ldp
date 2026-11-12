import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BORDER_RADIUS, TRANSITION, FONT_WEIGHT } from '../../../utils/styleConstants';

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
  borderRadius: BORDER_RADIUS.MD,
  cursor: 'pointer',
  transition: TRANSITION.DEFAULT,
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
  fontWeight: active ? FONT_WEIGHT.SEMI_BOLD : FONT_WEIGHT.REGULAR,
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
