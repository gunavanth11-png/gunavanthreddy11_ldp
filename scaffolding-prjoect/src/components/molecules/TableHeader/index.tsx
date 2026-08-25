import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SyncIcon from '@mui/icons-material/Sync';
import { TabPill } from '../../atoms/Tab';
import { TabType } from '@/hooks/useContracts';
import { TEXT_CONSTANTS } from '../../../constants';

export interface TableHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onSync?: () => void;
  isSyncing?: boolean;
}

const TableHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(3),
}));

const HeaderTopRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const TitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

const StyledInfoIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.text.disabled,
  cursor: 'pointer',
}));

const SyncButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.primary.light,
  cursor: 'pointer',
  padding: theme.spacing(0.75, 1.5),
  borderRadius: '8px',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const AnimatedSyncIcon = styled(SyncIcon, {
  shouldForwardProp: (prop) => prop !== 'isSyncing',
})<{ isSyncing?: boolean }>(({ isSyncing }) => ({
  fontSize: 18,
  animation: isSyncing ? 'spin 1s linear infinite' : 'none',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

const SyncText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontWeight: 600,
}));

const TabsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

export const TableHeader: React.FC<TableHeaderProps> = ({
  activeTab,
  onTabChange,
  onSync,
  isSyncing = false,
}) => {
  return (
    <TableHeaderContainer>
      <HeaderTopRow>
        <TitleBox>
          <HeaderTitle variant="h3">
            {TEXT_CONSTANTS.CONTRACTS_TABLE.TITLE}
          </HeaderTitle>
          <Tooltip title={TEXT_CONSTANTS.CONTRACTS_TABLE.TITLE_TOOLTIP} arrow>
            <StyledInfoIcon />
          </Tooltip>
        </TitleBox>

        <SyncButton onClick={onSync}>
          <AnimatedSyncIcon isSyncing={isSyncing} />
          <SyncText variant="body2">
            {TEXT_CONSTANTS.CONTRACTS_TABLE.SYNC_TEXT}
          </SyncText>
        </SyncButton>
      </HeaderTopRow>

      <TabsRow>
        <TabPill
          label={TEXT_CONSTANTS.CONTRACTS_TABLE.TAB_MY_CONTRACTS}
          active={activeTab === 'myContracts'}
          onClick={() => onTabChange('myContracts')}
        />
        <TabPill
          label={TEXT_CONSTANTS.CONTRACTS_TABLE.TAB_MY_CASH_KICKS}
          active={activeTab === 'myCashKicks'}
          onClick={() => onTabChange('myCashKicks')}
        />
      </TabsRow>
    </TableHeaderContainer>
  );
};
