import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleIcon from "@mui/icons-material/People";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";

export const MENU_ITEMS = [
  {
    name: "Home",
    icon: HomeOutlinedIcon,
    active: false,
  },
  {
    name: "Candidates",
    icon: PeopleIcon,
    active: true,
  },
  {
    name: "Adverse Actions",
    icon: GavelOutlinedIcon,
    active: false,
  },
  {
    name: "Logs",
    icon: HistoryOutlinedIcon,
    active: false,
  },
  {
    name: "Analytics",
    icon: AnalyticsOutlinedIcon,
    active: false,
  },
];