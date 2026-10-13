import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import type { SxProps, Theme } from "@mui/material/styles";
import AppButton from "../../atoms/AppButton/AppButton";
import { DEFAULT_PAGE_TITLE, BUTTON_TEXT } from "../../../utils/constants";

export interface PageHeaderProps {
  title?: string;
  onExport?: () => void;
  onManualOrder?: () => void;
  sx?: SxProps<Theme>;
}

const headerContainerStyles: SxProps<Theme> = (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: 3,
  py: 3,
  backgroundColor: theme.palette.background.default,
});

const headerTitleStyles: SxProps<Theme> = (theme) => ({
  color: theme.palette.text.primary,
});

const headerActionsContainerStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
};

const headerIconStyles: SxProps<Theme> = {
  fontSize: 18,
};

const exportButtonStyles: SxProps<Theme> = (theme) => ({
  height: 36,
  borderRadius: `${(theme.shape.borderRadius as number) - 2}px`,
  borderColor: theme.palette.customBorder.dark,
  color: theme.palette.text.primary,
  "&:hover": {
    borderColor: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
  },
});

const manualOrderButtonStyles: SxProps<Theme> = (theme) => ({
  height: 36,
  borderRadius: `${(theme.shape.borderRadius as number) - 2}px`,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
});

const PageHeader = ({
  title = DEFAULT_PAGE_TITLE,
  onExport,
  onManualOrder,
  sx,
}: PageHeaderProps) => {
  const containerStyles = sx
    ? [headerContainerStyles, ...(Array.isArray(sx) ? sx : [sx])]
    : headerContainerStyles;

  return (
    <Box sx={containerStyles}>
      <Typography variant="h5" sx={headerTitleStyles}>
        {title}
      </Typography>

      <Box sx={headerActionsContainerStyles}>
        <AppButton
          text={BUTTON_TEXT.EXPORT}
          icon={<DownloadIcon sx={headerIconStyles} />}
          onClick={onExport}
          sx={exportButtonStyles}
        />

        <AppButton
          text={BUTTON_TEXT.MANUAL_ORDER}
          icon={<AddIcon sx={headerIconStyles} />}
          filled
          onClick={onManualOrder}
          sx={manualOrderButtonStyles}
        />
      </Box>
    </Box>
  );
};

export default PageHeader;
