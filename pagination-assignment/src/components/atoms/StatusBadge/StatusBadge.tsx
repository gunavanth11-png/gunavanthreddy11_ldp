import Chip from "@mui/material/Chip";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Status } from "../../../types/candidate";

export interface StatusBadgeProps {
  status: Status;
  sx?: SxProps<Theme>;
}

const getStatusBadgeStyles = (isClear: boolean) => (theme: Theme) => ({
  height: 28,
  borderRadius: `${(theme.shape.borderRadius as number) - 2}px`,
  backgroundColor: isClear
    ? theme.palette.status.clearBg
    : theme.palette.status.considerBg,
  color: isClear
    ? theme.palette.status.clearText
    : theme.palette.status.considerText,
});

const StatusBadge = ({ status, sx }: StatusBadgeProps) => {
  const isClear = status === "CLEAR";

  return (
    <Chip
      label={status}
      sx={[
        getStatusBadgeStyles(isClear),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
};

export default StatusBadge;
