import { Box, List, Typography } from "@mui/material";
import { styles } from "../../../utils/styles";
import {
  APP_NAME,
  MENU_ITEMS,
  USER_PROFILE,
} from "../../../utils/constants";
import IconWithTypography from "../../molecules/IconWithTypography/IconWithTypography";
import UserProfileCard from "../../molecules/UserProfileCard/UserProfileCard";

const SideNavigation = () => {
  return (
    <Box sx={styles.sideNavigation}>
      <Typography sx={styles.logo}>{APP_NAME}</Typography>

      <List sx={styles.navigationList}>
        {MENU_ITEMS.map((item) => {
          const NavigationIcon = item.icon;

          return (
            <IconWithTypography
              key={item.name}
              icon={<NavigationIcon />}
              text={item.name}
              active={item.active}
            />
          );
        })}
      </List>

      <Box sx={styles.profileContainer}>
        <UserProfileCard
          name={USER_PROFILE.name}
          subText={USER_PROFILE.email}
        />
      </Box>
    </Box>
  );
};

export default SideNavigation;