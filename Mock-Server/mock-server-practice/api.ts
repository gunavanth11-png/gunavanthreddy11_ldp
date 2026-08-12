const BASE_URL = "http://localhost:8000";

export const getContracts = async () => {
  const response = await fetch(`${BASE_URL}/contracts`);

  if (!response.ok) {
    throw new Error("Failed to fetch contracts");
  }

  return response.json();
};

export const updateContract = async (contractId: string) => {
  const response = await fetch(`${BASE_URL}/contracts/${contractId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "Financed",
      totalFinanced: 126722.64,
      totalAvailable: 0,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update contract");
  }

  return response.json();
};

export const updateSummary = async () => {
  const response = await fetch(`${BASE_URL}/summary`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      termCap: "12 months",
      availableCredit: 753277.36,
      maxInterestRate: 12,
      totalAvailableAdvance: 753277.36,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update summary");
  }

  return response.json();
};

export const createCashKick = async () => {
  const response = await fetch(`${BASE_URL}/cashKicks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "My First Cash Kick",
      status: "Pending",
      type: "Monthly",
      perPayment: 18000,
      totalFinanced: 190082,
      totalAvailable: 0,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create cash kick");
  }

  return response.json();
};