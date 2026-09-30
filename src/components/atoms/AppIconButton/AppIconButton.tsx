import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export interface AppIconButtonProps {
  icon: ReactNode;
  size?: number;
  disabled?: boolean;
  borderless?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  sx?: SxProps<Theme>;
}

const AppIconButton = ({
  icon,
  size = 32,
  disabled = false,
  borderless = false,
  onClick,
  ariaLabel,
  sx,
}: AppIconButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      size="small"
      sx={[
        (theme) => ({
          width: size,
          height: size,
          minWidth: size,
          border: borderless ? "none" : `1px solid ${theme.palette.divider}`,
          borderRadius: `${theme.shape.borderRadius}px`,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.background.default,
            borderColor: borderless ? "none" : theme.palette.customBorder.dark,
          },
          "&.Mui-disabled": {
            color: theme.palette.customBorder.dark,
            border: borderless ? "none" : `1px solid ${theme.palette.divider}`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {icon}
    </IconButton>
  );
};

export default AppIconButton;
