import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { IconBox } from '../../atoms/IconBox';
import { TEXT_CONSTANTS } from '../../../constants';

export interface MetricItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  tooltipText?: string;
}

const MetricContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const LabelRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
}));

const LabelText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 400,
}));

const StyledInfoIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  fontSize: 15,
  color: theme.palette.text.disabled,
  cursor: 'pointer',
}));

const ValueText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

export const MetricItem: React.FC<MetricItemProps> = ({
  icon,
  label,
  value,
  tooltipText = TEXT_CONSTANTS.METRICS.DEFAULT_TOOLTIP,
}) => {
  return (
    <MetricContainer>
      <IconBox>{icon}</IconBox>
      <LabelRow>
        <LabelText variant="body2">{label}</LabelText>
        <Tooltip title={tooltipText} arrow>
          <StyledInfoIcon />
        </Tooltip>
      </LabelRow>
      <ValueText variant="h2">{value}</ValueText>
    </MetricContainer>
  );
};
