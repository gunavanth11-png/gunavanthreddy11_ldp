import Button from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export interface AppButtonProps {
  text: string;
  icon?: ReactNode;
  filled?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const AppButton = ({
  text,
  icon,
  filled = false,
  disabled = false,
  onClick,
  sx,
}: AppButtonProps) => {
  return (
    <Button
      variant={filled ? "contained" : "outlined"}
      color={filled ? "primary" : "inherit"}
      startIcon={icon}
      onClick={onClick}
      disabled={disabled}
      sx={[
        (theme) => ({
          borderRadius: `${(theme.shape.borderRadius as number) - 2}px`,
          borderColor: filled ? undefined : theme.palette.customBorder.dark,
          color: filled
            ? theme.palette.primary.contrastText
            : theme.palette.text.primary,
          "&:hover": {
            borderColor: filled ? undefined : theme.palette.text.secondary,
            backgroundColor: filled
              ? theme.palette.primary.dark
              : theme.palette.background.default,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {text}
    </Button>
  );
};

export default AppButton;
