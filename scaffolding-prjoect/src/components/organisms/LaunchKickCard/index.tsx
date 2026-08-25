import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from '../../atoms/Button';
import { TEXT_CONSTANTS } from '../../../constants';

export interface LaunchKickCardProps {
  availableAmount?: string;
  onLaunchClick?: () => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.border.default}`,
  borderRadius: '16px',
  padding: theme.spacing(4, 3.5),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
}));

const CardContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontSize: '1.25rem',
}));

const CardDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

const AmountHighlight = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const LaunchKickCard: React.FC<LaunchKickCardProps> = ({
  availableAmount = TEXT_CONSTANTS.LAUNCH_CARD.DEFAULT_AMOUNT,
  onLaunchClick,
}) => {
  return (
    <StyledPaper elevation={0}>
      <CardContentBox>
        <CardTitle variant="h3">{TEXT_CONSTANTS.LAUNCH_CARD.TITLE}</CardTitle>

        <CardDescription variant="body1">
          {TEXT_CONSTANTS.LAUNCH_CARD.PREFIX_TEXT}{' '}
          <AmountHighlight component="span">{availableAmount}</AmountHighlight>{' '}
          {TEXT_CONSTANTS.LAUNCH_CARD.SUFFIX_TEXT}
        </CardDescription>
      </CardContentBox>

      <StyledButton variant="contained" fullWidth onClick={onLaunchClick}>
        {TEXT_CONSTANTS.LAUNCH_CARD.BUTTON_TEXT}
      </StyledButton>
    </StyledPaper>
  );
};
