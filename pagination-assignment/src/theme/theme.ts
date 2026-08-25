import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    status: {
      clearBg: string;
      clearText: string;
      considerBg: string;
      considerText: string;
    };
    customBorder: {
      light: string;
      main: string;
      dark: string;
    };
    brand: {
      logo: string;
      activeNavBg: string;
      activeNavText: string;
      primaryLink: string;
    };
  }
  interface PaletteOptions {
    status?: {
      clearBg?: string;
      clearText?: string;
      considerBg?: string;
      considerText?: string;
    };
    customBorder?: {
      light?: string;
      main?: string;
      dark?: string;
    };
    brand?: {
      logo?: string;
      activeNavBg?: string;
      activeNavText?: string;
      primaryLink?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
      light: "#EEF2FF",
      dark: "#1D4ED8",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    divider: "#E5E7EB",
    status: {
      clearBg: "#ECFDF3",
      clearText: "#027A48",
      considerBg: "#FFFBEB",
      considerText: "#B45309",
    },
    customBorder: {
      light: "#FAFBFC",
      main: "#E5E7EB",
      dark: "#D1D5DB",
    },
    brand: {
      logo: "#1434A4",
      activeNavBg: "#EEF2FF",
      activeNavText: "#2563EB",
      primaryLink: "#1D4ED8",
    },
  },
  typography: {
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h5: {
      fontSize: "22px",
      fontWeight: 600,
      lineHeight: "30px",
    },
    // Used for sidebar logo
    h6: {
      fontSize: "22px",
      fontWeight: 700,
      lineHeight: "28px",
      letterSpacing: "0.5px",
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
    },
    body1: {
      fontSize: "15px",
      fontWeight: 400,
      lineHeight: "22px",
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "18px",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: "12px",
          height: 36,
          minWidth: "auto",
          paddingLeft: "14px",
          paddingRight: "14px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
          "& .MuiButton-startIcon": {
            marginRight: "6px",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease",
        },
        sizeSmall: {
          padding: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontWeight: 600,
          fontSize: "12px",
          lineHeight: "18px",
          letterSpacing: "0.4px",
          border: "none",
          "& .MuiChip-label": {
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, sans-serif",
          borderBottom: "1px solid #E5E7EB",
        },
      },
    },
  },
});

export default theme;