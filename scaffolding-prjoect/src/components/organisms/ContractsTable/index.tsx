import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TableHeader } from '../../molecules/TableHeader';
import { StatusChip } from '../../atoms/Chip';
import { Contract } from '@/mock/data';
import { TabType } from '@/hooks/useContracts';
import { TEXT_CONSTANTS } from '../../../constants';

export interface ContractsTableProps {
  contracts: Contract[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onSync?: () => void;
  isSyncing?: boolean;
}

const TablePaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.border.default}`,
  borderRadius: '16px',
  padding: theme.spacing(3.5),
}));

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: 'transparent',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
});

const StyledTable = styled(Table)({
  minWidth: 650,
});

const StyledHeadRow = styled(TableRow)(({ theme }) => ({
  '& th': {
    borderBottom: `1px solid ${theme.palette.border.default}`,
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const BodyTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': { border: 0 },
  '& td': {
    borderBottom: `1px solid ${theme.palette.border.default}`,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
}));

const PrimaryTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

const PrimaryTextCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const SecondaryTextCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const EmptyTableCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

export const ContractsTable: React.FC<ContractsTableProps> = ({
  contracts,
  activeTab,
  onTabChange,
  onSync,
  isSyncing = false,
}) => {
  return (
    <TablePaper elevation={0}>
      <TableHeader
        activeTab={activeTab}
        onTabChange={onTabChange}
        onSync={onSync}
        isSyncing={isSyncing}
      />

      <StyledTableContainer>
        <StyledTable>
          <TableHead>
            <StyledHeadRow>
              <HeaderTableCell>{TEXT_CONSTANTS.CONTRACTS_TABLE.COL_NAME}</HeaderTableCell>
              <HeaderTableCell>{TEXT_CONSTANTS.CONTRACTS_TABLE.COL_STATUS}</HeaderTableCell>
              <HeaderTableCell>{TEXT_CONSTANTS.CONTRACTS_TABLE.COL_TYPE}</HeaderTableCell>
              <HeaderTableCell>{TEXT_CONSTANTS.CONTRACTS_TABLE.COL_PER_PAYMENT}</HeaderTableCell>
              <HeaderTableCell>{TEXT_CONSTANTS.CONTRACTS_TABLE.COL_TOTAL_FINANCED}</HeaderTableCell>
              <HeaderTableCell>{TEXT_CONSTANTS.CONTRACTS_TABLE.COL_TOTAL_AVAILABLE}</HeaderTableCell>
            </StyledHeadRow>
          </TableHead>
          <TableBody>
            {contracts.length > 0 ? (
              contracts.map((contract) => (
                <BodyTableRow key={contract.id}>
                  <PrimaryTableCell component="th" scope="row">
                    {contract.name}
                  </PrimaryTableCell>
                  <TableCell>
                    <StatusChip status={contract.status} />
                  </TableCell>
                  <SecondaryTextCell>{contract.type}</SecondaryTextCell>
                  <PrimaryTextCell>{contract.perPayment}</PrimaryTextCell>
                  <SecondaryTextCell>{contract.totalFinanced}</SecondaryTextCell>
                  <PrimaryTextCell>{contract.totalAvailable}</PrimaryTextCell>
                </BodyTableRow>
              ))
            ) : (
              <TableRow>
                <EmptyTableCell colSpan={6} align="center">
                  {activeTab === 'myCashKicks'
                    ? TEXT_CONSTANTS.CONTRACTS_TABLE.EMPTY_CASH_KICKS
                    : TEXT_CONSTANTS.CONTRACTS_TABLE.EMPTY_CONTRACTS}
                </EmptyTableCell>
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </TablePaper>
  );
};
