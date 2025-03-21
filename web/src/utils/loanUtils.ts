// Types
export type LoanStatus = 'On Time' | 'Late' | 'Defaulted' | 'Unpaid';

/**
 * Determines loan status based on due date, payment date, and payment amounts
 * @param dueDate The loan's due date
 * @param paymentDate The payment date (if any)
 * @param principal The loan principal amount
 * @param interestRate The loan interest rate as a percentage
 * @param payments Array of payment objects
 * @returns The calculated loan status
 */
export const calculateLoanStatus = (
  dueDate: string, 
  paymentDate?: string,
  principal?: number,
  interestRate?: number,
  payments?: Array<{ amount: number }>
): LoanStatus => {
  // If no payment date, the loan is unpaid
  if (!paymentDate) return 'Unpaid';
  
  // Check if payment is sufficient
  if (principal && interestRate !== undefined && payments && payments.length > 0) {
    // Calculate total amount due with interest
    const totalDue = principal * (1 + interestRate / 100);
    
    // Calculate total amount paid
    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
    
    // If total paid is less than total due, the loan is still unpaid
    if (totalPaid < totalDue) return 'Unpaid';
  }
  
  // Time-based status determination
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
