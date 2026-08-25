import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { SxProps, Theme } from "@mui/material/styles";
import AppIconButton from "../../atoms/AppIconButton/AppIconButton";
import AppButton from "../../atoms/AppButton/AppButton";

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  maxVisiblePages?: number;
  sx?: SxProps<Theme>;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 3,
  sx,
}: PaginationControlsProps) => {
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
      sx={[
        {
          display: "flex",
          alignItems: "center",
          gap: "4px",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <AppIconButton
        icon={<ChevronLeftIcon sx={{ fontSize: 20 }} />}
        disabled={currentPage <= 1}
        borderless
        onClick={() => onPageChange(currentPage - 1)}
        ariaLabel="Previous page"
      />

      {pageNumbers.map((page) => (
        <AppButton
          key={page}
          text={String(page)}
          onClick={() => onPageChange(page)}
          sx={(theme) => ({
            minWidth: 32,
            width: 32,
            height: 32,
            px: 0,
            borderRadius: `${(theme.shape.borderRadius as number) - 2}px`,
            fontSize: theme.typography.body2.fontSize,
            fontWeight: page === currentPage ? 600 : 400,
            border: "none",
            ...(page === currentPage
              ? {
                  backgroundColor: theme.palette.brand.activeNavBg,
                  color: theme.palette.brand.activeNavText,
                  "&:hover": {
                    backgroundColor: theme.palette.brand.activeNavBg,
                  },
                }
              : {
                  backgroundColor: "transparent",
                  color: theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                  },
                }),
          })}
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
};

export default PaginationControls;
