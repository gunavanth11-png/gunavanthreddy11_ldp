import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Candidate } from "../../../types/candidate";
import Sidebar from "../../organisms/Sidebar/Sidebar";
import PageHeader from "../../organisms/PageHeader/PageHeader";
import TableToolbar from "../../organisms/TableToolbar/TableToolbar";
import CandidateTable from "../../organisms/CandidateTable/CandidateTable";
import TableFooter from "../../organisms/TableFooter/TableFooter";

export interface CandidatesTemplateProps {
  search: string;
  onSearchChange: (newValue: string) => void;
  rows: Candidate[];
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  onPerPageChange: (newValue: number) => void;
  onPageChange: (newPage: number) => void;
  activeNav?: string;
  onSelectNav?: (label: string) => void;
  sx?: SxProps<Theme>;
}

export default function CandidatesTemplate({
  search,
  onSearchChange,
  rows,
  total,
  perPage,
  currentPage,
  totalPages,
  onPerPageChange,
  onPageChange,
  activeNav = "Candidates",
  onSelectNav,
  sx,
}: CandidatesTemplateProps) {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: theme.palette.background.default,
        overflow: "hidden",
        ...sx,
      })}
    >
      <Sidebar activeLabel={activeNav} onSelectNav={onSelectNav} />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <PageHeader />

        <Paper
          elevation={0}
          sx={(theme) => ({
            mx: 3,
            mb: 3,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: "14px",
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            overflow: "hidden",
          })}
        >
          <TableToolbar
            search={search}
            onSearchChange={onSearchChange}
          />

          <CandidateTable rows={rows} />

          <TableFooter
            total={total}
            perPage={perPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPerPageChange={onPerPageChange}
            onPageChange={onPageChange}
          />
        </Paper>
      </Box>
    </Box>
  );
}
