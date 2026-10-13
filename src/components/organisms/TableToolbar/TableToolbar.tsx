import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { SxProps, Theme } from "@mui/material/styles";
import SearchInput from "../../molecules/SearchInput/SearchInput";
import AppButton from "../../atoms/AppButton/AppButton";
import AppIconButton from "../../atoms/AppIconButton/AppIconButton";
import { DEFAULT_TABLE_TITLE, BUTTON_TEXT, ARIA_LABELS } from "../../../utils/constants";

export interface TableToolbarProps {
  title?: string;
  search: string;
  onSearchChange: (newValue: string) => void;
  onFilterClick?: () => void;
  onMoreClick?: () => void;
  sx?: SxProps<Theme>;
}

const toolbarContainerStyles: SxProps<Theme> = (theme) => ({
  position: "sticky",
  top: 0,
  zIndex: 20,
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: 3,
  py: 2,
  minHeight: 72,
  borderBottom: `1px solid ${theme.palette.divider}`,
});

const toolbarTitleStyles: SxProps<Theme> = (theme) => ({
  color: theme.palette.text.primary,
});

const toolbarActionsContainerStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
};

const toolbarIconStyles: SxProps<Theme> = {
  fontSize: 18,
};

const filterButtonStyles: SxProps<Theme> = (theme) => ({
  height: 36,
  borderRadius: `${(theme.shape.borderRadius as number) - 2}px`,
  borderColor: theme.palette.customBorder.dark,
  color: theme.palette.text.primary,
  "&:hover": {
    borderColor: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
  },
});

const moreIconButtonStyles: SxProps<Theme> = (theme) => ({
  width: 32,
  height: 32,
  minWidth: 32,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: `${theme.shape.borderRadius}px`,
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.background.default,
    borderColor: theme.palette.customBorder.dark,
  },
});

const TableToolbar = ({
  title = DEFAULT_TABLE_TITLE,
  search,
  onSearchChange,
  onFilterClick,
  onMoreClick,
  sx,
}: TableToolbarProps) => {
  const containerStyles = sx
    ? [toolbarContainerStyles, ...(Array.isArray(sx) ? sx : [sx])]
    : toolbarContainerStyles;

  return (
    <Box sx={containerStyles}>
      <Typography variant="subtitle1" sx={toolbarTitleStyles}>
        {title}
      </Typography>

      <Box sx={toolbarActionsContainerStyles}>
        <SearchInput
          value={search}
          onChange={onSearchChange}
        />

        <AppButton
          text={BUTTON_TEXT.FILTER}
          icon={<FilterListIcon sx={toolbarIconStyles} />}
          onClick={onFilterClick}
          sx={filterButtonStyles}
        />

        <AppIconButton
          icon={<MoreVertIcon sx={toolbarIconStyles} />}
          onClick={onMoreClick}
          ariaLabel={ARIA_LABELS.MORE_OPTIONS}
          sx={moreIconButtonStyles}
        />
      </Box>
    </Box>
  );
};

export default TableToolbar;
