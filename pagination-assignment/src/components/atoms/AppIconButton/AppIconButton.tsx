import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export interface AppIconButtonProps {
  icon: ReactNode;
  disabled?: boolean;
  borderless?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  sx?: SxProps<Theme>;
}

export default function AppIconButton({
  icon,
  disabled = false,
  borderless = false,
  onClick,
  ariaLabel,
  sx,
}: AppIconButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      size="small"
      sx={(theme) => ({
        width: 32,
        height: 32,
        minWidth: 32,
        p: 0,
        border: borderless ? "none" : `1px solid ${theme.palette.divider}`,
        borderRadius: `${theme.shape.borderRadius}px`,
        color: theme.palette.text.primary,
        transition: "all 0.2s ease",

        "&:hover": {
          backgroundColor: theme.palette.background.default,
          borderColor: borderless ? "none" : theme.palette.customBorder.dark,
        },

        "&.Mui-disabled": {
          color: theme.palette.customBorder.dark,
          border: borderless ? "none" : `1px solid ${theme.palette.divider}`,
        },
        ...sx,
      })}
    >
      {icon}
    </IconButton>
  );
}
