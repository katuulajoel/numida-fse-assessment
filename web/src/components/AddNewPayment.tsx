import React, { useState } from 'react'
import { useTranslation } from '../i18n/useTranslation'

interface AddNewPaymentProps {
  formData: { loanId: string; paymentAmount: string }
  setFormData: React.Dispatch<React.SetStateAction<{ loanId: string; paymentAmount: string }>>
  refetchLoans: () => void
}

const AddNewPayment: React.FC<AddNewPaymentProps> = ({ formData, setFormData, refetchLoans }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    setSuccess(null);
    
    // Form validation
    if (!formData.loanId.trim()) {
      setError(t('loanDashboard.paymentForm.errors.loanIdRequired'));
      return;
    }
    
    if (!formData.paymentAmount.trim() || parseFloat(formData.paymentAmount) <= 0) {
      setError(t('loanDashboard.paymentForm.errors.invalidAmount'));
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:2024/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loanId: formData.loanId,
          paymentAmount: formData.paymentAmount,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || t('loanDashboard.paymentForm.errors.genericError'));
      }
      
      // Success handling
      setSuccess(t('loanDashboard.paymentForm.success', { 
        currency: t('loanDashboard.paymentForm.currency'), 
        amount: formData.paymentAmount 
      }));
      setFormData({ loanId: '', paymentAmount: '' });
      
      // Refresh loan data
      refetchLoans();
      
    } catch (err: any) {
      setError(err.message || t('loanDashboard.paymentForm.errors.genericError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm sticky top-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{t('loanDashboard.paymentForm.title')}</h2>
      </div>
      
      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <form onSubmit={submitPayment} className="px-6 py-4 space-y-6">
        <div>
          <label htmlFor="loanId" className="block text-sm font-medium text-gray-700">
            {t('loanDashboard.paymentForm.fields.loanId')}
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="loanId"
              value={formData.loanId}
              onChange={(e) => setFormData({ ...formData, loanId: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder={t('loanDashboard.paymentForm.fields.loanIdPlaceholder')}
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">
            {t('loanDashboard.paymentForm.fields.amount')}
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">{t('loanDashboard.paymentForm.currency')}</span>
            </div>
            <input
              type="number"
              id="paymentAmount"
              value={formData.paymentAmount}
              onChange={(e) => setFormData({ ...formData, paymentAmount: e.target.value })}
              className="w-full p-2 pl-12 border rounded"
              placeholder={t('loanDashboard.paymentForm.fields.amountPlaceholder')}
              min="0"
              step="0.01"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('loanDashboard.paymentForm.processing')}
              </>
            ) : t('loanDashboard.paymentForm.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNewPayment
