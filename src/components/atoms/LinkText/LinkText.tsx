import Link from "@mui/material/Link";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export interface LinkTextProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const defaultLinkStyles: SxProps<Theme> = (theme) => ({
  color: theme.palette.brand.primaryLink,
  fontWeight: 500,
  fontSize: theme.typography.body2.fontSize,
  fontFamily: theme.typography.fontFamily,
  cursor: "pointer",
});

const LinkText = ({ children, href = "#", onClick, sx }: LinkTextProps) => {
  const resolvedStyles = sx
    ? [defaultLinkStyles, ...(Array.isArray(sx) ? sx : [sx])]
    : defaultLinkStyles;

  return (
    <Link
      href={href}
      onClick={onClick}
      underline="hover"
      sx={resolvedStyles}
    >
      {children}
    </Link>
  );
};

export default LinkText;
