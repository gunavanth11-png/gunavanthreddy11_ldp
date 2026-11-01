import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Column } from "../../../types/candidate";
import { DEFAULT_COLUMNS } from "../../../utils/constants";

export type { Column };

export interface TableHeaderRowProps {
  columns?: Column[];
  sx?: SxProps<Theme>;
}

const headerCellBaseStyles: SxProps<Theme> = (theme) => ({
  position: "sticky",
  top: 0,
  zIndex: 10,
  backgroundColor: theme.palette.customBorder.light,
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontFamily: theme.typography.fontFamily,
  fontWeight: 500,
  fontSize: theme.typography.body2.fontSize,
  lineHeight: "20px",
  color: theme.palette.text.secondary,
  letterSpacing: "0.3px",
  height: 56,
  px: 3,
});

const TableHeaderRow = ({
  columns = DEFAULT_COLUMNS,
  sx,
}: TableHeaderRowProps) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((col) => {
          const widthStyles: SxProps<Theme> = col.width ? { width: col.width } : {};
          const cellStyles = [
            headerCellBaseStyles,
            widthStyles,
            ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
          ];

          return (
            <TableCell key={col.id} sx={cellStyles}>
              {col.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaderRow;
