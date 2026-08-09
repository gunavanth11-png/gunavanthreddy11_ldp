import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import type { SxProps, Theme } from "@mui/material/styles";

export interface ResultsSummaryProps {
  total: number;
  perPage: number;
  onPerPageChange: (newValue: number) => void;
  options?: number[];
  sx?: SxProps<Theme>;
}

export default function ResultsSummary({
  total,
  perPage,
  onPerPageChange,
  options = [10, 20, 50],
  sx,
}: ResultsSummaryProps) {
  const shownCount = Math.min(total, perPage);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        ...sx,
      }}
    >
      <Typography
        sx={(theme) => ({
          fontSize: theme.typography.body2.fontSize,
          fontWeight: 400,
          color: theme.palette.text.secondary,
          fontFamily: theme.typography.fontFamily,
        })}
      >
        {shownCount} out of {total} results
      </Typography>

      <Select
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
        size="small"
        sx={(theme) => ({
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
        })}
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt} per page
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
