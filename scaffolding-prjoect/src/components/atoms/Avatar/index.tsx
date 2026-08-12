import React, { useState } from 'react';
import { Box, Avatar as MuiAvatar, Popover, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export interface UserAvatarProps {
  src?: string;
  alt?: string;
  name?: string;
}

const MenuItem = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: '8px 0',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 400,
  transition: 'color 0.2s ease',
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

const MenuItemWithIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 0',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 400,
  color: theme.palette.text.secondary,
  transition: 'color 0.2s ease',
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src = 'https://i.pravatar.cc/150?img=47',
  alt = 'Kane Cooper',
  name = 'Kane Cooper',
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '20px',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        <MuiAvatar
          src={src}
          alt={alt}
          sx={(theme) => ({
            width: 36,
            height: 36,
            border: `1px solid ${theme.palette.border.light}`,
          })}
        />
        <KeyboardArrowDownIcon
          sx={(theme) => ({
            color: theme.palette.text.secondary,
            fontSize: 18,
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
          })}
        />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: (theme) => ({
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.border.default}`,
            borderRadius: '16px',
            width: '220px',
            padding: '16px',
            marginTop: '8px',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
            backgroundImage: 'none',
          }),
        }}
      >
        {/* User Info Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, marginBottom: 1 }}>
          <MuiAvatar
            src={src}
            alt={alt}
            sx={(theme) => ({
              width: 36,
              height: 36,
              border: `1px solid ${theme.palette.border.light}`,
            })}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="body1"
              sx={(theme) => ({
                color: theme.palette.text.primary,
                fontWeight: 600,
                lineHeight: 1.2,
              })}
            >
              {name}
            </Typography>
            <Typography
              variant="caption"
              sx={(theme) => ({
                color: theme.palette.primary.light,
                fontWeight: 500,
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              })}
            >
              Edit Profile
            </Typography>
          </Box>
        </Box>

        <Divider sx={(theme) => ({ borderColor: theme.palette.border.default, my: 1.5 })} />

        {/* Menu Items */}
        <MenuItem onClick={handleClose}>Manage Subscriptions</MenuItem>
        <MenuItem onClick={handleClose}>Help</MenuItem>

        <Divider sx={(theme) => ({ borderColor: theme.palette.border.default, my: 1.5 })} />

        <MenuItemWithIcon onClick={handleClose}>
          <TuneOutlinedIcon sx={(theme) => ({ fontSize: 18, color: theme.palette.text.secondary })} />
          Settings
        </MenuItemWithIcon>

        <MenuItemWithIcon
          onClick={handleClose}
          sx={{
            color: '#FF7A5C',
            '&:hover': {
              color: '#FF8B72',
            },
          }}
        >
          <LogoutOutlinedIcon sx={{ fontSize: 18, color: 'inherit' }} />
          Log Out
        </MenuItemWithIcon>
      </Popover>
    </>
  );
};

