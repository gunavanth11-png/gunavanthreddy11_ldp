import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export interface NavItemProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const getNavItemButtonStyles = (isActive: boolean): SxProps<Theme> => (theme) => ({
  height: 48,
  px: 1.5,
  borderRadius: `${theme.shape.borderRadius}px`,
  mb: 0.5,
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  backgroundColor: isActive ? theme.palette.brand.activeNavBg : "transparent",
  color: isActive ? theme.palette.brand.activeNavText : theme.palette.text.primary,
  transition: "0.2s ease",
  "&:hover": {
    backgroundColor: isActive
      ? theme.palette.brand.activeNavBg
      : theme.palette.background.default,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.brand.activeNavBg,
    color: theme.palette.brand.activeNavText,
    "&:hover": {
      backgroundColor: theme.palette.brand.activeNavBg,
    },
  },
});

const getNavItemIconStyles = (isActive: boolean): SxProps<Theme> => (theme) => ({
  minWidth: "auto",
  color: isActive ? theme.palette.brand.activeNavText : theme.palette.text.secondary,
});

const getNavItemTextStyles = (isActive: boolean): SxProps<Theme> => ({
  "& .MuiListItemText-primary": {
    fontSize: "15px",
    fontWeight: isActive ? 600 : 400,
    color: "inherit",
    fontFamily: "inherit",
  },
});

const NavItem = ({ icon, label, isActive, onClick, sx }: NavItemProps) => {
  const buttonStyles = [
    getNavItemButtonStyles(isActive),
    ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
  ];
  const iconStyles = getNavItemIconStyles(isActive);
  const textStyles = getNavItemTextStyles(isActive);

  return (
    <ListItemButton
      selected={isActive}
      onClick={onClick}
      sx={buttonStyles}
    >
      <ListItemIcon sx={iconStyles}>
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        sx={textStyles}
      />
    </ListItemButton>
  );
};

export default NavItem;
