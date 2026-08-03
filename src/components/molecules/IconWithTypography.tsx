import { Box } from "@mui/material";
import Icon from "../atoms/Icon";
import CustomTypography from "../atoms/Typography";

type Props = {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
};

const IconWithTypography = ({
  icon,
  text,
  active = false,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: "12px", 
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20px",
          height: "20px",
          color: active ? "#3154F4" : "#6B7280",

          "& svg": {
            fontSize: "20px",
          },
        }}
      >
        <Icon icon={icon} />
      </Box>

      <Box
        sx={{
          color: active ? "#3154F4" : "#111827",
          fontSize: "16px",
          fontWeight: active ? 600 : 400,
          lineHeight: "24px",
        }}
      >
        <CustomTypography text={text} />
      </Box>
    </Box>
  );
};

export default IconWithTypography;