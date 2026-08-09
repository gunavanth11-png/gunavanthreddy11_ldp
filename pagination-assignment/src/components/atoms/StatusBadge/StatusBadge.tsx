import Chip from "@mui/material/Chip";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Status } from "../../../types/candidate";

export interface StatusBadgeProps {
  status: Status;
  sx?: SxProps<Theme>;
}

export default function StatusBadge({ status, sx }: StatusBadgeProps) {
  const isClear = status === "CLEAR";

  return (
    <Chip
      label={status}
      sx={(theme) => ({
        height: 28,
        borderRadius: `${theme.shape.borderRadius - 2}px`,
        backgroundColor: isClear
          ? theme.palette.status.clearBg
          : theme.palette.status.considerBg,
        color: isClear
          ? theme.palette.status.clearText
          : theme.palette.status.considerText,
        border: "none",
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 600,
        lineHeight: "18px",
        letterSpacing: "0.4px",
        "& .MuiChip-label": {
          px: 1.5,
          py: 0,
        },
        ...sx,
      })}
    />
  );
}
