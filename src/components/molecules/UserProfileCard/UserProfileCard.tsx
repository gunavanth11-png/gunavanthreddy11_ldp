import { Avatar as MuiAvatar, Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import CustomTypography from "../../atoms/Typography/Typography";
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
    <Box sx={{ ...styles.userProfileCard, ...sx }}>
      <MuiAvatar
        src={src}
        alt={name}
        sx={styles.userProfileAvatar}
      />

      <Box sx={styles.userProfileContent}>
        <CustomTypography
          text={name}
          sx={styles.userProfileName}
        />

        {subText && (
          <CustomTypography
            text={subText}
            sx={styles.userProfileSubtext}
          />
        )}
      </Box>
    </Box>
  );
};

export default UserProfileCard;
