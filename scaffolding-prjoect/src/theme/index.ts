import { createTheme } from '@mui/material/styles';
import { colors } from './colors';
import { typography } from './typography';

declare module '@mui/material/styles' {
  interface Palette {
    status: {
      availableBg: string;
      availableText: string;
      pendingBg: string;
      pendingText: string;
      successBg: string;
      successText: string;
      warningBg: string;
      warningText: string;
      warningHoverText: string;
    };
    border: {
      default: string;
      subtle: string;
      light: string;
    };
    icon: {
      active: string;
      inactive: string;
      boxBg: string;
    };
    customBackground: {
      sidebar: string;
      elevation1: string;
      elevation2: string;
      card: string;
    };
  }
  interface PaletteOptions {
    status?: {
      availableBg?: string;
      availableText?: string;
      pendingBg?: string;
      pendingText?: string;
      successBg?: string;
      successText?: string;
      warningBg?: string;
      warningText?: string;
      warningHoverText?: string;
    };
    border?: {
      default?: string;
      subtle?: string;
      light?: string;
    };
    icon?: {
      active?: string;
      inactive?: string;
      boxBg?: string;
    };
    customBackground?: {
      sidebar?: string;
      elevation1?: string;
      elevation2?: string;
      card?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrastText,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrastText,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
    divider: colors.border.default,
    status: {
      availableBg: colors.status.availableBg,
      availableText: colors.status.availableText,
      pendingBg: colors.status.pendingBg,
      pendingText: colors.status.pendingText,
      successBg: colors.status.successBg,
      successText: colors.status.successText,
      warningBg: colors.status.warningBg,
      warningText: colors.status.warningText,
      warningHoverText: colors.status.warningHoverText,
    },
    border: {
      default: colors.border.default,
      subtle: colors.border.subtle,
      light: colors.border.light,
    },
    icon: {
      active: colors.icon.active,
      inactive: colors.icon.inactive,
      boxBg: colors.icon.boxBg,
    },
    customBackground: {
      sidebar: colors.background.sidebar,
      elevation1: colors.background.elevation1,
      elevation2: colors.background.elevation2,
      card: colors.background.card,
    },
  },
  typography: {
    fontFamily: typography.fontFamily,
    h1: typography.h1,
    h2: typography.h2,
    h3: typography.h3,
    subtitle1: typography.subtitle1,
    subtitle2: typography.subtitle2,
    body1: typography.body1,
    body2: typography.body2,
    button: typography.button,
    caption: typography.caption,
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background.default,
          color: colors.text.primary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 24px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: colors.primary.main,
          '&:hover': {
            backgroundColor: colors.primary.light,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.paper,
          backgroundImage: 'none',
          borderRadius: '16px',
          border: `1px solid ${colors.border.subtle}`,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors.border.default}`,
          padding: '16px 24px',
          color: colors.text.primary,
        },
        head: {
          color: colors.text.secondary,
          fontWeight: 500,
          fontSize: '0.8125rem',
          backgroundColor: 'transparent',
          borderBottom: `1px solid ${colors.border.default}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
          fontSize: '0.8125rem',
        },
      },
    },
  },
});

export { colors, typography };

