import { useState, useEffect, useCallback } from 'react';
import { MetricSummary } from '../mock/data';
import { api, parseCurrency } from '../services/api';

export const useCashKicks = () => {
  const [summary, setSummary] = useState<MetricSummary>({
    termCap: '12 months',
    availableCredit: '$0.0k',
    maxInterestRate: '12.00%',
    totalAvailableAdvance: '$0.00',
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const loadSummary = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getSummary();
      setSummary(data);
    } catch (e) {
      console.error('Failed to load metrics summary', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  const openNewCashKickModal = () => setIsModalOpen(true);
  const closeNewCashKickModal = () => setIsModalOpen(false);


  const rawCredit = parseCurrency(summary.totalAvailableAdvance);

  return {
    summary,
    rawCredit,
    isModalOpen,
    loading,
    openNewCashKickModal,
    closeNewCashKickModal,
    reloadData: loadSummary,
  };
};

