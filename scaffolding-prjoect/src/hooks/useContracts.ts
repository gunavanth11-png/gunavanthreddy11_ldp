import { useState, useCallback, useEffect } from 'react';
import { Contract } from '../mock/data';
import { api } from '../services/api';

export type TabType = 'myContracts' | 'myCashKicks';

export const useContracts = () => {
  const [activeTab, setActiveTab] = useState<TabType>('myContracts');
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'myContracts') {
        const data = await api.getContracts();
        setContracts(data);
      } else {
        const data = await api.getCashKicks();
        setContracts(data);
      }
    } catch (e) {
      console.error('Failed to load contracts data', e);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSync = useCallback(async () => {
    setIsSyncing(true);
    await loadData();
    
    setTimeout(() => {
      setIsSyncing(false);
    }, 600);
  }, [loadData]);

  return {
    activeTab,
    setActiveTab,
    contracts,
    loading,
    isSyncing,
    handleSync,
    reloadData: loadData,
  };
};

