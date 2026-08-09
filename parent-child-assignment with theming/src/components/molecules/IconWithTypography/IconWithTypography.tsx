import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Icon from "../../atoms/Icon/Icon";
import CustomTypography from "../../atoms/Typography/Typography";
import { figmaStyles } from "../../../figmaStyles";

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
    ? figmaStyles.activeNavigationItem
    : figmaStyles.inactiveNavigationItem;

  return (
    <Box
      onClick={onClick}
      sx={{
        ...figmaStyles.navigationItem,
        ...itemStyle,
        "&:hover": {
          backgroundColor: active ? "#EFF2FF" : "#F8FAFC",
        },
        ...sx,
      }}
    >
      <Box sx={figmaStyles.iconBox}>
        <Icon icon={icon} color={itemStyle.color} />
      </Box>
      <CustomTypography
        text={text}
        color={itemStyle.color}
        fontWeight={active ? 600 : 400}
        fontSize="16px"
        lineHeight="24px"
      />
    </Box>
  );
};

export default IconWithTypography;
