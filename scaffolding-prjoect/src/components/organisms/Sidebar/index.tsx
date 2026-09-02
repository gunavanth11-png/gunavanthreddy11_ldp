import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import { NavItem } from '../../molecules/NavItem';
import { SeederLogo } from '../../atoms/SeederLogo';
import { TEXT_CONSTANTS } from '../../../constants';

export interface SidebarProps {
  activePath?: string;
  onNavigate?: (path: string) => void;
}

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 250,
  height: '100vh',
  backgroundColor: theme.palette.customBackground.sidebar,
  borderRight: `1px solid ${theme.palette.border.subtle}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(3, 2),
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1200,
}));

const SidebarTopSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

const LogoWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}));

const NavGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const StyledHomeIcon = styled(HomeOutlinedIcon)({
  fontSize: 20,
});

const StyledGridIcon = styled(GridViewOutlinedIcon)({
  fontSize: 20,
});

const BottomActionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5, 2),
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  borderRadius: '12px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}));

const StyledBoltIcon = styled(ElectricBoltOutlinedIcon)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.text.secondary,
}));

const BottomActionText = styled(Typography)({
  fontWeight: 400,
});

export const Sidebar: React.FC<SidebarProps> = ({
  activePath = TEXT_CONSTANTS.SIDEBAR.PATHS.CASH_ACCELERATION,
  onNavigate,
}) => {
  return (
    <SidebarContainer>
      <SidebarTopSection>
        <LogoWrapper>
          <SeederLogo iconSize={32} fontSize="1.5rem" />
        </LogoWrapper>

        <NavGroup>
          <NavItem
            icon={<StyledHomeIcon />}
            label={TEXT_CONSTANTS.SIDEBAR.NAV_HOME}
            active={activePath === TEXT_CONSTANTS.SIDEBAR.PATHS.HOME}
            onClick={() => onNavigate?.(TEXT_CONSTANTS.SIDEBAR.PATHS.HOME)}
          />
          <NavItem
            icon={<StyledGridIcon />}
            label={TEXT_CONSTANTS.SIDEBAR.NAV_CASH_ACCELERATION}
            active={activePath === TEXT_CONSTANTS.SIDEBAR.PATHS.CASH_ACCELERATION}
            onClick={() => onNavigate?.(TEXT_CONSTANTS.SIDEBAR.PATHS.CASH_ACCELERATION)}
          />
        </NavGroup>
      </SidebarTopSection>

      <BottomActionBox>
        <StyledBoltIcon />
        <BottomActionText variant="body2">
          {TEXT_CONSTANTS.SIDEBAR.WATCH_HOW_TO}
        </BottomActionText>
      </BottomActionBox>
    </SidebarContainer>
  );
};
