import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { SxProps, Theme } from "@mui/material/styles";
import AppIconButton from "../../atoms/AppIconButton/AppIconButton";
import PageNumberButton from "../../atoms/PageNumberButton/PageNumberButton";

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  maxVisiblePages?: number;
  sx?: SxProps<Theme>;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 3,
  sx,
}: PaginationControlsProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const pageNumbers: number[] = [];

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(safeTotalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        ...sx,
      }}
    >
      <AppIconButton
        icon={<ChevronLeftIcon sx={{ fontSize: 20 }} />}
        disabled={currentPage <= 1}
        borderless
        onClick={() => onPageChange(currentPage - 1)}
        ariaLabel="Previous page"
      />

      {pageNumbers.map((page) => (
        <PageNumberButton
          key={page}
          pageNumber={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        />
      ))}

      <AppIconButton
        icon={<ChevronRightIcon sx={{ fontSize: 20 }} />}
        disabled={currentPage >= safeTotalPages}
        borderless
        onClick={() => onPageChange(currentPage + 1)}
        ariaLabel="Next page"
      />
    </Box>
  );
}
