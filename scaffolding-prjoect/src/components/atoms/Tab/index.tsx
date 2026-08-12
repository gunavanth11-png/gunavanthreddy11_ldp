import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface TabPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const StyledTab = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 20px',
  borderRadius: '12px',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'all 0.2s ease',
  backgroundColor: active ? theme.palette.secondary.dark : theme.palette.customBackground.elevation1,
  border: active ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.border.default}`,
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary,
    borderColor: active ? theme.palette.primary.main : theme.palette.secondary.main,
  },
}));

export const TabPill: React.FC<TabPillProps> = ({ label, active = false, onClick }) => {
  return (
    <StyledTab active={active} onClick={onClick}>
      <Typography variant="body2" sx={{ fontWeight: active ? 600 : 400 }}>
        {label}
      </Typography>
    </StyledTab>
  );
};

