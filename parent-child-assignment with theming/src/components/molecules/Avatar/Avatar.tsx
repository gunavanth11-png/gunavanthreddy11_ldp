import { Avatar as MuiAvatar } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type AvatarProps = {
  src?: string;
  alt: string;
  sx?: SxProps<Theme>;
};

const Avatar = ({ src, alt, sx }: AvatarProps) => {
  return (
    <MuiAvatar
      src={src}
      alt={alt}
      sx={sx}
    />
  );
};

export default Avatar;
