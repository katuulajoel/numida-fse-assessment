// Types
export type LoanStatus = 'On Time' | 'Late' | 'Defaulted' | 'Unpaid';

/**
 * Determines loan status based on due date and payment date
 * @param dueDate The loan's due date
 * @param paymentDate The payment date (if any)
 * @returns The calculated loan status
 */
export const calculateLoanStatus = (dueDate: string, paymentDate?: string): LoanStatus => {
  if (!paymentDate) return 'Unpaid';
  
  const due = new Date(dueDate);
  const payment = new Date(paymentDate);
  const diffDays = Math.floor((payment.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 5) return 'On Time';
  if (diffDays <= 30) return 'Late';
  return 'Defaulted';
};

/**
 * Safely formats dates to ISO string format
 * @param dateString Date string to format
 * @returns Formatted date string or undefined if invalid
 */
export const formatDate = (dateString: string | null | undefined): string | undefined => {
  if (!dateString) return undefined;
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) return undefined;
    return date.toISOString().split('T')[0];
  } catch (e) {
    console.error("Error formatting date:", e);
    return undefined;
  }
};
