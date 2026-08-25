import type { ReactNode } from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type IconProps = {
  icon: ReactNode;
  color?: string;
  sx?: SxProps<Theme>;
};

const Icon = ({ icon, color, sx }: IconProps) => {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: color || "inherit",
        "& svg": {
          color: color || "inherit",
        },
        ...sx,
      }}
    >
      {icon}
    </Box>
  );
};

export default Icon;