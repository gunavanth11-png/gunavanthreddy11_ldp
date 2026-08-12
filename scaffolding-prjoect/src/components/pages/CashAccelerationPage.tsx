import React from 'react';
import { Grid, Box } from '@mui/material';
import { DashboardTemplate } from '../templates/DashboardTemplate';
import { Sidebar } from '../organisms/Sidebar';
import { Header } from '../organisms/Header';
import { MetricsBanner } from '../organisms/MetricsBanner';
import { LaunchKickCard } from '../organisms/LaunchKickCard';
import { ContractsTable } from '../organisms/ContractsTable';
import { NewCashKickModal } from '../organisms/NewCashKickModal';
import { useContracts } from '../../hooks/useContracts';
import { useCashKicks } from '../../hooks/useCashKicks';

export interface CashAccelerationPageProps {
  onNavigate?: (path: string) => void;
}

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
      sidebar={<Sidebar activePath="/cash-acceleration" onNavigate={onNavigate} />}
      header={
        <Header
          title="Cash acceleration"
          subtitle="Place to create new cash kicks to run your business"
        />
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
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
      </Box>

      <NewCashKickModal
        open={isModalOpen}
        onClose={closeNewCashKickModal}
        onSuccess={handleLaunchSuccess}
        availableCreditAmount={rawCredit}
      />
    </DashboardTemplate>
  );
};
