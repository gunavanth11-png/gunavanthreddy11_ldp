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
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../../atoms/Button';
import { Contract } from '@/mock/data';
import { api, formatCurrency } from '@/services/api';

export interface NewCashKickModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  availableCreditAmount: number; 
}

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
  
  const interestRate = 12.00; 
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
        sx: (theme) => ({
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.border.default}`,
          borderRadius: '16px',
          backgroundImage: 'none',
          padding: '16px',
        }),
      }}
    >
      <DialogTitle
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: theme.palette.text.primary,
          fontWeight: 600,
          fontSize: '1.5rem',
          paddingBottom: 1,
        })}
      >
        Launch a new Cash Kick
        <IconButton onClick={onClose} sx={(theme) => ({ color: theme.palette.text.secondary })}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, paddingTop: 2 }}>
        {/* Cash Kick Name */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="subtitle2" sx={(theme) => ({ color: theme.palette.text.secondary })}>
            Name your cash kick
          </Typography>
          <TextField
            placeholder="Enter cash kick name"
            variant="outlined"
            fullWidth
            value={cashKickName}
            onChange={(e) => setCashKickName(e.target.value)}
            InputProps={{
              sx: (theme) => ({
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
              }),
            }}
          />
        </Box>

        {/* Contracts List Table */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="subtitle2" sx={(theme) => ({ color: theme.palette.text.secondary })}>
            Select contracts to advance
          </Typography>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={(theme) => ({
              backgroundColor: theme.palette.customBackground.elevation1,
              border: `1px solid ${theme.palette.border.default}`,
              maxHeight: '260px',
              borderRadius: '12px',
              overflowY: 'auto',
            })}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={(theme) => ({ '& th': { backgroundColor: theme.palette.customBackground.elevation1, borderBottom: `1px solid ${theme.palette.border.default}` } })}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedIds.length > 0 && selectedIds.length < contracts.length
                      }
                      checked={contracts.length > 0 && selectedIds.length === contracts.length}
                      onChange={handleSelectAll}
                      sx={(theme) => ({
                        color: theme.palette.text.secondary,
                        '&.Mui-checked': {
                          color: theme.palette.primary.main,
                        },
                      })}
                    />
                  </TableCell>
                  <TableCell sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}>Name</TableCell>
                  <TableCell sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}>Per Payment</TableCell>
                  <TableCell sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}>Available Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contracts.length > 0 ? (
                  contracts.map((c) => (
                    <TableRow
                      key={c.id}
                      hover
                      onClick={() => handleToggleSelect(c.id)}
                      sx={(theme) => ({
                        cursor: 'pointer',
                        '& td': { borderBottom: `1px solid ${theme.palette.border.default}` },
                      })}
                    >
                      <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedIds.includes(c.id)}
                          onChange={() => handleToggleSelect(c.id)}
                          sx={(theme) => ({
                            color: theme.palette.text.secondary,
                            '&.Mui-checked': {
                              color: theme.palette.primary.main,
                            },
                          })}
                        />
                      </TableCell>
                      <TableCell sx={(theme) => ({ color: theme.palette.text.primary, fontWeight: 500 })}>{c.name}</TableCell>
                      <TableCell sx={(theme) => ({ color: theme.palette.text.primary })}>{c.perPayment}</TableCell>
                      <TableCell sx={(theme) => ({ color: theme.palette.text.primary })}>{c.totalAvailable}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={(theme) => ({ color: theme.palette.text.secondary, py: 4 })}>
                      No available contracts to advance.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Live Calculation Summary */}
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.customBackground.elevation1,
            border: `1px solid ${theme.palette.border.default}`,
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          })}
        >
          <Typography variant="body1" sx={(theme) => ({ fontWeight: 600, color: theme.palette.text.primary })}>
            Summary Details
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={(theme) => ({ color: theme.palette.text.secondary })}>
              Selected Contracts:
            </Typography>
            <Typography variant="body2" sx={(theme) => ({ color: theme.palette.text.primary, fontWeight: 600 })}>
              {selectedIds.length}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={(theme) => ({ color: theme.palette.text.secondary })}>
              Total Selected Value (Payback):
            </Typography>
            <Typography variant="body2" sx={(theme) => ({ color: theme.palette.text.primary, fontWeight: 600 })}>
              {formatCurrency(totalPayback)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={(theme) => ({ color: theme.palette.text.secondary })}>
              Rate Fee ({interestRate.toFixed(2)}%):
            </Typography>
            <Typography variant="body2" sx={(theme) => ({ color: theme.palette.status.pendingText, fontWeight: 600 })}>
              {formatCurrency(interestFee)}
            </Typography>
          </Box>

          <Divider sx={(theme) => ({ borderColor: theme.palette.border.default, my: 0.5 })} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" sx={(theme) => ({ color: theme.palette.text.primary, fontWeight: 600 })}>
              Total Advance (Payout):
            </Typography>
            <Typography variant="h2" sx={(theme) => ({ color: theme.palette.primary.light, fontWeight: 700 })}>
              {formatCurrency(totalPayout)}
            </Typography>
          </Box>

          {totalPayout > availableCreditAmount && (
            <Typography variant="caption" sx={{ color: '#FF7A5C', fontWeight: 500, textAlign: 'right', mt: 1 }}>
              * Selected amount exceeds your available credit of {formatCurrency(availableCreditAmount)}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: '16px 24px', gap: 1.5 }}>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleLaunch}
          disabled={isLaunchDisabled}
          sx={(theme) => ({
            backgroundColor: isLaunchDisabled ? theme.palette.action.disabledBackground : theme.palette.primary.main,
            color: isLaunchDisabled ? theme.palette.text.disabled : theme.palette.primary.contrastText,
          })}
        >
          {loading ? 'Launching...' : 'Launch Cash Kick'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
