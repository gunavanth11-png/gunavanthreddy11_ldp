import Link from "@mui/material/Link";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export interface LinkTextProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const getLinkTextStyles = (theme: Theme): SxProps<Theme> => ({
  color: theme.palette.brand.primaryLink,
  fontWeight: 500,
  fontSize: theme.typography.body2.fontSize,
  fontFamily: theme.typography.fontFamily,
  cursor: "pointer",
});

const LinkText = ({ children, href = "#", onClick, sx }: LinkTextProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      underline="hover"
      sx={[
        getLinkTextStyles,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Link>
  );
};

export default LinkText;
