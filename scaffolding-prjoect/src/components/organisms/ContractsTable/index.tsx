import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from '@mui/material';
import { TableHeader } from '../../molecules/TableHeader';
import { StatusChip } from '../../atoms/Chip';
import { Contract } from '@/mock/data';
import { TabType } from '@/hooks/useContracts';

export interface ContractsTableProps {
  contracts: Contract[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onSync?: () => void;
  isSyncing?: boolean;
}

export const ContractsTable: React.FC<ContractsTableProps> = ({
  contracts,
  activeTab,
  onTabChange,
  onSync,
  isSyncing = false,
}) => {
  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.border.default}`,
        borderRadius: '16px',
        padding: '28px',
      })}
    >
      <TableHeader
        activeTab={activeTab}
        onTabChange={onTabChange}
        onSync={onSync}
        isSyncing={isSyncing}
      />

      <TableContainer sx={{
          backgroundColor: 'transparent',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={(theme) => ({ '& th': { borderBottom: `1px solid ${theme.palette.border.default}`, paddingY: 1.5 } })}>
              <TableCell sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}>Name</TableCell>
              <TableCell sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}>Status</TableCell>
              <TableCell sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}>Type</TableCell>
              <TableCell sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}>Per payment</TableCell>
              <TableCell sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}>Total financed</TableCell>
              <TableCell sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}>Total available</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.length > 0 ? (
              contracts.map((contract) => (
                <TableRow
                  key={contract.id}
                  sx={(theme) => ({
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& td': { borderBottom: `1px solid ${theme.palette.border.default}`, paddingY: 2 },
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    },
                  })}
                >
                  <TableCell component="th" scope="row" sx={(theme) => ({ color: theme.palette.text.primary, fontWeight: 500 })}>
                    {contract.name}
                  </TableCell>
                  <TableCell>
                    <StatusChip status={contract.status} />
                  </TableCell>
                  <TableCell sx={(theme) => ({ color: theme.palette.text.secondary })}>{contract.type}</TableCell>
                  <TableCell sx={(theme) => ({ color: theme.palette.text.primary })}>{contract.perPayment}</TableCell>
                  <TableCell sx={(theme) => ({ color: theme.palette.text.secondary })}>{contract.totalFinanced}</TableCell>
                  <TableCell sx={(theme) => ({ color: theme.palette.text.primary })}>{contract.totalAvailable}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={(theme) => ({ paddingY: 4, color: theme.palette.text.secondary })}>
                  {activeTab === 'myCashKicks' ? 'No launched cash kicks available.' : 'No active contracts available.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

