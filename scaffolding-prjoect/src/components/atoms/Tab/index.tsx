import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BORDER_RADIUS, TRANSITION, FONT_WEIGHT } from '../../../utils/styleConstants';

export interface TabPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const StyledTab = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1, 2.5),
  borderRadius: BORDER_RADIUS.MD,
  cursor: 'pointer',
  userSelect: 'none',
  transition: TRANSITION.DEFAULT,
  backgroundColor: active ? theme.palette.secondary.dark : theme.palette.customBackground.elevation1,
  border: active ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.border.default}`,
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary,
    borderColor: active ? theme.palette.primary.main : theme.palette.secondary.main,
  },
}));

const StyledTabTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  fontWeight: active ? FONT_WEIGHT.SEMI_BOLD : FONT_WEIGHT.REGULAR,
}));

export const TabPill: React.FC<TabPillProps> = ({ label, active = false, onClick }) => {
  return (
    <StyledTab active={active} onClick={onClick}>
      <StyledTabTypography variant="body2" active={active}>
        {label}
      </StyledTabTypography>
    </StyledTab>
  );
};
