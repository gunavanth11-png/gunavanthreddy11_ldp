import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { Button } from '../../atoms/Button';

export interface LaunchKickCardProps {
  availableAmount?: string;
  onLaunchClick?: () => void;
}

export const LaunchKickCard: React.FC<LaunchKickCardProps> = ({
  availableAmount = '$880,000.00',
  onLaunchClick,
}) => {
  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.border.default}`,
        borderRadius: '16px',
        padding: '32px 28px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
      })}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="h3" sx={(theme) => ({ color: theme.palette.text.primary, fontWeight: 600, fontSize: '1.25rem' })}>
          Launch a new Cash Kick
        </Typography>

        <Typography variant="body1" sx={(theme) => ({ color: theme.palette.text.secondary, lineHeight: 1.6 })}>
          You have upto{' '}
          <Box component="span" sx={(theme) => ({ color: theme.palette.text.primary, fontWeight: 700 })}>
            {availableAmount}
          </Box>{' '}
          available for a new cash advance
        </Typography>
      </Box>

      <Button variant="contained" fullWidth onClick={onLaunchClick} sx={{ marginTop: 1 }}>
        New Cash Kick
      </Button>
    </Paper>
  );
};

