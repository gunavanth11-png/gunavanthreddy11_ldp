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

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
}

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { label: "Home", icon: <GridViewOutlinedIcon fontSize="small" /> },
  { label: "Candidates", icon: <PeopleOutlineOutlinedIcon fontSize="small" /> },
  { label: "Adverse Actions", icon: <GavelOutlinedIcon fontSize="small" /> },
  { label: "Logs", icon: <DescriptionOutlinedIcon fontSize="small" /> },
  { label: "Analytics", icon: <BarChartOutlinedIcon fontSize="small" /> },
  { label: "Account", icon: <ManageAccountsOutlinedIcon fontSize="small" /> },
  { label: "Screenings", icon: <CreditCardOutlinedIcon fontSize="small" /> },
];

export interface SidebarProps {
  activeLabel?: string;
  onSelectNav?: (label: string) => void;
  menuItems?: MenuItem[];
  sx?: SxProps<Theme>;
}

const Sidebar = ({
  activeLabel = "Candidates",
  onSelectNav,
  menuItems = DEFAULT_MENU_ITEMS,
  sx,
}: SidebarProps) => {
  return (
    <Box
      sx={[
        (theme) => ({
          width: 240,
          height: "100vh",
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ px: 3, pt: 3, pb: 2.5 }}>
        <Typography
          variant="h6"
          sx={(theme) => ({
            color: theme.palette.brand.logo,
          })}
        >
          RECRUIT
        </Typography>
      </Box>

      <Box
        sx={{
          px: 1.5,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
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

      <Box sx={{ flexGrow: 1 }} />

      <UserProfile />
    </Box>
  );
};

export default Sidebar;
