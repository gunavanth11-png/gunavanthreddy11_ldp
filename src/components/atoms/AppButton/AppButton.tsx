import Button from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export interface AppButtonProps {
  text?: string;
  children?: ReactNode;
  icon?: ReactNode;
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  filled?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const AppButton = ({
  text,
  children,
  icon,
  variant,
  color,
  filled = false,
  disabled = false,
  onClick,
  sx,
}: AppButtonProps) => {
  const resolvedVariant = variant ?? (filled ? "contained" : "outlined");
  const resolvedColor = color ?? (filled ? "primary" : "inherit");

  return (
    <Button
      variant={resolvedVariant}
      color={resolvedColor}
      startIcon={icon}
      onClick={onClick}
      disabled={disabled}
      sx={sx}
    >
      {text ?? children}
    </Button>
  );
};

export default AppButton;
