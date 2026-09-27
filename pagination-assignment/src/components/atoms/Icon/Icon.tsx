import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export interface IconProps {
  icon: ReactNode;
  sx?: SxProps<Theme>;
}

const Icon = ({ icon, sx }: IconProps) => {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      {icon}
    </Box>
  );
};

export default Icon;
