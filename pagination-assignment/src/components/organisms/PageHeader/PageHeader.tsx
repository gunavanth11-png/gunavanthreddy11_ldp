import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import type { SxProps, Theme } from "@mui/material/styles";
import AppButton from "../../atoms/AppButton/AppButton";

export interface PageHeaderProps {
  title?: string;
  onExport?: () => void;
  onManualOrder?: () => void;
  sx?: SxProps<Theme>;
}

export default function PageHeader({
  title = "Candidates",
  onExport,
  onManualOrder,
  sx,
}: PageHeaderProps) {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 3,
        backgroundColor: theme.palette.background.default,
        ...sx,
      })}
    >
      <Typography
        sx={(theme) => ({
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.h5.fontWeight,
          fontSize: theme.typography.h5.fontSize,
          lineHeight: theme.typography.h5.lineHeight,
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
        <AppButton
          text="Export"
          icon={<DownloadIcon sx={{ fontSize: 18 }} />}
          onClick={onExport}
        />

        <AppButton
          text="Manual Order"
          icon={<AddIcon sx={{ fontSize: 18 }} />}
          filled
          onClick={onManualOrder}
        />
      </Box>
    </Box>
  );
}
