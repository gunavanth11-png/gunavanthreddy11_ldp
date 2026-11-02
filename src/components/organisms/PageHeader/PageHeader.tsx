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

const PageHeader = ({
  title = "Candidates",
  onExport,
  onManualOrder,
  sx,
}: PageHeaderProps) => {
  return (
    <Box
      sx={[
        (theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 3,
          backgroundColor: theme.palette.background.default,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        variant="h5"
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
};

export default PageHeader;
