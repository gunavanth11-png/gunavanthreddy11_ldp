import { Contract, MetricSummary } from '../mock/data';

const BASE_URL = 'http://localhost:8000';

let localSummary: MetricSummary = {
  termCap: '12 months',
  availableCredit: '$880.0k',
  maxInterestRate: '12.00%',
  totalAvailableAdvance: '$880,000.00',
};

let localContracts: Contract[] = [
  {
    id: '1',
    name: 'Contract 1',
    status: 'Available',
    type: 'Monthly',
    perPayment: '$12,000.25',
    totalFinanced: '—',
    totalAvailable: '$126,722.64',
  },
  {
    id: '3',
    name: 'Contract 3',
    status: 'Available',
    type: 'Monthly',
    perPayment: '$6,000.00',
    totalFinanced: '—',
    totalAvailable: '$63,360.00',
  },
  {
    id: '4',
    name: 'Contract 4',
    status: 'Available',
    type: 'Monthly',
    perPayment: '$6,000.00',
    totalFinanced: '—',
    totalAvailable: '$63,360.00',
  },
  {
    id: '5',
    name: 'Contract 5',
    status: 'Available',
    type: 'Monthly',
    perPayment: '$5,000.00',
    totalFinanced: '—',
    totalAvailable: '$52,800.00',
  },
  {
    id: '6',
    name: 'Contract 6',
    status: 'Available',
    type: 'Monthly',
    perPayment: '$10,000.00',
    totalFinanced: '—',
    totalAvailable: '$105,600.00',
  },
];

let localCashKicks: Contract[] = [
  {
    id: 'ck1',
    name: 'Cash Kick 1',
    status: 'Pending',
    type: 'Monthly',
    perPayment: '$18,000.25',
    totalFinanced: '$190,082.64',
    totalAvailable: '—',
  },
  {
    id: 'ck2',
    name: 'Cash Kick 2',
    status: 'Pending',
    type: 'Monthly',
    perPayment: '$11,000.00',
    totalFinanced: '$116,160.00',
    totalAvailable: '—',
  },
];

export const formatCurrency = (val: number): string => {
  if (val === 0) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(val);
};

export const parseCurrency = (str: string): number => {
  const cleaned = str.replace(/[^0-9.]/g, '');
  return cleaned ? parseFloat(cleaned) : 0;
};

export const api = {
  getSummary: async (): Promise<MetricSummary> => {
    try {
      const response = await fetch(`${BASE_URL}/summary`);
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      
      return {
        termCap: data.termCap,
        availableCredit: `$${(data.availableCredit / 1000).toFixed(1)}k`,
        maxInterestRate: `${data.maxInterestRate.toFixed(2)}%`,
        totalAvailableAdvance: formatCurrency(data.totalAvailableAdvance),
      };
    } catch (e) {
      console.warn('Mock server not responding, using local mock data.', e);
      return localSummary;
    }
  },

  getContracts: async (): Promise<Contract[]> => {
    try {
      const response = await fetch(`${BASE_URL}/contracts`);
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      
      return data.map((c: any) => ({
        id: c.id,
        name: c.name,
        status: c.status,
        type: c.type,
        perPayment: formatCurrency(c.perPayment),
        totalFinanced: formatCurrency(c.totalFinanced),
        totalAvailable: formatCurrency(c.totalAvailable),
      }));
    } catch (e) {
      console.warn('Mock server not responding, using local mock data.', e);
      return localContracts;
    }
  },

  getCashKicks: async (): Promise<Contract[]> => {
    try {
      const response = await fetch(`${BASE_URL}/cashKicks`);
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      return data.map((ck: any) => ({
        id: ck.id,
        name: ck.name,
        status: ck.status,
        type: ck.type,
        perPayment: formatCurrency(ck.perPayment),
        totalFinanced: formatCurrency(ck.totalFinanced),
        totalAvailable: formatCurrency(ck.totalAvailable),
      }));
    } catch (e) {
      console.warn('Mock server not responding, using local mock data.', e);
      return localCashKicks;
    }
  },

  createCashKick: async (
    name: string,
    selectedContractIds: string[]
  ): Promise<{ success: boolean }> => {
    try {
      
      const currentContractsRes = await fetch(`${BASE_URL}/contracts`);
      const currentSummaryRes = await fetch(`${BASE_URL}/summary`);
      
      if (!currentContractsRes.ok || !currentSummaryRes.ok) {
        throw new Error('Failed to fetch data for calculations');
      }

      const dbContracts = await currentContractsRes.json();
      const dbSummary = await currentSummaryRes.json();

    
      const selectedContracts = dbContracts.filter((c: any) =>
        selectedContractIds.includes(c.id)
      );

      const totalFinancedValue = selectedContracts.reduce(
        (sum: number, c: any) => sum + c.totalAvailable,
        0
      );
      const totalPerPayment = selectedContracts.reduce(
        (sum: number, c: any) => sum + c.perPayment,
        0
      );

    
      const newCashKick = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        status: 'Pending',
        type: 'Monthly',
        perPayment: totalPerPayment,
        totalFinanced: totalFinancedValue,
        totalAvailable: 0,
      };

      
      const createRes = await fetch(`${BASE_URL}/cashKicks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCashKick),
      });

      if (!createRes.ok) throw new Error('Failed to create Cash Kick');

      
      for (const contract of selectedContracts) {
        await fetch(`${BASE_URL}/contracts/${contract.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: 'Financed',
            totalFinanced: contract.totalAvailable, 
            totalAvailable: 0,
          }),
        });
      }

      
      const updatedAvailable = Math.max(0, dbSummary.availableCredit - totalFinancedValue);
      await fetch(`${BASE_URL}/summary`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dbSummary,
          availableCredit: updatedAvailable,
          totalAvailableAdvance: updatedAvailable,
        }),
      });

      return { success: true };
    } catch (e) {
      console.warn('Mock server failed or not running, performing local updates.', e);

    
      const selectedLocal = localContracts.filter((c) => selectedContractIds.includes(c.id));
      const totalFinancedValue = selectedLocal.reduce(
        (sum, c) => sum + parseCurrency(c.totalAvailable),
        0
      );
      const totalPerPayment = selectedLocal.reduce(
        (sum, c) => sum + parseCurrency(c.perPayment),
        0
      );

      const newLocalCashKick: Contract = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        status: 'Pending',
        type: 'Monthly',
        perPayment: formatCurrency(totalPerPayment),
        totalFinanced: formatCurrency(totalFinancedValue),
        totalAvailable: '—',
      };

      localCashKicks = [...localCashKicks, newLocalCashKick];

      localContracts = localContracts.map((c) => {
        if (selectedContractIds.includes(c.id)) {
          return {
            ...c,
            status: 'Financed',
            totalFinanced: c.totalAvailable,
            totalAvailable: '—',
          };
        }
        return c;
      });

      const parsedCredit = parseCurrency(localSummary.availableCredit) * 1000;
      const updatedCredit = Math.max(0, parsedCredit - totalFinancedValue);
      localSummary = {
        ...localSummary,
        availableCredit: `$${(updatedCredit / 1000).toFixed(1)}k`,
        totalAvailableAdvance: formatCurrency(updatedCredit),
      };

      return { success: true };
    }
  },
};
