import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export interface IconProps {
  icon: ReactNode;
  sx?: SxProps<Theme>;
}

const iconStyles: SxProps<Theme> = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const Icon = ({ icon, sx }: IconProps) => {
  const resolvedStyles = sx
    ? [iconStyles, ...(Array.isArray(sx) ? sx : [sx])]
    : iconStyles;

  return (
    <Box component="span" sx={resolvedStyles}>
      {icon}
    </Box>
  );
};

export default Icon;
