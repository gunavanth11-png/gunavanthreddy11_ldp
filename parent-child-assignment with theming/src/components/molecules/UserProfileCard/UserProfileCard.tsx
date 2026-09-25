import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CustomTypography from "../../atoms/Typography/Typography";
import Avatar from "../Avatar/Avatar";
import { styles } from "../../../utils/styles";

type UserProfileCardProps = {
  name: string;
  subText?: string;
  src?: string;
  sx?: SxProps<Theme>;
};

const UserProfileCard = ({
  name,
  subText,
  src,
  sx,
}: UserProfileCardProps) => {
  return (
    <Box
      sx={[
        styles.userProfileCard,
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box sx={styles.userProfileCardLeft}>
        <Avatar
          src={src}
          alt={name}
          sx={styles.userProfileAvatar}
        />

        <Box sx={styles.userProfileContent}>
          <CustomTypography
            text={name}
            sx={styles.userProfileName}
            variant="subtitle1"
          />

          {subText && (
            <CustomTypography
              text={subText}
              sx={styles.userProfileSubtext}
              variant="body2"
            />
          )}
        </Box>
      </Box>

      <Box sx={styles.logoutButton}>
        <LogoutOutlinedIcon />
      </Box>
    </Box>
  );
};

export default UserProfileCard;
