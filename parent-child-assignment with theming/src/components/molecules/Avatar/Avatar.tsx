import { Avatar as MuiAvatar, Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import CustomTypography from "../../atoms/Typography/Typography";
import { figmaStyles } from "../../../figmaStyles";

type AvatarProps = {
  name: string;
  subText?: string;
  src?: string;
  sx?: SxProps<Theme>;
};

const CustomAvatar = ({
  name,
  subText,
  src = "https://i.pravatar.cc/150?img=12",
  sx,
}: AvatarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        ...sx,
      }}
    >
      <MuiAvatar
        src={src}
        alt={name}
        sx={figmaStyles.userAvatar}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CustomTypography
          text={name}
          sx={figmaStyles.userName}
        />
        {subText && (
          <CustomTypography
            text={subText}
            sx={figmaStyles.userSubtext}
          />
        )}
      </Box>
    </Box>
  );
};

export default CustomAvatar;
