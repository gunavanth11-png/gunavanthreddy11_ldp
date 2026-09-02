import { Contract, MetricSummary } from '../mock/data';

const BASE_URL = 'http://localhost:8000';

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

      if (!response.ok) {
        throw new Error('API error');
      }

      const data = await response.json();

      return {
        termCap: data.termCap,
        availableCredit: `$${(
          data.availableCredit / 1000
        ).toFixed(1)}k`,
        maxInterestRate: `${data.maxInterestRate.toFixed(2)}%`,
        totalAvailableAdvance: formatCurrency(
          data.totalAvailableAdvance
        ),
      };
    } catch (error) {
      console.error('Failed to fetch summary:', error);
      throw error;
    }
  },

  getContracts: async (): Promise<Contract[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/contracts`
      );

      if (!response.ok) {
        throw new Error('API error');
      }

      const data = await response.json();

      return data.map((c: any) => ({
        id: c.id,
        name: c.name,
        status: c.status,
        type: c.type,
        perPayment: formatCurrency(c.perPayment),
        totalFinanced: formatCurrency(c.totalFinanced),
        totalAvailable: formatCurrency(
          c.totalAvailable
        ),
      }));
    } catch (error) {
      console.error('Failed to fetch contracts:', error);
      throw error;
    }
  },

  getCashKicks: async (): Promise<Contract[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/cashKicks`
      );

      if (!response.ok) {
        throw new Error('API error');
      }

      const data = await response.json();

      return data.map((ck: any) => ({
        id: ck.id,
        name: ck.name,
        status: ck.status,
        type: ck.type,
        perPayment: formatCurrency(ck.perPayment),
        totalFinanced: formatCurrency(
          ck.totalFinanced
        ),
        totalAvailable: formatCurrency(
          ck.totalAvailable
        ),
      }));
    } catch (error) {
      console.error(
        'Failed to fetch cash kicks:',
        error
      );
      throw error;
    }
  },

  createCashKick: async (
    name: string,
    selectedContractIds: string[]
  ): Promise<{ success: boolean }> => {
    try {
      const currentContractsRes = await fetch(
        `${BASE_URL}/contracts`
      );

      const currentSummaryRes = await fetch(
        `${BASE_URL}/summary`
      );

      if (
        !currentContractsRes.ok ||
        !currentSummaryRes.ok
      ) {
        throw new Error(
          'Failed to fetch data for calculations'
        );
      }

      const dbContracts =
        await currentContractsRes.json();

      const dbSummary =
        await currentSummaryRes.json();

      const selectedContracts = dbContracts.filter(
        (c: any) =>
          selectedContractIds.includes(c.id)
      );

      const totalFinancedValue =
        selectedContracts.reduce(
          (sum: number, c: any) =>
            sum + c.totalAvailable,
          0
        );

      const totalPerPayment =
        selectedContracts.reduce(
          (sum: number, c: any) =>
            sum + c.perPayment,
          0
        );

      const newCashKick = {
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        name,
        status: 'Pending',
        type: 'Monthly',
        perPayment: totalPerPayment,
        totalFinanced: totalFinancedValue,
        totalAvailable: 0,
      };

      const createRes = await fetch(
        `${BASE_URL}/cashKicks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCashKick),
        }
      );

      if (!createRes.ok) {
        throw new Error(
          'Failed to create Cash Kick'
        );
      }

      for (const contract of selectedContracts) {
        const updateRes = await fetch(
          `${BASE_URL}/contracts/${contract.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: 'Financed',
              totalFinanced:
                contract.totalAvailable,
              totalAvailable: 0,
            }),
          }
        );

        if (!updateRes.ok) {
          throw new Error(
            `Failed to update contract ${contract.id}`
          );
        }
      }

      const updatedAvailable = Math.max(
        0,
        dbSummary.availableCredit -
          totalFinancedValue
      );

      const summaryRes = await fetch(
        `${BASE_URL}/summary`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...dbSummary,
            availableCredit:
              updatedAvailable,
            totalAvailableAdvance:
              updatedAvailable,
          }),
        }
      );

      if (!summaryRes.ok) {
        throw new Error(
          'Failed to update summary'
        );
      }

      return { success: true };
    } catch (error) {
      console.error(
        'Failed to create Cash Kick:',
        error
      );
      throw error;
    }
  },
};