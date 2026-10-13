import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import type { SxProps, Theme } from "@mui/material/styles";
import NavItem from "../../molecules/NavItem/NavItem";
import UserProfile from "../../molecules/UserProfile/UserProfile";
import { DEFAULT_ACTIVE_NAV, APP_LOGO_TEXT, NAV_LABELS } from "../../../utils/constants";

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
}

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { label: NAV_LABELS.HOME, icon: <GridViewOutlinedIcon fontSize="small" /> },
  { label: NAV_LABELS.CANDIDATES, icon: <PeopleOutlineOutlinedIcon fontSize="small" /> },
  { label: NAV_LABELS.ADVERSE_ACTIONS, icon: <GavelOutlinedIcon fontSize="small" /> },
  { label: NAV_LABELS.LOGS, icon: <DescriptionOutlinedIcon fontSize="small" /> },
  { label: NAV_LABELS.ANALYTICS, icon: <BarChartOutlinedIcon fontSize="small" /> },
  { label: NAV_LABELS.ACCOUNT, icon: <ManageAccountsOutlinedIcon fontSize="small" /> },
  { label: NAV_LABELS.SCREENINGS, icon: <CreditCardOutlinedIcon fontSize="small" /> },
];

export interface SidebarProps {
  activeLabel?: string;
  onSelectNav?: (label: string) => void;
  menuItems?: MenuItem[];
  sx?: SxProps<Theme>;
}

const sidebarContainerStyles: SxProps<Theme> = (theme) => ({
  width: 240,
  height: "100vh",
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
});

const logoBoxStyles: SxProps<Theme> = {
  px: 3,
  pt: 3,
  pb: 2.5,
};

const logoTextStyles: SxProps<Theme> = (theme) => ({
  color: theme.palette.brand.logo,
});

const menuContainerStyles: SxProps<Theme> = {
  px: 1.5,
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
};

const spacerStyles: SxProps<Theme> = {
  flexGrow: 1,
};

const Sidebar = ({
  activeLabel = DEFAULT_ACTIVE_NAV,
  onSelectNav,
  menuItems = DEFAULT_MENU_ITEMS,
  sx,
}: SidebarProps) => {
  const containerStyles = sx
    ? [sidebarContainerStyles, ...(Array.isArray(sx) ? sx : [sx])]
    : sidebarContainerStyles;

  return (
    <Box sx={containerStyles}>
      <Box sx={logoBoxStyles}>
        <Typography variant="h6" sx={logoTextStyles}>
          {APP_LOGO_TEXT}
        </Typography>
      </Box>

      <Box sx={menuContainerStyles}>
        {menuItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={item.label === activeLabel}
            onClick={() => onSelectNav && onSelectNav(item.label)}
          />
        ))}
      </Box>

      <Box sx={spacerStyles} />

      <UserProfile />
    </Box>
  );
};

export default Sidebar;
