import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UserAvatar } from '../../atoms/Avatar';
import { TEXT_CONSTANTS } from '../../../constants';
import { FONT_WEIGHT } from '../../../utils/styleConstants';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  avatarSrc?: string;
}

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(4),
}));

const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

const StyledHeaderTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: FONT_WEIGHT.BOLD,
}));

const StyledHeaderSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: FONT_WEIGHT.REGULAR,
}));

export const Header: React.FC<HeaderProps> = ({
  title = TEXT_CONSTANTS.HEADER.DEFAULT_TITLE,
  subtitle = TEXT_CONSTANTS.HEADER.DEFAULT_SUBTITLE,
  avatarSrc,
}) => {
  return (
    <HeaderContainer>
      <TitleContainer>
        <StyledHeaderTitle variant="h1">{title}</StyledHeaderTitle>
        <StyledHeaderSubtitle variant="subtitle1">{subtitle}</StyledHeaderSubtitle>
      </TitleContainer>

      <UserAvatar src={avatarSrc} />
    </HeaderContainer>
  );
};
