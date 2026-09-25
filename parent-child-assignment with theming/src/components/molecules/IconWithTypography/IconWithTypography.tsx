import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Icon from "../../atoms/Icon/Icon";
import CustomTypography from "../../atoms/Typography/Typography";
import { styles } from "../../../utils/styles";

type IconWithTypographyProps = {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
};

const IconWithTypography = ({
  icon,
  text,
  active = false,
  onClick,
  sx,
}: IconWithTypographyProps) => {
  const itemStyle = active
    ? styles.activeNavigationItem
    : styles.inactiveNavigationItem;

  return (
    <Box
      onClick={onClick}
      sx={[
        styles.iconWithTypography,
        itemStyle,
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box sx={styles.iconWithTypographyIconBox}>
        <Icon icon={icon} />
      </Box>

      <CustomTypography
        text={text}
        variant={active ? "subtitle1" : "body1"}
        sx={{ color: "inherit" }}
      />
    </Box>
  );
};

export default IconWithTypography;
