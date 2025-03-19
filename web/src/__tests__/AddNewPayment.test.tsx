import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddNewPayment from '../components/AddNewPayment';
import '@testing-library/jest-dom';
import React from 'react';

// Mock fetch
global.fetch = jest.fn();

describe('AddNewPayment Component', () => {
  const mockRefetchLoans = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(
      <AddNewPayment
        formData={{ loanId: '', paymentAmount: '' }}
        setFormData={jest.fn()}
        refetchLoans={mockRefetchLoans}
      />
    );

    expect(screen.getByText('Add New Payment')).toBeInTheDocument();
    expect(screen.getByLabelText(/Loan ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Payment Amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Payment/i })).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    // Use React.useState to track form data properly
    const TestComponent = () => {
      const [formData, setFormData] = React.useState({ loanId: '', paymentAmount: '' });
      return (
        <AddNewPayment
          formData={formData}
          setFormData={setFormData}
          refetchLoans={mockRefetchLoans}
        />
      );
    };
    
    render(<TestComponent />);

    // Click submit with empty form
    fireEvent.click(screen.getByRole('button', { name: /Add Payment/i }));
    
    // Check for first validation error
    await waitFor(() => {
      expect(screen.getByText(/Loan ID is required/i)).toBeInTheDocument();
    });

    // Now update the Loan ID field
    fireEvent.change(screen.getByLabelText(/Loan ID/i), { target: { value: '1' } });
    
    // Submit the form again - now with Loan ID but no payment amount
    fireEvent.click(screen.getByRole('button', { name: /Add Payment/i }));
    
    // Check for the payment amount validation error
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid payment amount/i)).toBeInTheDocument();
    });
  });

  it('submits the form successfully', async () => {
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, payment: { id: 1 } })
    });

    render(
      <AddNewPayment
        formData={{ loanId: '1', paymentAmount: '100' }}
        setFormData={jest.fn()}
        refetchLoans={mockRefetchLoans}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Add Payment/i }));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: expect.any(String),
        })
      );
      expect(mockRefetchLoans).toHaveBeenCalledTimes(1);
    });
  });
});