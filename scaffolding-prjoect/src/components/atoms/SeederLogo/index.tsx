import React from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { TEXT_CONSTANTS } from '../../../constants';
import { FONT_WEIGHT, COMPONENT_SIZE } from '../../../utils/styleConstants';

export interface SeederLogoProps extends BoxProps {
  iconSize?: number;
  fontSize?: string;
  showText?: boolean;
}

const LogoBox = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  userSelect: 'none',
}));

const SvgWrapperBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'iconSize',
})<{ iconSize: number }>(({ iconSize }) => ({
  width: iconSize,
  height: iconSize,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}));

const LogoText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'customFontSize',
})<{ customFontSize?: string }>(({ theme, customFontSize }) => ({
  color: theme.palette.text.primary,
  fontSize: customFontSize || COMPONENT_SIZE.LOGO_FONT_DEFAULT,
  fontWeight: FONT_WEIGHT.BOLD,
  fontFamily: theme.typography.fontFamily,
  letterSpacing: '-0.02em',
  lineHeight: 1,
}));

export const SeederLogo: React.FC<SeederLogoProps> = ({
  iconSize = COMPONENT_SIZE.LOGO_ICON_DEFAULT,
  fontSize = COMPONENT_SIZE.LOGO_FONT_DEFAULT,
  showText = true,
  ...props
}) => {
  const theme = useTheme();

  return (
    <LogoBox {...props}>
      <SvgWrapperBox iconSize={iconSize}>
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="13"
            height="20"
            rx="5"
            fill={theme.palette.primary.main}
          />
          <rect
            x="12"
            y="9"
            width="13"
            height="20"
            rx="5"
            fill={theme.palette.primary.main}
          />
        </svg>
      </SvgWrapperBox>

      {showText && (
        <LogoText customFontSize={fontSize}>
          {TEXT_CONSTANTS.SIDEBAR.LOGO_TEXT}
        </LogoText>
      )}
    </LogoBox>
  );
};

export default SeederLogo;
