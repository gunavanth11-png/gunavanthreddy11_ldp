import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export interface IconProps {
  icon: ReactNode;
  color?: string;
  size?: number | string;
  sx?: SxProps<Theme>;
}

export default function Icon({ icon, color, size, sx }: IconProps) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: color || "inherit",
        fontSize: size || "inherit",
        ...sx,
      }}
    >
      {icon}
    </Box>
  );
}
