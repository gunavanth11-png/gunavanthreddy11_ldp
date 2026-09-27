import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import type { SxProps, Theme } from "@mui/material/styles";

export interface Column {
  id: string;
  label: string;
  width?: string;
}

const DEFAULT_COLUMNS: Column[] = [
  { id: "name", label: "NAME", width: "24%" },
  { id: "adjudication", label: "ADJUDICATION", width: "16%" },
  { id: "status", label: "STATUS", width: "14%" },
  { id: "location", label: "LOCATION", width: "28%" },
  { id: "date", label: "DATE", width: "18%" },
];

export interface TableHeaderRowProps {
  columns?: Column[];
  sx?: SxProps<Theme>;
}

const TableHeaderRow = ({ columns = DEFAULT_COLUMNS, sx }: TableHeaderRowProps) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell
            key={col.id}
            sx={[
              (theme) => ({
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
                width: col.width,
              }),
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
          >
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaderRow;
