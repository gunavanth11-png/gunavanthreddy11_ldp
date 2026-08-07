import { Avatar, Box, Typography } from "@mui/material";

type Props = {
  name: string;
};

const CustomAvatar = ({ name }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Avatar
        src="https://i.pravatar.cc/150?img=12"
        sx={{
          width: 40,
          height: 40,
        }}
      />

      <Box>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "24px",
            color: "#111827",
          }}
        >
          {name}
        </Typography>

        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px",
            color: "#6B7280",
          }}
        >
          James.co
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomAvatar;