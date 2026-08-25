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