
import React from 'react';

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

/**
 * Custom RON icon component to use instead of DollarSign
 * This creates a RON text symbol that can be used in place of the dollar icon
 */
export const RonIcon = ({ className = "h-4 w-4" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center font-semibold ${className}`}>
      RON
    </div>
  );
};
