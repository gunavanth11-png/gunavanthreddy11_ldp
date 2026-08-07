import { useState } from "react";
import { Box, Divider } from "@mui/material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { figmaStyles } from "../../../figmaStyles";
import CustomTypography from "../../atoms/Typography/Typography";
import IconWithTypography from "../../molecules/IconWithTypography/IconWithTypography";
import CustomAvatar from "../../molecules/Avatar/Avatar";

export type MenuItemType = {
  id: string;
  text: string;
  icon: React.ReactNode;
};

type UserProfileType = {
  name: string;
  subText: string;
  avatarSrc?: string;
};

type SideNavigationProps = {
  title?: string;
  items?: MenuItemType[];
  activeId?: string;
  user?: UserProfileType;
  onItemSelect?: (id: string) => void;
  onLogout?: () => void;
};

const defaultMenuItems: MenuItemType[] = [
  { id: "home", text: "Home", icon: <GridViewOutlinedIcon /> },
  { id: "candidates", text: "Candidates", icon: <PersonOutlineOutlinedIcon /> },
  { id: "adverse-actions", text: "Adverse Actions", icon: <GavelOutlinedIcon /> },
  { id: "logs", text: "Logs", icon: <DescriptionOutlinedIcon /> },
  { id: "analytics", text: "Analytics", icon: <AnalyticsOutlinedIcon /> },
  { id: "account", text: "Account", icon: <ManageAccountsOutlinedIcon /> },
  { id: "screenings", text: "Screenings", icon: <CreditCardOutlinedIcon /> },
];

const defaultUser: UserProfileType = {
  name: "James Rodriguez",
  subText: "James.co",
  avatarSrc: "https://i.pravatar.cc/150?img=12",
};

const SideNavigation = ({
  title = "RECRUIT",
  items = defaultMenuItems,
  activeId: externalActiveId,
  user = defaultUser,
  onItemSelect,
  onLogout,
}: SideNavigationProps) => {
  const [internalActiveId, setInternalActiveId] = useState<string>("candidates");

  const activeId = externalActiveId ?? internalActiveId;

  const handleItemClick = (id: string) => {
    setInternalActiveId(id);
    if (onItemSelect) {
      onItemSelect(id);
    }
  };

  return (
    <Box sx={figmaStyles.sidebar}>
      <Box>
        <CustomTypography
          text={title}
          sx={figmaStyles.header}
        />

        <Box sx={figmaStyles.navigationContainer}>
          {items.map((item) => (
            <IconWithTypography
              key={item.id}
              icon={item.icon}
              text={item.text}
              active={item.id === activeId}
              onClick={() => handleItemClick(item.id)}
            />
          ))}
        </Box>
      </Box>

      <Box>
        <Divider sx={figmaStyles.footerDivider} />
        <Box sx={figmaStyles.footerContainer}>
          <CustomAvatar
            name={user.name}
            subText={user.subText}
            src={user.avatarSrc}
          />
          <LogoutOutlinedIcon
            onClick={onLogout}
            sx={figmaStyles.logoutIcon}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SideNavigation;
