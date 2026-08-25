import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../../atoms/Button';
import { Contract } from '@/mock/data';
import { api, formatCurrency } from '@/services/api';
import { TEXT_CONSTANTS } from '../../../constants';

export interface NewCashKickModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  availableCreditAmount: number;
}

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontSize: '1.5rem',
  paddingBottom: theme.spacing(1),
}));

const CloseIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3.5),
  paddingTop: theme.spacing(2),
}));

const InputGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const SectionLabelText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const TableSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

const StyledModalTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.customBackground.elevation1,
  border: `1px solid ${theme.palette.border.default}`,
  maxHeight: '260px',
  borderRadius: '12px',
  overflowY: 'auto',
}));

const StyledModalHeaderRow = styled(TableRow)(({ theme }) => ({
  '& th': {
    backgroundColor: theme.palette.customBackground.elevation1,
    borderBottom: `1px solid ${theme.palette.border.default}`,
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

const ModalHeaderTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const ModalBodyRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  '& td': { borderBottom: `1px solid ${theme.palette.border.default}` },
}));

const ModalPrimaryCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

const ModalCellText = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const ModalEmptyCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const CalculationCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.customBackground.elevation1,
  border: `1px solid ${theme.palette.border.default}`,
  borderRadius: '12px',
  padding: theme.spacing(2.5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

const SummaryTitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const SummaryRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

const SummaryRowAligned = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const SummaryLabelText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const SummaryValueText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

const RateFeeValueText = styled(Typography)(({ theme }) => ({
  color: theme.palette.status.pendingText,
  fontWeight: 600,
}));

const StyledSummaryDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.border.default,
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
}));

const TotalPayoutText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontWeight: 700,
}));

const ExceedWarningText = styled(Typography)(({ theme }) => ({
  color: theme.palette.status.warningText,
  fontWeight: 500,
  textAlign: 'right',
  marginTop: theme.spacing(1),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  gap: theme.spacing(1.5),
}));

const LaunchButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isLaunchDisabled',
})<{ isLaunchDisabled?: boolean }>(({ theme, isLaunchDisabled }) => ({
  backgroundColor: isLaunchDisabled
    ? theme.palette.action.disabledBackground
    : theme.palette.primary.main,
  color: isLaunchDisabled
    ? theme.palette.text.disabled
    : theme.palette.primary.contrastText,
}));

