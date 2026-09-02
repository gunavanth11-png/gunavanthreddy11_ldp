import React from 'react';
import { Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import { MetricItem } from '../../molecules/MetricItem';
import { MetricSummary } from '@/mock/data';
import { TEXT_CONSTANTS } from '../../../constants';

export interface MetricsBannerProps {
  summary: MetricSummary;
}

const BannerPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.border.default}`,
  borderRadius: '16px',
  padding: theme.spacing(4, 3.5),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
}));

const BannerItemsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
}));

const CalendarIcon = styled(CalendarTodayOutlinedIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 22,
}));

const CreditIcon = styled(FileDownloadOutlinedIcon)(({ theme }) => ({
  color: theme.palette.status.successText,
  fontSize: 24,
}));

const PercentIcon = styled(PercentOutlinedIcon)(({ theme }) => ({
  color: theme.palette.status.pendingText,
  fontSize: 22,
}));

export const MetricsBanner: React.FC<MetricsBannerProps> = ({ summary }) => {
  return (
    <BannerPaper elevation={0}>
      <BannerItemsBox>
        <MetricItem
          icon={<CalendarIcon />}
          label={TEXT_CONSTANTS.METRICS.TERM_CAP.LABEL}
          value={summary.termCap}
          tooltipText={TEXT_CONSTANTS.METRICS.TERM_CAP.TOOLTIP}
        />

        <MetricItem
          icon={<CreditIcon />}
          label={TEXT_CONSTANTS.METRICS.AVAILABLE_CREDIT.LABEL}
          value={summary.availableCredit}
          tooltipText={TEXT_CONSTANTS.METRICS.AVAILABLE_CREDIT.TOOLTIP}
        />

        <MetricItem
          icon={<PercentIcon />}
          label={TEXT_CONSTANTS.METRICS.MAX_INTEREST_RATE.LABEL}
          value={summary.maxInterestRate}
          tooltipText={TEXT_CONSTANTS.METRICS.MAX_INTEREST_RATE.TOOLTIP}
        />
      </BannerItemsBox>
    </BannerPaper>
  );
};
