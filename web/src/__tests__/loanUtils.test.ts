import { calculateLoanStatus, formatDate } from '../utils/loanUtils';

describe('loanUtils', () => {
  describe('calculateLoanStatus', () => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() + 10);
    
    const nearPastDate = new Date(today);
    nearPastDate.setDate(today.getDate() - 3);
    
    const farPastDate = new Date(today);
    farPastDate.setDate(today.getDate() + 40);

    const dueDateStr = today.toISOString().split('T')[0];
    const paymentDateStr = pastDate.toISOString().split('T')[0];
    const nearpaymentDateStr = nearPastDate.toISOString().split('T')[0];
    const farpaymentDateStr = farPastDate.toISOString().split('T')[0];

    // Sample payment data
    const payments = [
      { amount: 500 },
      { amount: 500 }
    ];

    it('should return Unpaid when no payment date is provided', () => {
      expect(calculateLoanStatus(dueDateStr)).toBe('Unpaid');
    });

    it('should return On Time when payment is within 5 days of due date', () => {
      expect(calculateLoanStatus(dueDateStr, nearpaymentDateStr)).toBe('On Time');
    });

    it('should return Late when payment is more than 5 days but less than 30 days late', () => {
      expect(calculateLoanStatus(dueDateStr, paymentDateStr)).toBe('Late');
    });

    it('should return Defaulted when payment is more than 30 days late', () => {
      expect(calculateLoanStatus(dueDateStr, farpaymentDateStr)).toBe('Defaulted');
    });

    it('should return Unpaid when total payments are less than principal plus interest', () => {
      // Principal is 1000, interest rate is 10%, so total due is 1100
      // But we only paid 1000 total (500 + 500)
      expect(calculateLoanStatus(
        dueDateStr, 
        nearpaymentDateStr, 
        1000, 
        10, 
        payments
      )).toBe('Unpaid');
    });

    it('should return On Time when payment covers the full amount and is within 5 days', () => {
      // Principal is 900, interest rate is 10%, so total due is 990
      // We paid 1000 total (500 + 500), which is enough
      expect(calculateLoanStatus(
        dueDateStr, 
        nearpaymentDateStr, 
        900, 
        10, 
        payments
      )).toBe('On Time');
    });
  });

  describe('formatDate', () => {
    it('should format a valid date string', () => {
      expect(formatDate('2023-03-15')).toBe('2023-03-15');
    });

    it('should return undefined for invalid date string', () => {
      expect(formatDate('invalid-date')).toBeUndefined();
    });

    it('should return undefined for null or undefined inputs', () => {
      expect(formatDate(null)).toBeUndefined();
      expect(formatDate(undefined)).toBeUndefined();
    });
  });
});
