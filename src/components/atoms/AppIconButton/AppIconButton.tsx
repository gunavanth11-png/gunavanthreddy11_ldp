import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export interface AppIconButtonProps {
  icon: ReactNode;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  borderless?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  sx?: SxProps<Theme>;
}

const AppIconButton = ({
  icon,
  size = "small",
  disabled = false,
  onClick,
  ariaLabel,
  sx,
}: AppIconButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      size={size}
      sx={sx}
    >
      {icon}
    </IconButton>
  );
};

export default AppIconButton;
