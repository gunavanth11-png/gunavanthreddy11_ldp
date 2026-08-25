import type { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  userProfileCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  userProfileCardLeft: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  },

  userProfileAvatar: {
    width: 40,
    height: 40,
  },

  userProfileContent: {
    display: "flex",
    flexDirection: "column",
  },

  userProfileName: {
    fontWeight: 600,
  },

  userProfileSubtext: {
    color: "text.secondary",
  },

  logoutButton: {
    color: "text.secondary",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      color: "text.primary",
    },
  },

  iconWithTypography: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },

  activeNavigationItem: {
    backgroundColor: "primary.light",
    color: "primary.main",
    borderRadius: 1,
    paddingX: 2,
    paddingY: 1.25,
  },

  inactiveNavigationItem: {
    backgroundColor: "background.paper",
    color: "text.secondary",
    borderRadius: 1,
    paddingX: 2,
    paddingY: 1.25,
    "&:hover": {
      backgroundColor: "background.default",
      color: "text.primary",
    },
  },

  iconWithTypographyIconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  sideNavigation: {
    width: 240,
    height: 720,
    backgroundColor: "background.paper",
    borderRadius: 1,
    border: "1px solid",
    borderColor: "divider",
    boxShadow: "0px 4px 28px rgba(45,45,47,0.05)",
    padding: 3,
    display: "flex",
    flexDirection: "column",
  },

  navigationList: {
    display: "flex",
    flexDirection: "column",
    gap: 0.5,
  },

  profileContainer: {
    marginTop: "auto",
    borderTop: "1px solid",
    borderColor: "divider",
    paddingTop: 3,
  },

  logo: {
    marginBottom: 4,
    paddingLeft: 2,
  },

  appContainer: {
    display: "flex",
    padding: 3,
    backgroundColor: "background.default",
    minHeight: "100vh",
  },
};