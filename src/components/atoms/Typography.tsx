import { Typography } from "@mui/material";

type Props = {
  text: string;
};

const CustomTypography = ({ text }: Props) => {
  return (
    <Typography
      sx={{
        fontSize: "16px",
        fontWeight: 500,
        color: "inherit",
      }}
    >
      {text}
    </Typography>
  );
};

export default CustomTypography;