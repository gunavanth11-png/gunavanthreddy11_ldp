import axios from 'axios';
import { Contract, MetricSummary } from '../mock/data';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const formatCurrency = (value: number): string =>
  value === 0
    ? '—'
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);

type ContractResponse = {
  id: string;
  name: string;
  status: 'Available' | 'Pending' | 'Financed';
  type: string;
  perPayment: number;
  totalFinanced: number;
  totalAvailable: number;
};

export const getSummary = async (): Promise<MetricSummary> => {
  const { data } = await apiClient.get('/summary');

  return {
    termCap: data.termCap,
    availableCredit: `$${(data.availableCredit / 1000).toFixed(1)}k`,
    maxInterestRate: `${data.maxInterestRate.toFixed(2)}%`,
    totalAvailableAdvance: formatCurrency(
      data.totalAvailableAdvance
    ),
  };
};

export const getContracts = async (): Promise<Contract[]> => {
  const { data } = await apiClient.get<ContractResponse[]>(
    '/contracts'
  );

  return data.map(
    ({
      id,
      name,
      status,
      type,
      perPayment,
      totalFinanced,
      totalAvailable,
    }) => ({
      id,
      name,
      status,
      type,
      perPayment: formatCurrency(perPayment),
      totalFinanced: formatCurrency(totalFinanced),
      totalAvailable: formatCurrency(totalAvailable),
    })
  );
};

export const getCashKicks = async (): Promise<Contract[]> => {
  const { data } = await apiClient.get<ContractResponse[]>(
    '/cashKicks'
  );

  return data.map(
    ({
      id,
      name,
      status,
      type,
      perPayment,
      totalFinanced,
      totalAvailable,
    }) => ({
      id,
      name,
      status,
      type,
      perPayment: formatCurrency(perPayment),
      totalFinanced: formatCurrency(totalFinanced),
      totalAvailable: formatCurrency(totalAvailable),
    })
  );
};

export const createCashKick = async (
  name: string,
  selectedContractIds: string[]
): Promise<{ success: boolean }> => {
  const [{ data: contracts }, { data: summary }] =
    await Promise.all([
      apiClient.get<ContractResponse[]>('/contracts'),
      apiClient.get('/summary'),
    ]);

  const selectedContracts = contracts.filter(
    ({ id }) => selectedContractIds.includes(id)
  );

  const totalFinancedValue = selectedContracts.reduce(
    (sum, { totalAvailable }) => sum + totalAvailable,
    0
  );

  const totalPerPayment = selectedContracts.reduce(
    (sum, { perPayment }) => sum + perPayment,
    0
  );

  const newCashKick = {
    id: Math.random().toString(36).substring(2, 11),
    name,
    status: 'Pending',
    type: 'Monthly',
    perPayment: totalPerPayment,
    totalFinanced: totalFinancedValue,
    totalAvailable: 0,
  };

  await apiClient.post('/cashKicks', newCashKick);

  await Promise.all(
    selectedContracts.map(({ id, totalAvailable }) =>
      apiClient.patch(`/contracts/${id}`, {
        status: 'Financed',
        totalFinanced: totalAvailable,
        totalAvailable: 0,
      })
    )
  );

  const updatedAvailable = Math.max(
    0,
    summary.availableCredit - totalFinancedValue
  );

  await apiClient.put('/summary', {
    ...summary,
    availableCredit: updatedAvailable,
    totalAvailableAdvance: updatedAvailable,
  });

  return { success: true };
};

export const updateContract = async (
  id: string,
  data: {
    status: 'Available' | 'Pending' | 'Financed';
    totalFinanced: number;
    totalAvailable: number;
  }
) => {
  const { data: updatedContract } = await apiClient.patch(
    `/contracts/${id}`,
    data
  );

  return updatedContract;
};

export const updateSummary = async (
  data: MetricSummary
) => {
  const { data: updatedSummary } = await apiClient.put(
    '/summary',
    data
  );

  return updatedSummary;
};

export const deleteCashKick = async (
  id: string
): Promise<void> => {
  await apiClient.delete(`/cashKicks/${id}`);
};