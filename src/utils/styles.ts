import type { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  userProfileCard: {
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

  iconWithTypography: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    cursor: "pointer",
  },

  activeNavigationItem: {
    backgroundColor: "primary.light",
    color: "primary.main",
  },

  inactiveNavigationItem: {
    backgroundColor: "background.paper",
    color: "text.primary",
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
    boxShadow: 3,
    padding: 4,
    display: "flex",
    flexDirection: "column",
  },

  navigationList: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },

  navigationItem: {
    height: 48,
    borderRadius: 0.75,
  },

  navigationIcon: {
    minWidth: 36,
    color: "text.primary",
  },

  navigationText: {
    fontSize: 14,
    color: "text.primary",
  },

  profileContainer: {
    marginTop: "auto",
  },

  logo: {
    fontSize: 20,
    fontWeight: 700,
    color: "primary.main",
    marginBottom: 4,
  },

  appContainer: {
    display: "flex",
    padding: 3,
    backgroundColor: "background.default",
    minHeight: "100vh",
  },
};