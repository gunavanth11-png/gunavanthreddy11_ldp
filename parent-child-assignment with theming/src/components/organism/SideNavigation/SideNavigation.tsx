import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleIcon from "@mui/icons-material/People";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";

const menuItems = [
  {
    name: "Home",
    icon: <HomeOutlinedIcon />,
  },
  {
    name: "Candidates",
    icon: <PeopleIcon />,
  },
  {
    name: "Adverse Actions",
    icon: <GavelOutlinedIcon />,
  },
  {
    name: "Logs",
    icon: <HistoryOutlinedIcon />,
  },
  {
    name: "Analytics",
    icon: <AnalyticsOutlinedIcon />,
  },
];

const SideNavigation = () => {
  return (
    <Box
      sx={{
        width: "240px",
        height: "720px",
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        border: "1px solid #ECECEC",
        boxShadow: "0 4px 28px rgba(45,45,47,0.10)",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#2563EB",
          mb: 4,
        }}
      >
        Logo
      </Typography>

      {/* Menu */}
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {menuItems.map((item, index) => (
          <ListItemButton
            key={item.name}
            selected={index === 1}
            sx={{
              height: "48px",
              borderRadius: "6px",

              "&.Mui-selected": {
                backgroundColor: "#E8F0FF",

                "& .MuiListItemIcon-root": {
                  color: "#2563EB",
                },

                "& .MuiTypography-root": {
                  color: "#2563EB",
                  fontWeight: 600,
                },
              },

              "&:hover": {
                backgroundColor: "#F5F7FF",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "36px",
                color: "#1F2937",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.name}
              primaryTypographyProps={{
                fontSize: "14px",
                color: "#1F2937",
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Profile bottom */}
      <Box
        sx={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
          }}
        >
          G
        </Avatar>

        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Gunavanth
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              color: "#6B7280",
            }}
          >
            gunavanth@email.com
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SideNavigation;