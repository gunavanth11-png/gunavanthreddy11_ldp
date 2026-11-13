import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { SxProps, Theme } from "@mui/material/styles";
import AppIconButton from "../../atoms/AppIconButton/AppIconButton";
import AppButton from "../../atoms/AppButton/AppButton";
import { DEFAULT_MAX_VISIBLE_PAGES, ARIA_LABELS } from "../../../utils/constants";

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  maxVisiblePages?: number;
  sx?: SxProps<Theme>;
}

const paginationContainerStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
};

const chevronIconStyles: SxProps<Theme> = {
  fontSize: 20,
};

const paginationIconButtonStyles: SxProps<Theme> = (theme) => ({
  width: 32,
  height: 32,
  minWidth: 32,
  borderRadius: `${theme.shape.borderRadius}px`,
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.background.default,
  },
  "&.Mui-disabled": {
    color: theme.palette.customBorder.dark,
  },
});

const getPageButtonStyles = (isActive: boolean): SxProps<Theme> => (theme) => ({
  minWidth: 32,
  width: 32,
  height: 32,
  px: 0,
  borderRadius: `${(theme.shape.borderRadius as number) - 2}px`,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: isActive ? 600 : 400,
  border: "none",
  ...(isActive
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
});

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = DEFAULT_MAX_VISIBLE_PAGES,
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

  const containerStyles = sx
    ? [paginationContainerStyles, ...(Array.isArray(sx) ? sx : [sx])]
    : paginationContainerStyles;

  return (
    <Box sx={containerStyles}>
      <AppIconButton
        icon={<ChevronLeftIcon sx={chevronIconStyles} />}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        ariaLabel={ARIA_LABELS.PREVIOUS_PAGE}
        sx={paginationIconButtonStyles}
      />

      {pageNumbers.map((page) => (
        <AppButton
          key={page}
          text={String(page)}
          onClick={() => onPageChange(page)}
          sx={getPageButtonStyles(page === currentPage)}
        />
      ))}

      <AppIconButton
        icon={<ChevronRightIcon sx={chevronIconStyles} />}
        disabled={currentPage >= safeTotalPages}
        onClick={() => onPageChange(currentPage + 1)}
        ariaLabel={ARIA_LABELS.NEXT_PAGE}
        sx={paginationIconButtonStyles}
      />
    </Box>
  );
};

export default PaginationControls;
