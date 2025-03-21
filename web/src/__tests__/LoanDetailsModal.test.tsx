import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoanDetailsModal from '../components/LoanDetailsModal';
import { Loan, LoanStatus } from '../models/Loan';

// Mock the translation hook
jest.mock('../i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en'
    }
  })
}));

describe('LoanDetailsModal', () => {
  const mockLoan: Loan = {
    id: '1',
    name: 'Test Loan',
    principal: 10000,
    interestRate: 5,
    dueDate: '2023-12-31',
    status: 'On Time' as LoanStatus,
    payments: [
      { id: '1', amount: 2000, date: '2023-10-15' },
      { id: '2', amount: 3000, date: '2023-11-15' },
    ]
  };

  const mockGetStatusColor = (status: LoanStatus) => {
    return status === 'On Time' ? 'text-green-600 bg-green-50' : '';
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders the loan details correctly', () => {
    render(
      <LoanDetailsModal
        loan={mockLoan}
        onClose={mockOnClose}
        getStatusColor={mockGetStatusColor}
      />
    );

    // Check if the loan name is displayed
    expect(screen.getByText('Test Loan')).toBeInTheDocument();
    
    // Check if principal amount is displayed correctly
    expect(screen.getByText('UGX 10,000')).toBeInTheDocument();
    
    // Check if interest rate is displayed
    expect(screen.getByText('5%')).toBeInTheDocument();
    
    // Check if due date is displayed
    expect(screen.getByText('2023-12-31')).toBeInTheDocument();
    
    // Check if payment history is shown
    expect(screen.getByText('UGX 2,000')).toBeInTheDocument();
    expect(screen.getByText('UGX 3,000')).toBeInTheDocument();
  });

  it('calls onClose when clicking the close button', () => {
    render(
      <LoanDetailsModal
        loan={mockLoan}
        onClose={mockOnClose}
        getStatusColor={mockGetStatusColor}
      />
    );

    // Find and click the close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking the backdrop', () => {
    render(
      <LoanDetailsModal
        loan={mockLoan}
        onClose={mockOnClose}
        getStatusColor={mockGetStatusColor}
      />
    );

    // Find and click the backdrop
    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);
    
    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calculates and displays payment totals correctly', () => {
    render(
      <LoanDetailsModal
        loan={mockLoan}
        onClose={mockOnClose}
        getStatusColor={mockGetStatusColor}
      />
    );
    
    // Total paid should be 5000 (2000 + 3000)
    expect(screen.getByText('UGX 5,000')).toBeInTheDocument();
    
    // Total due should be 10500 (10000 + 5%)
    expect(screen.getByText('UGX 10,500')).toBeInTheDocument();
    
    // Remaining amount should be 5500 (10500 - 5000)
    const remainingAmount = screen.getByText('UGX 5,500');
    expect(remainingAmount).toBeInTheDocument();
    expect(remainingAmount).toHaveClass('text-red-600');
  });
});
