import React, { useState } from 'react';
import { Box, Avatar as MuiAvatar, Popover, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { TEXT_CONSTANTS } from '../../../constants';
import {
  BORDER_RADIUS,
  ICON_SIZE,
  COMPONENT_SIZE,
  TRANSITION,
  SHADOW,
  OVERLAY,
  LAYOUT,
  FONT_WEIGHT,
} from '../../../utils/styleConstants';

export interface UserAvatarProps {
  src?: string;
  alt?: string;
  name?: string;
}

const AvatarTriggerBox = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  cursor: 'pointer',
  padding: theme.spacing(0.5, 1),
  borderRadius: BORDER_RADIUS.PILL,
  transition: TRANSITION.BG_ONLY,
  '&:hover': {
    backgroundColor: OVERLAY.HOVER_LIGHT,
  },
}));

const StyledAvatar = styled(MuiAvatar)(({ theme }) => ({
  width: COMPONENT_SIZE.AVATAR,
  height: COMPONENT_SIZE.AVATAR,
  border: `1px solid ${theme.palette.border.light}`,
}));

const StyledArrowIcon = styled(KeyboardArrowDownIcon, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  color: theme.palette.text.secondary,
  fontSize: ICON_SIZE.SM,
  transform: open ? 'rotate(180deg)' : 'none',
  transition: TRANSITION.TRANSFORM,
}));

const UserInfoHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
}));

const UserTextContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const UserNameText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: FONT_WEIGHT.SEMI_BOLD,
  lineHeight: 1.2,
}));

const EditProfileText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontWeight: FONT_WEIGHT.MEDIUM,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.border.default,
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
}));

const MenuItem = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: theme.spacing(1, 0),
  cursor: 'pointer',
  fontSize: theme.typography.body1.fontSize,
  fontWeight: FONT_WEIGHT.REGULAR,
  transition: TRANSITION.COLOR_ONLY,
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

const MenuItemWithIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1, 0),
  cursor: 'pointer',
  fontSize: theme.typography.body1.fontSize,
  fontWeight: FONT_WEIGHT.REGULAR,
  color: theme.palette.text.secondary,
  transition: TRANSITION.COLOR_ONLY,
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

const LogoutMenuItem = styled(MenuItemWithIcon)(({ theme }) => ({
  color: theme.palette.status.warningText,
  '&:hover': {
    color: theme.palette.status.warningHoverText,
  },
}));

const MenuIcon = styled(TuneOutlinedIcon)(({ theme }) => ({
  fontSize: ICON_SIZE.SM,
  color: theme.palette.text.secondary,
}));

const LogoutIcon = styled(LogoutOutlinedIcon)({
  fontSize: ICON_SIZE.SM,
  color: 'inherit',
});

const popoverPaperSx = (theme: any) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.border.default}`,
  borderRadius: BORDER_RADIUS.LG,
  width: LAYOUT.POPOVER_WIDTH,
  padding: theme.spacing(2),
  marginTop: theme.spacing(1),
  boxShadow: SHADOW.POPOVER,
  backgroundImage: 'none',
});

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src = TEXT_CONSTANTS.AVATAR.DEFAULT_SRC,
  alt = TEXT_CONSTANTS.AVATAR.DEFAULT_ALT,
  name = TEXT_CONSTANTS.AVATAR.DEFAULT_NAME,
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
      <AvatarTriggerBox onClick={handleClick}>
        <StyledAvatar src={src} alt={alt} />
        <StyledArrowIcon open={open} />
      </AvatarTriggerBox>

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
          sx: popoverPaperSx,
        }}
      >
        <UserInfoHeader>
          <StyledAvatar src={src} alt={alt} />
          <UserTextContainer>
            <UserNameText variant="body1">{name}</UserNameText>
            <EditProfileText variant="caption">
              {TEXT_CONSTANTS.AVATAR.EDIT_PROFILE}
            </EditProfileText>
          </UserTextContainer>
        </UserInfoHeader>

        <StyledDivider />

        <MenuItem onClick={handleClose}>{TEXT_CONSTANTS.AVATAR.MANAGE_SUBSCRIPTIONS}</MenuItem>
        <MenuItem onClick={handleClose}>{TEXT_CONSTANTS.AVATAR.HELP}</MenuItem>

        <StyledDivider />

        <MenuItemWithIcon onClick={handleClose}>
          <MenuIcon />
          {TEXT_CONSTANTS.AVATAR.SETTINGS}
        </MenuItemWithIcon>

        <LogoutMenuItem onClick={handleClose}>
          <LogoutIcon />
          {TEXT_CONSTANTS.AVATAR.LOG_OUT}
        </LogoutMenuItem>
      </Popover>
    </>
  );
};
