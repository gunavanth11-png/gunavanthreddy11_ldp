import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Candidate } from "../../../types/candidate";
import LinkText from "../../atoms/LinkText/LinkText";
import StatusBadge from "../../atoms/StatusBadge/StatusBadge";

export interface CandidateRowProps {
  candidate: Candidate;
  onClick?: (candidate: Candidate) => void;
  sx?: SxProps<Theme>;
}

export default function CandidateRow({ candidate, onClick, sx }: CandidateRowProps) {
  return (
    <TableRow
      hover
      onClick={() => onClick && onClick(candidate)}
      sx={(theme) => ({
        height: 64,
        "&:hover": {
          backgroundColor: theme.palette.background.default,
        },
        ...sx,
      })}
    >
      <TableCell
        sx={(theme) => ({
          whiteSpace: "nowrap",
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize,
          fontWeight: 500,
          color: theme.palette.brand.primaryLink,
          verticalAlign: "middle",
          px: 3,
        })}
      >
        <LinkText>{candidate.name}</LinkText>
      </TableCell>

      <TableCell
        sx={(theme) => ({
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize,
          fontWeight: 400,
          color: theme.palette.text.primary,
          verticalAlign: "middle",
          px: 3,
        })}
      >
        {candidate.adjudication}
      </TableCell>

      <TableCell
        sx={{
          verticalAlign: "middle",
          px: 3,
        }}
      >
        <StatusBadge status={candidate.status} />
      </TableCell>

      <TableCell
        sx={(theme) => ({
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize,
          fontWeight: 400,
          color: theme.palette.text.primary,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          verticalAlign: "middle",
          px: 3,
        })}
      >
        {candidate.location}
      </TableCell>

      <TableCell
        sx={(theme) => ({
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize,
          fontWeight: 400,
          color: theme.palette.text.primary,
          whiteSpace: "nowrap",
          verticalAlign: "middle",
          px: 3,
        })}
      >
        {candidate.date}
      </TableCell>
    </TableRow>
  );
}
