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

export default function AppButton({
  text,
  icon,
  filled = false,
  disabled = false,
  onClick,
  sx,
}: AppButtonProps) {
  return (
    <Button
      variant={filled ? "contained" : "outlined"}
      color={filled ? "primary" : "inherit"}
      startIcon={icon}
      onClick={onClick}
      disabled={disabled}
      sx={(theme) => ({
        height: 36,
        minWidth: "auto",
        px: 1.75,
        borderRadius: `${theme.shape.borderRadius - 2}px`,
        textTransform: "none",
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 500,
        borderColor: filled ? undefined : theme.palette.customBorder.dark,
        color: filled
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
          borderColor: filled ? undefined : theme.palette.text.secondary,
          backgroundColor: filled
            ? theme.palette.primary.dark
            : theme.palette.background.default,
        },
        "& .MuiButton-startIcon": {
          marginRight: "6px",
        },
        ...sx,
      })}
    >
      {text}
    </Button>
  );
}
