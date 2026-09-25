import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import type { SxProps, Theme } from "@mui/material/styles";

export interface UserProfileProps {
  name?: string;
  company?: string;
  avatarSrc?: string;
  avatarLetter?: string;
  onLogout?: () => void;
  sx?: SxProps<Theme>;
}

const UserProfile = ({
  name = "James Rodriguez",
  company = "James.co",
  avatarSrc = "https://i.pravatar.cc/40",
  avatarLetter = "J",
  onLogout,
  sx,
}: UserProfileProps) => {
  return (
    <Box
      sx={[
        (theme) => ({
          borderTop: `1px solid ${theme.palette.divider}`,
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.palette.background.paper,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
        }}
      >
        <Avatar
          src={avatarSrc}
          sx={(theme) => ({
            width: 36,
            height: 36,
            fontSize: 14,
            fontWeight: 600,
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
          })}
        >
          {avatarLetter}
        </Avatar>

        <Box>
          <Typography
            sx={(theme) => ({
              fontSize: theme.typography.body2.fontSize,
              fontWeight: 600,
              color: theme.palette.text.primary,
              lineHeight: "20px",
              fontFamily: theme.typography.fontFamily,
            })}
          >
            {name}
          </Typography>

          <Typography
            sx={(theme) => ({
              fontSize: theme.typography.caption.fontSize,
              color: theme.palette.text.secondary,
              lineHeight: "18px",
              fontFamily: theme.typography.fontFamily,
            })}
          >
            {company}
          </Typography>
        </Box>
      </Box>

      <LogoutOutlinedIcon
        onClick={onLogout}
        sx={(theme) => ({
          color: theme.palette.text.secondary,
          fontSize: 18,
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": {
            color: theme.palette.text.primary,
          },
        })}
      />
    </Box>
  );
};

export default UserProfile;
