import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import type { SxProps, Theme } from "@mui/material/styles";
import {
  DEFAULT_USER_NAME,
  DEFAULT_USER_COMPANY,
  DEFAULT_USER_AVATAR_SRC,
  DEFAULT_USER_AVATAR_LETTER,
} from "../../../utils/constants";

export interface UserProfileProps {
  name?: string;
  company?: string;
  avatarSrc?: string;
  avatarLetter?: string;
  onLogout?: () => void;
  sx?: SxProps<Theme>;
}

const userProfileContainerStyles: SxProps<Theme> = (theme) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  px: 2,
  py: 1.5,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.paper,
});

const userInfoWrapperStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1.25,
};

const userAvatarStyles: SxProps<Theme> = (theme) => ({
  width: 36,
  height: 36,
  fontSize: 14,
  fontWeight: 600,
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
});

const userNameTextStyles: SxProps<Theme> = (theme) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: "20px",
  fontFamily: theme.typography.fontFamily,
});

const userCompanyTextStyles: SxProps<Theme> = (theme) => ({
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.text.secondary,
  lineHeight: "18px",
  fontFamily: theme.typography.fontFamily,
});

const logoutIconStyles: SxProps<Theme> = (theme) => ({
  color: theme.palette.text.secondary,
  fontSize: 18,
  cursor: "pointer",
  transition: "0.2s",
  "&:hover": {
    color: theme.palette.text.primary,
  },
});

const UserProfile = ({
  name = DEFAULT_USER_NAME,
  company = DEFAULT_USER_COMPANY,
  avatarSrc = DEFAULT_USER_AVATAR_SRC,
  avatarLetter = DEFAULT_USER_AVATAR_LETTER,
  onLogout,
  sx,
}: UserProfileProps) => {
  const containerStyles = sx
    ? [userProfileContainerStyles, ...(Array.isArray(sx) ? sx : [sx])]
    : userProfileContainerStyles;

  return (
    <Box sx={containerStyles}>
      <Box sx={userInfoWrapperStyles}>
        <Avatar src={avatarSrc} sx={userAvatarStyles}>
          {avatarLetter}
        </Avatar>

        <Box>
          <Typography sx={userNameTextStyles}>
            {name}
          </Typography>

          <Typography sx={userCompanyTextStyles}>
            {company}
          </Typography>
        </Box>
      </Box>

      <LogoutOutlinedIcon
        onClick={onLogout}
        sx={logoutIconStyles}
      />
    </Box>
  );
};

export default UserProfile;
