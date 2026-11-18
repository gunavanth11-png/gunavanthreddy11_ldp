import React from 'react';
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BORDER_RADIUS, FONT_WEIGHT, COMPONENT_SIZE } from '../../../utils/styleConstants';

export interface StatusChipProps extends Omit<MuiChipProps, 'color'> {
  status?: 'Available' | 'Pending' | 'Financed';
}

const StyledChip = styled(MuiChip)<StatusChipProps>(({ theme, status }) => ({
  borderRadius: BORDER_RADIUS.XS,
  fontWeight: FONT_WEIGHT.MEDIUM,
  fontSize: theme.typography.caption.fontSize,
  height: COMPONENT_SIZE.CHIP_HEIGHT,
  padding: '0 4px',
  ...(status === 'Available' && {
    backgroundColor: theme.palette.status.availableBg,
    color: theme.palette.status.availableText,
    border: 'none',
  }),
  ...(status === 'Pending' && {
    backgroundColor: theme.palette.status.pendingBg,
    color: theme.palette.status.pendingText,
  }),
  ...(status === 'Financed' && {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.text.secondary,
  }),
}));

export const StatusChip: React.FC<StatusChipProps> = ({ status = 'Available', label, ...props }) => {
  return <StyledChip status={status} label={label || status} {...props} />;
};
