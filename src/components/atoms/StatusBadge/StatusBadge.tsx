import Chip from "@mui/material/Chip";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Status } from "../../../types/candidate";

export interface StatusBadgeProps {
  status: Status;
  sx?: SxProps<Theme>;
}

const StatusBadge = ({ status, sx }: StatusBadgeProps) => {
  return (
    <Chip
      label={status}
      sx={sx}
    />
  );
};

export default StatusBadge;
