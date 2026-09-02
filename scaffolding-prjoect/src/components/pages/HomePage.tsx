import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardTemplate } from '../templates/DashboardTemplate';
import { Sidebar } from '../organisms/Sidebar';
import { Header } from '../organisms/Header';
import { TEXT_CONSTANTS } from '../../constants';

export interface HomePageProps {
  onNavigate?: (path: string) => void;
}

const HomeCardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  padding: theme.spacing(5),
  border: `1px solid ${theme.palette.border.default}`,
  textAlign: 'center',
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

const CardDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <DashboardTemplate
      sidebar={
        <Sidebar
          activePath={TEXT_CONSTANTS.SIDEBAR.PATHS.HOME}
          onNavigate={onNavigate}
        />
      }
      header={
        <Header
          title={TEXT_CONSTANTS.HEADER.HOME_TITLE}
          subtitle={TEXT_CONSTANTS.HEADER.HOME_SUBTITLE}
        />
      }
    >
      <HomeCardContainer>
        <CardTitle variant="h2">
          {TEXT_CONSTANTS.HOME_PAGE.CARD_TITLE}
        </CardTitle>
        <CardDescription variant="body1">
          {TEXT_CONSTANTS.HOME_PAGE.CARD_DESCRIPTION}
        </CardDescription>
      </HomeCardContainer>
    </DashboardTemplate>
  );
};
