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

const NavItem = ({ icon, label, isActive, onClick, sx }: NavItemProps) => {
  return (
    <ListItemButton
      selected={isActive}
      onClick={onClick}
      sx={[
        (theme) => ({
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
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <ListItemIcon
        sx={(theme) => ({
          minWidth: "auto",
          color: isActive ? theme.palette.brand.activeNavText : theme.palette.text.secondary,
        })}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        sx={{
          "& .MuiListItemText-primary": {
            fontSize: "15px",
            fontWeight: isActive ? 600 : 400,
            color: "inherit",
            fontFamily: "inherit",
          },
        }}
      />
    </ListItemButton>
  );
};

export default NavItem;
