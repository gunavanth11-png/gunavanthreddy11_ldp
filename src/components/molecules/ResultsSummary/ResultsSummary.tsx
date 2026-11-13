import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import type { SxProps, Theme } from "@mui/material/styles";
import {
  DEFAULT_PER_PAGE_OPTIONS,
  PER_PAGE_SUFFIX,
  RESULTS_SUFFIX,
} from "../../../utils/constants";

export interface ResultsSummaryProps {
  total: number;
  perPage: number;
  onPerPageChange: (newValue: number) => void;
  options?: number[];
  sx?: SxProps<Theme>;
}

const resultsSummaryContainerStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

const resultsSummaryTextStyles: SxProps<Theme> = (theme) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 400,
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
});

const perPageSelectStyles: SxProps<Theme> = (theme) => ({
  width: 120,
  height: 32,
  fontSize: theme.typography.body2.fontSize,
  borderRadius: `${theme.shape.borderRadius}px`,
  backgroundColor: theme.palette.background.paper,
  "& .MuiSelect-select": {
    py: "4px",
    px: "12px",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 18,
    color: theme.palette.text.secondary,
  },
  "& fieldset": {
    borderColor: theme.palette.divider,
  },
  "&:hover fieldset": {
    borderColor: theme.palette.customBorder.dark,
  },
});

const ResultsSummary = ({
  total,
  perPage,
  onPerPageChange,
  options = DEFAULT_PER_PAGE_OPTIONS,
  sx,
}: ResultsSummaryProps) => {
  const shownCount = Math.min(total, perPage);
  const containerStyles = sx
    ? [resultsSummaryContainerStyles, ...(Array.isArray(sx) ? sx : [sx])]
    : resultsSummaryContainerStyles;

  return (
    <Box sx={containerStyles}>
      <Typography sx={resultsSummaryTextStyles}>
        {shownCount} out of {total} {RESULTS_SUFFIX}
      </Typography>

      <Select
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
        size="small"
        sx={perPageSelectStyles}
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt} {PER_PAGE_SUFFIX}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default ResultsSummary;
