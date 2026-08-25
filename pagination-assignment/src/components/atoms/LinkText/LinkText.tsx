import Link from "@mui/material/Link";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export interface LinkTextProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const LinkText = ({ children, href = "#", onClick, sx }: LinkTextProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      underline="hover"
      sx={[
        (theme) => ({
          color: theme.palette.brand.primaryLink,
          fontWeight: 500,
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.fontFamily,
          cursor: "pointer",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Link>
  );
};

export default LinkText;
