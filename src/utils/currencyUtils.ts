
// Exchange rate as of April 2025 - 1 USD = 4.32 RON
export const USD_TO_RON_RATE = 4.32;

/**
 * Converts USD amount to RON
 */
export const usdToRon = (usdAmount: number): number => {
  return usdAmount * USD_TO_RON_RATE;
};

/**
 * Formats a number as RON currency
 */
export const formatRon = (amount: number): string => {
  return `${amount.toFixed(2)} RON`;
};
