import React from 'react';
import { Box, Typography } from '@mui/material';
import { UserAvatar } from '../../atoms/Avatar';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  avatarSrc?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Cash acceleration',
  subtitle = 'Place to create new cash kicks to run your business',
  avatarSrc,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 4,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="h1" sx={(theme) => ({ color: theme.palette.text.primary, fontWeight: 700, fontSize: '2.25rem' })}>
          {title}
        </Typography>
        <Typography variant="subtitle1" sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 400 })}>
          {subtitle}
        </Typography>
      </Box>

      <UserAvatar src={avatarSrc} />
    </Box>
  );
};

