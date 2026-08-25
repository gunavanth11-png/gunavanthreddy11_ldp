import { Typography as MuiTypography } from "@mui/material";
import type { TypographyProps as MuiTypographyProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type TypographyProps = {
  text: string;
  variant?: MuiTypographyProps["variant"];
  color?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  lineHeight?: string | number;
  sx?: SxProps<Theme>;
};

const CustomTypography = ({
  text,
  variant = "body1",
  color,
  fontSize,
  fontWeight,
  lineHeight,
  sx,
}: TypographyProps) => {
  return (
    <MuiTypography
      variant={variant}
      sx={{
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        lineHeight: lineHeight,
        ...sx,
      }}
    >
      {text}
    </MuiTypography>
  );
};

export default CustomTypography;