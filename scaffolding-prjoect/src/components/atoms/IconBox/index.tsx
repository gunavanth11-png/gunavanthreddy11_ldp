import React from 'react';
import { Box } from '@mui/material';

export interface IconBoxProps {
  children: React.ReactNode;
  bg?: string;
}

export const IconBox: React.FC<IconBoxProps> = ({ children, bg }) => {
  return (
    <Box
      sx={(theme) => ({
        width: 52,
        height: 52,
        borderRadius: '12px',
        backgroundColor: bg || theme.palette.icon.boxBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.primary,
        marginBottom: 2,
      })}
    >
      {children}
    </Box>
  );
};

