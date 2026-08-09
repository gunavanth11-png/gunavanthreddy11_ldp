import Button from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";

export interface PageNumberButtonProps {
  pageNumber: number;
  isActive: boolean;
  onClick: () => void;
  sx?: SxProps<Theme>;
}

export default function PageNumberButton({
  pageNumber,
  isActive,
  onClick,
  sx,
}: PageNumberButtonProps) {
  return (
    <Button
      onClick={onClick}
      disableElevation
      disableRipple
      sx={(theme) => ({
        minWidth: 32,
        width: 32,
        height: 32,
        p: 0,
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: isActive ? 600 : 400,
        textTransform: "none",
        fontFamily: theme.typography.fontFamily,

        ...(isActive
          ? {
              backgroundColor: theme.palette.brand.activeNavBg,
              color: theme.palette.brand.activeNavText,
              "&:hover": {
                backgroundColor: "#E0E7FF",
              },
            }
          : {
              backgroundColor: "transparent",
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              },
            }),
        ...sx,
      })}
    >
      {pageNumber}
    </Button>
  );
}
