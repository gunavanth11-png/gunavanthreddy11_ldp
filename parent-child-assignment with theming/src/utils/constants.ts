import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

export const APP_NAME = "RECRUIT";

export const MENU_ITEMS = [
  {
    name: "Home",
    icon: HomeOutlinedIcon,
    active: false,
  },
  {
    name: "Candidates",
    icon: PeopleOutlinedIcon,
    active: true,
  },
  {
    name: "Adverse Actions",
    icon: GavelOutlinedIcon,
    active: false,
  },
  {
    name: "Logs",
    icon: DescriptionOutlinedIcon,
    active: false,
  },
  {
    name: "Analytics",
    icon: AnalyticsOutlinedIcon,
    active: false,
  },
  {
    name: "Account",
    icon: ManageAccountsOutlinedIcon,
    active: false,
  },
  {
    name: "Screenings",
    icon: AssignmentOutlinedIcon,
    active: false,
  },
];

export const USER_PROFILE = {
  name: "James Rodriguez",
  email: "James.co",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
};