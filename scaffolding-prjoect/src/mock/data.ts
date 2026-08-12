export interface Contract {
  id: string;
  name: string;
  status: 'Available' | 'Pending' | 'Financed';
  type: string;
  perPayment: string;
  totalFinanced: string;
  totalAvailable: string;
}

export interface MetricSummary {
  termCap: string;
  availableCredit: string;
  maxInterestRate: string;
  totalAvailableAdvance: string;
}

export const mockSummary: MetricSummary = {
  termCap: '12 months',
  availableCredit: '$880.0k',
  maxInterestRate: '12.00%',
  totalAvailableAdvance: '$880,000.00',
};

export const mockContracts: Contract[] = [
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
