import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface IconBoxProps {
  children: React.ReactNode;
  bg?: string;
}

const StyledIconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bg',
})<{ bg?: string }>(({ theme, bg }) => ({
  width: theme.spacing(6.5),
  height: theme.spacing(6.5),
  borderRadius: '12px',
  backgroundColor: bg || theme.palette.icon.boxBg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

export const IconBox: React.FC<IconBoxProps> = ({ children, bg }) => {
  return <StyledIconBox bg={bg}>{children}</StyledIconBox>;
};
