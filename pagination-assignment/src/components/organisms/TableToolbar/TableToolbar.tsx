import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { SxProps, Theme } from "@mui/material/styles";
import SearchInput from "../../molecules/SearchInput/SearchInput";
import AppButton from "../../atoms/AppButton/AppButton";
import AppIconButton from "../../atoms/AppIconButton/AppIconButton";

export interface TableToolbarProps {
  title?: string;
  search: string;
  onSearchChange: (newValue: string) => void;
  onFilterClick?: () => void;
  onMoreClick?: () => void;
  sx?: SxProps<Theme>;
}

const TableToolbar = ({
  title = "Candidate Information",
  search,
  onSearchChange,
  onFilterClick,
  onMoreClick,
  sx,
}: TableToolbarProps) => {
  return (
    <Box
      sx={[
        (theme) => ({
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
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        variant="subtitle1"
        sx={(theme) => ({
          color: theme.palette.text.primary,
        })}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <SearchInput
          value={search}
          onChange={onSearchChange}
        />

        <AppButton
          text="Filter"
          icon={<FilterListIcon sx={{ fontSize: 18 }} />}
          onClick={onFilterClick}
        />

        <AppIconButton
          icon={<MoreVertIcon sx={{ fontSize: 18 }} />}
          onClick={onMoreClick}
          ariaLabel="More options"
        />
      </Box>
    </Box>
  );
};

export default TableToolbar;
