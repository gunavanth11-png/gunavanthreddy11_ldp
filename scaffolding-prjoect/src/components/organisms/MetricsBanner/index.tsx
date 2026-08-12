import React from 'react';
import { Paper, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import { MetricItem } from '../../molecules/MetricItem';
import { MetricSummary } from '@/mock/data';

export interface MetricsBannerProps {
  summary: MetricSummary;
}

export const MetricsBanner: React.FC<MetricsBannerProps> = ({ summary }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.border.default}`,
        borderRadius: '16px',
        padding: '32px 28px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
        }}
      >
        <MetricItem
          icon={<CalendarTodayOutlinedIcon sx={{ color: theme.palette.text.primary, fontSize: 22 }} />}
          label="Term cap"
          value={summary.termCap}
          tooltipText="Maximum tenure allowed for new cash advances"
        />

        <MetricItem
          icon={<FileDownloadOutlinedIcon sx={{ color: '#3CDBA3', fontSize: 24 }} />}
          label="Available credit"
          value={summary.availableCredit}
          tooltipText="Total credit available for instant withdrawal"
        />

        <MetricItem
          icon={<PercentOutlinedIcon sx={{ color: theme.palette.status.pendingText, fontSize: 22 }} />}
          label="Max interest rate"
          value={summary.maxInterestRate}
          tooltipText="Maximum applicable rate across contracts"
        />
      </Box>
    </Paper>
  );
};

