import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { BORDER_RADIUS, FONT_WEIGHT, TRANSITION, SHADOW } from '../../../utils/styleConstants';

export interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}

const StyledButton = styled(MuiButton)<ButtonProps>(({ theme, variant }) => ({
  borderRadius: BORDER_RADIUS.MD,
  padding: '12px 24px',
  fontSize: theme.typography.body1.fontSize,
  fontWeight: FONT_WEIGHT.SEMI_BOLD,
  textTransform: 'none',
  boxShadow: SHADOW.NONE,
  transition: TRANSITION.EASE_IN_OUT,
  ...(variant === 'contained' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
  }),
  ...(variant === 'outlined' && {
    borderColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
  }),
}));

export const Button: React.FC<ButtonProps> = ({ children, variant = 'contained', ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};
