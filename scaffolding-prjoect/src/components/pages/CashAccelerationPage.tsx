import React from 'react';
import { Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardTemplate } from '../templates/DashboardTemplate';
import { Sidebar } from '../organisms/Sidebar';
import { Header } from '../organisms/Header';
import { MetricsBanner } from '../organisms/MetricsBanner';
import { LaunchKickCard } from '../organisms/LaunchKickCard';
import { ContractsTable } from '../organisms/ContractsTable';
import { NewCashKickModal } from '../organisms/NewCashKickModal';
import { useContracts } from '../../hooks/useContracts';
import { useCashKicks } from '../../hooks/useCashKicks';
import { TEXT_CONSTANTS } from '../../constants';

export interface CashAccelerationPageProps {
  onNavigate?: (path: string) => void;
}

const PageContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3.5),
}));

export const CashAccelerationPage: React.FC<CashAccelerationPageProps> = ({ onNavigate }) => {
  const { activeTab, setActiveTab, contracts, isSyncing, handleSync, reloadData: reloadContracts } = useContracts();
  const {
    summary,
    rawCredit,
    isModalOpen,
    openNewCashKickModal,
    closeNewCashKickModal,
    reloadData: reloadSummary,
  } = useCashKicks();

  const handleLaunchSuccess = () => {
    reloadContracts();
    reloadSummary();
  };

  return (
    <DashboardTemplate
      sidebar={
        <Sidebar
          activePath={TEXT_CONSTANTS.SIDEBAR.PATHS.CASH_ACCELERATION}
          onNavigate={onNavigate}
        />
      }
      header={
        <Header
          title={TEXT_CONSTANTS.HEADER.DEFAULT_TITLE}
          subtitle={TEXT_CONSTANTS.HEADER.DEFAULT_SUBTITLE}
        />
      }
    >
      <PageContentBox>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={8}>
            <MetricsBanner summary={summary} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LaunchKickCard
              availableAmount={summary.totalAvailableAdvance}
              onLaunchClick={openNewCashKickModal}
            />
          </Grid>
        </Grid>

        <ContractsTable
          contracts={contracts}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSync={handleSync}
          isSyncing={isSyncing}
        />
      </PageContentBox>

      <NewCashKickModal
        open={isModalOpen}
        onClose={closeNewCashKickModal}
        onSuccess={handleLaunchSuccess}
        availableCreditAmount={rawCredit}
      />
    </DashboardTemplate>
  );
};
