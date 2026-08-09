import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3154F4",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },

    divider: "#ECECEC",
  },

  typography: {
    fontFamily: "Inter, sans-serif",

    h4: {
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: "20px",
      color: "#3154F4",
    },

    body1: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
      color: "#111827",
    },

    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
      color: "#6B7280",
    },

    subtitle1: {
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "24px",
      color: "#111827",
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
          border: "1px solid #ECECEC",
          boxShadow: "0px 4px 28px rgba(45,45,47,0.10)",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#ECECEC",
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 40,
          height: 40,
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: 20,
        },
      },
    },
  },
});

export default theme;