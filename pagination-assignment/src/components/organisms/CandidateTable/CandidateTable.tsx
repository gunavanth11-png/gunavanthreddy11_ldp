import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Candidate } from "../../../types/candidate";
import TableHeaderRow from "../../molecules/TableHeaderRow/TableHeaderRow";
import CandidateRow from "../../molecules/CandidateRow/CandidateRow";

export interface CandidateTableProps {
  rows: Candidate[];
  onRowClick?: (candidate: Candidate) => void;
  sx?: SxProps<Theme>;
}

export default function CandidateTable({ rows, onRowClick, sx }: CandidateTableProps) {
  return (
    <TableContainer
      sx={(theme) => ({
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme.palette.customBorder.dark,
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: theme.palette.text.secondary,
        },
        ...sx,
      })}
    >
      <Table
        stickyHeader
        sx={{
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
      >
        <TableHeaderRow />
        <TableBody>
          {rows.map((candidate) => (
            <CandidateRow
              key={candidate.id}
              candidate={candidate}
              onClick={onRowClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
