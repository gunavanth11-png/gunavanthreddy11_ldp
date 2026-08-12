import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { IconBox } from '../../atoms/IconBox';

export interface MetricItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  tooltipText?: string;
}

export const MetricItem: React.FC<MetricItemProps> = ({
  icon,
  label,
  value,
  tooltipText = 'Information regarding this metric',
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <IconBox>{icon}</IconBox>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, marginBottom: 0.5 }}>
        <Typography variant="body2" sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 400 })}>
          {label}
        </Typography>
        <Tooltip title={tooltipText} arrow>
          <InfoOutlinedIcon sx={(theme) => ({ fontSize: 15, color: theme.palette.text.disabled, cursor: 'pointer' })} />
        </Tooltip>
      </Box>
      <Typography variant="h2" sx={(theme) => ({ color: theme.palette.text.primary, fontWeight: 600 })}>
        {value}
      </Typography>
    </Box>
  );
};