const modalPaperSx = (theme: any) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.border.default}`,
  borderRadius: '16px',
  backgroundImage: 'none',
  padding: theme.spacing(2),
});

const textFieldInputSx = (theme: any) => ({
  backgroundColor: theme.palette.customBackground.elevation1,
  border: `1px solid ${theme.palette.border.default}`,
  borderRadius: '12px',
  color: theme.palette.text.primary,
  '& fieldset': {
    border: 'none',
  },
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focused': {
    borderColor: theme.palette.primary.main,
  },
});

export const NewCashKickModal: React.FC<NewCashKickModalProps> = ({
  open,
  onClose,
  onSuccess,
  availableCreditAmount,
}) => {
  const [cashKickName, setCashKickName] = useState<string>('');
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      const loadContracts = async () => {
        const data = await api.getContracts();
        const available = data.filter((c) => c.status === 'Available');
        setContracts(available);
      };
      loadContracts();
      setCashKickName('');
      setSelectedIds([]);
    }
  }, [open]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIds(contracts.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const parseCurrencyValue = (str: string): number => {
    const cleaned = str.replace(/[^0-9.]/g, '');
    return cleaned ? parseFloat(cleaned) : 0;
  };

  const selectedContracts = contracts.filter((c) => selectedIds.includes(c.id));
  const totalPayback = selectedContracts.reduce(
    (sum, c) => sum + parseCurrencyValue(c.totalAvailable),
    0
  );

  const interestRate = 12.0;
  const interestFee = totalPayback * (interestRate / 100);
  const totalPayout = Math.max(0, totalPayback - interestFee);

  const isLaunchDisabled =
    cashKickName.trim() === '' ||
    selectedIds.length === 0 ||
    totalPayout > availableCreditAmount ||
    loading;

  const handleLaunch = async () => {
    if (isLaunchDisabled) return;
    setLoading(true);
    try {
      const result = await api.createCashKick(cashKickName, selectedIds);
      if (result.success) {
        onSuccess();
        onClose();
      }
    } catch (e) {
      console.error('Failed to launch cash kick', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: modalPaperSx,
      }}
    >
      <StyledDialogTitle>
        {TEXT_CONSTANTS.MODAL.TITLE}
        <CloseIconButton onClick={onClose}>
          <CloseIcon />
        </CloseIconButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        {/* Cash Kick Name */}
        <InputGroup>
          <SectionLabelText variant="subtitle2">
            {TEXT_CONSTANTS.MODAL.NAME_LABEL}
          </SectionLabelText>
          <TextField
            placeholder={TEXT_CONSTANTS.MODAL.NAME_PLACEHOLDER}
            variant="outlined"
            fullWidth
            value={cashKickName}
            onChange={(e) => setCashKickName(e.target.value)}
            InputProps={{
              sx: textFieldInputSx,
            }}
          />
        </InputGroup>

        {/* Contracts List Table */}
        <TableSection>
          <SectionLabelText variant="subtitle2">
            {TEXT_CONSTANTS.MODAL.TABLE_LABEL}
          </SectionLabelText>
          <StyledModalTableContainer component={Paper} elevation={0}>
            <Table stickyHeader>
              <TableHead>
                <StyledModalHeaderRow>
                  <TableCell padding="checkbox">
                    <StyledCheckbox
                      indeterminate={
                        selectedIds.length > 0 && selectedIds.length < contracts.length
                      }
                      checked={contracts.length > 0 && selectedIds.length === contracts.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <ModalHeaderTableCell>{TEXT_CONSTANTS.MODAL.COL_NAME}</ModalHeaderTableCell>
                  <ModalHeaderTableCell>{TEXT_CONSTANTS.MODAL.COL_PER_PAYMENT}</ModalHeaderTableCell>
                  <ModalHeaderTableCell>{TEXT_CONSTANTS.MODAL.COL_AVAILABLE_AMOUNT}</ModalHeaderTableCell>
                </StyledModalHeaderRow>
              </TableHead>
              <TableBody>
                {contracts.length > 0 ? (
                  contracts.map((c) => (
                    <ModalBodyRow
                      key={c.id}
                      hover
                      onClick={() => handleToggleSelect(c.id)}
                    >
                      <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                        <StyledCheckbox
                          checked={selectedIds.includes(c.id)}
                          onChange={() => handleToggleSelect(c.id)}
                        />
                      </TableCell>
                      <ModalPrimaryCell>{c.name}</ModalPrimaryCell>
                      <ModalCellText>{c.perPayment}</ModalCellText>
                      <ModalCellText>{c.totalAvailable}</ModalCellText>
                    </ModalBodyRow>
                  ))
                ) : (
                  <TableRow>
                    <ModalEmptyCell colSpan={4} align="center">
                      {TEXT_CONSTANTS.MODAL.EMPTY_CONTRACTS}
                    </ModalEmptyCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </StyledModalTableContainer>
        </TableSection>

        {/* Live Calculation Summary */}
        <CalculationCard>
          <SummaryTitleText variant="body1">
            {TEXT_CONSTANTS.MODAL.SUMMARY_TITLE}
          </SummaryTitleText>

          <SummaryRow>
            <SummaryLabelText variant="body2">
              {TEXT_CONSTANTS.MODAL.SELECTED_CONTRACTS}
            </SummaryLabelText>
            <SummaryValueText variant="body2">{selectedIds.length}</SummaryValueText>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabelText variant="body2">
              {TEXT_CONSTANTS.MODAL.TOTAL_SELECTED_VALUE}
            </SummaryLabelText>
            <SummaryValueText variant="body2">{formatCurrency(totalPayback)}</SummaryValueText>
          </SummaryRow>

          <SummaryRow>
            <SummaryLabelText variant="body2">
              {TEXT_CONSTANTS.MODAL.RATE_FEE_PREFIX} ({interestRate.toFixed(2)}%):
            </SummaryLabelText>
            <RateFeeValueText variant="body2">{formatCurrency(interestFee)}</RateFeeValueText>
          </SummaryRow>

          <StyledSummaryDivider />

          <SummaryRowAligned>
            <SummaryTitleText variant="body1">
              {TEXT_CONSTANTS.MODAL.TOTAL_ADVANCE}
            </SummaryTitleText>
            <TotalPayoutText variant="h2">{formatCurrency(totalPayout)}</TotalPayoutText>
          </SummaryRowAligned>

          {totalPayout > availableCreditAmount && (
            <ExceedWarningText variant="caption">
              {TEXT_CONSTANTS.MODAL.EXCEED_WARNING_PREFIX}
              {formatCurrency(availableCreditAmount)}
            </ExceedWarningText>
          )}
        </CalculationCard>
      </StyledDialogContent>

      <StyledDialogActions>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          {TEXT_CONSTANTS.MODAL.CANCEL_BTN}
        </Button>
        <LaunchButton
          variant="contained"
          onClick={handleLaunch}
          disabled={isLaunchDisabled}
          isLaunchDisabled={isLaunchDisabled}
        >
          {loading ? TEXT_CONSTANTS.MODAL.LAUNCHING_BTN : TEXT_CONSTANTS.MODAL.LAUNCH_BTN}
        </LaunchButton>
      </StyledDialogActions>
    </Dialog>
  );
};
