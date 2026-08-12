import React from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export interface SeederLogoProps extends BoxProps {
  iconSize?: number;
  fontSize?: string;
  showText?: boolean;
}

export const SeederLogo: React.FC<SeederLogoProps> = ({
  iconSize = 28,
  fontSize = '1.5rem',
  showText = true,
  sx,
  ...props
}) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        userSelect: 'none',
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          width: iconSize,
          height: iconSize,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
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
      </Box>

      {showText && (
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: fontSize,
            fontWeight: 700,
            fontFamily: theme.typography.fontFamily,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Seeder
        </Typography>
      )}
    </Box>
  );
};

export default SeederLogo;

