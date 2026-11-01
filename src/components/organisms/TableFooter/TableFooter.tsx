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

const footerContainerStyles: SxProps<Theme> = (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: 3,
  py: 1.5,
  minHeight: 64,
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
});

const TableFooter = ({
  total,
  perPage,
  currentPage,
  totalPages,
  onPerPageChange,
  onPageChange,
  sx,
}: TableFooterProps) => {
  const containerStyles = sx
    ? [footerContainerStyles, ...(Array.isArray(sx) ? sx : [sx])]
    : footerContainerStyles;

  return (
    <Box sx={containerStyles}>
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
};

export default TableFooter;
