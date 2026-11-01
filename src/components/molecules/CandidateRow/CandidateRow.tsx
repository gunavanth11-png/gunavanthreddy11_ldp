import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Candidate } from "../../../types/candidate";
import LinkText from "../../atoms/LinkText/LinkText";
import StatusBadge from "../../atoms/StatusBadge/StatusBadge";
import { STATUS_CLEAR } from "../../../utils/constants";

export interface CandidateRowProps {
  candidate: Candidate;
  onClick?: (candidate: Candidate) => void;
  sx?: SxProps<Theme>;
}

const rowStyles: SxProps<Theme> = (theme) => ({
  height: 64,
  "&:hover": {
    backgroundColor: theme.palette.background.default,
  },
});

const nameCellStyles: SxProps<Theme> = (theme) => ({
  whiteSpace: "nowrap",
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 500,
  color: theme.palette.brand.primaryLink,
  verticalAlign: "middle",
  px: 3,
});

const adjudicationCellStyles: SxProps<Theme> = (theme) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 400,
  color: theme.palette.text.primary,
  verticalAlign: "middle",
  px: 3,
});

const statusCellStyles: SxProps<Theme> = {
  verticalAlign: "middle",
  px: 3,
};

const clearStatusBadgeStyles: SxProps<Theme> = (theme) => ({
  height: 28,
  borderRadius: `${(theme.shape.borderRadius as number) - 2}px`,
  backgroundColor: theme.palette.status.clearBg,
  color: theme.palette.status.clearText,
});

const considerStatusBadgeStyles: SxProps<Theme> = (theme) => ({
  height: 28,
  borderRadius: `${(theme.shape.borderRadius as number) - 2}px`,
  backgroundColor: theme.palette.status.considerBg,
  color: theme.palette.status.considerText,
});

const locationCellStyles: SxProps<Theme> = (theme) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 400,
  color: theme.palette.text.primary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  verticalAlign: "middle",
  px: 3,
});

const dateCellStyles: SxProps<Theme> = (theme) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 400,
  color: theme.palette.text.primary,
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  px: 3,
});

const CandidateRow = ({ candidate, onClick, sx }: CandidateRowProps) => {
  const isClear = candidate.status === STATUS_CLEAR;
  const badgeStyles = isClear ? clearStatusBadgeStyles : considerStatusBadgeStyles;
  const resolvedRowStyles = sx
    ? [rowStyles, ...(Array.isArray(sx) ? sx : [sx])]
    : rowStyles;

  return (
    <TableRow
      hover
      onClick={() => onClick && onClick(candidate)}
      sx={resolvedRowStyles}
    >
      <TableCell sx={nameCellStyles}>
        <LinkText>{candidate.name}</LinkText>
      </TableCell>

      <TableCell sx={adjudicationCellStyles}>
        {candidate.adjudication}
      </TableCell>

      <TableCell sx={statusCellStyles}>
        <StatusBadge status={candidate.status} sx={badgeStyles} />
      </TableCell>

      <TableCell sx={locationCellStyles}>
        {candidate.location}
      </TableCell>

      <TableCell sx={dateCellStyles}>
        {candidate.date}
      </TableCell>
    </TableRow>
  );
};

export default CandidateRow;
