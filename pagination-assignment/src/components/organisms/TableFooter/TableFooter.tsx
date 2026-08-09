import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import ResultsSummary from "../../molecules/ResultsSummary/ResultsSummary";
import PaginationControls from "../../molecules/PaginationControls/PaginationControls";

export interface TableFooterProps {
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  onPerPageChange: (newValue: number) => void;
  onPageChange: (newPage: number) => void;
  sx?: SxProps<Theme>;
}

export default function TableFooter({
  total,
  perPage,
  currentPage,
  totalPages,
  onPerPageChange,
  onPageChange,
  sx,
}: TableFooterProps) {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 1.5,
        minHeight: 64,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        ...sx,
      })}
    >
      <ResultsSummary
        total={total}
        perPage={perPage}
        onPerPageChange={onPerPageChange}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Box>
  );
}
