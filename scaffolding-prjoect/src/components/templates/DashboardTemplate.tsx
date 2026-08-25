import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface DashboardTemplateProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
}

const TemplateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const MainContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  marginLeft: '250px',
  minWidth: 0,
  height: '100vh',
  overflow: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
}));

const StickyHeaderBox = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4.5, 6, 2),
}));

const PageBodyBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 6, 4.5),
}));

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  sidebar,
  header,
  children,
}) => {
  return (
    <TemplateContainer>
      {sidebar}
      <MainContentArea component="main">
        <StickyHeaderBox>{header}</StickyHeaderBox>
        <PageBodyBox>{children}</PageBodyBox>
      </MainContentArea>
    </TemplateContainer>
  );
};
