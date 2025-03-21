import React, { useMemo } from 'react';
import { Loan } from '../models/Loan';
import { useTranslation } from '../i18n/useTranslation';

interface LoanDetailsModalProps {
  loan: Loan;
  onClose: () => void;
  getStatusColor: (status: Loan['status']) => string;
}

const LoanDetailsModal: React.FC<LoanDetailsModalProps> = ({ loan, onClose, getStatusColor }) => {
  const { t } = useTranslation();

  const paymentCalculations = useMemo(() => {
    const totalPaid = loan.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalDue = loan.principal * (1 + loan.interestRate / 100);
    const remainingAmount = Math.max(0, totalDue - totalPaid);
    
    return { totalPaid, totalDue, remainingAmount };
  }, [loan.payments, loan.principal, loan.interestRate]);
  
  const { totalPaid, totalDue, remainingAmount } = paymentCalculations;

  // Handle ESC key press to close modal
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 overflow-y-auto z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        ></div>

        <div 
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
          role="document"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 
                    id="modal-title" 
                    className="text-2xl leading-6 font-bold text-gray-900">
                    {loan.name}
                  </h3>
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="text-gray-400 hover:text-gray-500 bg-transparent">
                    <span className="inline-flex items-center justify-center text-xl font-medium">✕</span>
                  </button>
                </div>

                <div className="mt-4 space-y-6">
                  {/* Loan Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3">{t('loanDashboard.loanDetails.title')}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{t('loanDashboard.loanDetails.principal')}</p>
                        <p className="text-base font-medium">UGX {loan.principal.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('loanDashboard.loanDetails.interestRate')}</p>
                        <p className="text-base font-medium">{loan.interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('loanDashboard.loanDetails.dueDate')}</p>
                        <p className="text-base font-medium">{loan.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('loanDashboard.loanDetails.status')}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(loan.status)}`}>
                          {loan.status}
                        </span>
                      </div>
                    </div>
                    {loan.description && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-500">{t('loanDashboard.loanDetails.description')}</p>
                        <p className="text-base">{loan.description}</p>
                      </div>
                    )}
                    
                    {/* Payment Totals - New Section */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="font-medium mb-2">{t('loanDashboard.loanDetails.paymentSummary')}</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">{t('loanDashboard.loanDetails.totalDue')}</p>
                          <p className="text-base font-medium">UGX {totalDue.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('loanDashboard.loanDetails.totalPaid')}</p>
                          <p className="text-base font-medium">UGX {totalPaid.toLocaleString()}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">{t('loanDashboard.loanDetails.remainingAmount')}</p>
                          <p className={`text-base font-medium ${remainingAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            UGX {remainingAmount.toLocaleString(undefined, {maximumFractionDigits: 2})}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment History */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">{t('loanDashboard.loanDetails.paymentHistory')}</h4>
                    {loan.payments && loan.payments.length > 0 ? (
                      <div className="space-y-3">
                        {loan.payments.map((payment) => (
                          <div 
                            key={payment.id}
                            className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="bg-indigo-50 p-2 rounded-full">
                                <span className="block h-5 w-5 text-indigo-600">💳</span>
                              </div>
                              <div>
                                <p className="font-medium">UGX {payment.amount.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">{payment.date}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">{t('loanDashboard.loanDetails.noPayments')}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsModal;
