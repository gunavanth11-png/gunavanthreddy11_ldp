/**
 * Utility functions for currency formatting and parsing.
 */

export const CURRENCY_CONFIG = {
  LOCALE: 'en-US',
  CURRENCY: 'USD',
  EMPTY_DISPLAY: '—',
} as const;

/**
 * Formats a numeric value into a USD currency string.
 * Returns '—' if the value is zero.
 */
export const formatCurrency = (val: number): string => {
  if (val === 0) return CURRENCY_CONFIG.EMPTY_DISPLAY;

  return new Intl.NumberFormat(CURRENCY_CONFIG.LOCALE, {
    style: 'currency',
    currency: CURRENCY_CONFIG.CURRENCY,
  }).format(val);
};

/**
 * Parses a formatted currency string into a number.
 */
export const parseCurrency = (str: string): number => {
  if (!str) return 0;
  const cleaned = str.replace(/[^0-9.]/g, '');
  return cleaned ? parseFloat(cleaned) : 0;
};
