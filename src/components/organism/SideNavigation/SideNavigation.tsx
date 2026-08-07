import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

import { figmaStyles } from "../../../figmaStyles";

import IconWithTypography from "../../molecules/IconWithTypography/IconWithTypography";
import CustomAvatar from "../../molecules/Avatar/Avatar";

const menus = [
  {
    text: "Home",
    icon: <HomeOutlinedIcon />,
    active: false,
  },
  {
    text: "Candidates",
    icon: <PeopleOutlineOutlinedIcon />,
    active: true,
  },
  {
    text: "Adverse Actions",
    icon: <CreditCardOutlinedIcon />,
    active: false,
  },
  {
    text: "Logs",
    icon: <GridViewOutlinedIcon />,
    active: false,
  },
  {
    text: "Analytics",
    icon: <GridViewOutlinedIcon />,
    active: false,
  },
  {
    text: "Account",
    icon: <PeopleOutlineOutlinedIcon />,
    active: false,
  },
  {
    text: "Screenings",
    icon: <CreditCardOutlinedIcon />,
    active: false,
  },
];

const SideNavigation = () => {
  return (
    <Box
      sx={{
        width: "238px",
        height: "720px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #ECECEC",
        borderRadius: "8px",
        boxShadow: "0px 4px 28px rgba(45,45,47,0.10)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pt: "28px",
        pb: "20px",
        boxSizing: "border-box",
      }}
    >
      <Box>
        <Typography
          sx={{
            width: "78px",
            height: "20px",
            ml: "28px",
            mb: "20px",
            fontFamily: "Inter",
            fontSize: "20px",
            fontWeight: 700,
            lineHeight: "20px",
            color: "#3154F4",
          }}
        >
          RECRUIT
        </Typography>

        <Box
          sx={{
            width: "206px",
            ml: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "11px",
          }}
        >
          {menus.map((menu) => (
            <Box
              key={menu.text}
              sx={{
                width: "206px",
                height: "44px",
                px: "12px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                backgroundColor: menu.active
                  ? "#EFF2FF"
                  : "transparent",
              }}
            >
              <IconWithTypography
                icon={menu.icon}
                text={menu.text}
                active={menu.active}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box>
        <Divider
          sx={{
            borderColor: "#ECECEC",
            mb: "16px",
          }}
        />

        <Box
          sx={{
            px: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CustomAvatar name="James Rodriguez" />

          <LogoutOutlinedIcon
            sx={{
              color: "#6B7280",
              fontSize: 20,
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SideNavigation;