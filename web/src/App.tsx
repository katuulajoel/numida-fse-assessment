import './App.css'
import React, { useState, useEffect, useCallback, Suspense } from 'react'
import AddNewPayment from './components/AddNewPayment'
import LoanList from './components/LoanList'
import LanguageSwitcher from './components/LanguageSwitcher'
// Import logo
import numidaLogo from './assets/logo.numida.png'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { useTranslation } from './i18n/useTranslation';
import env from './config/env';
// Import utility functions
import { calculateLoanStatus } from './utils/loanUtils';
// Import models
import { Loan, LoanStatus, ApiLoan, ApiPayment } from './models/Loan';

// Use React.lazy for code splitting
const LoanDetailsModal = React.lazy(() => import('./components/LoanDetailsModal'));

// GraphQL client setup
const client = new ApolloClient({
  uri: env.graphqlUrl,
  cache: new InMemoryCache()
});

// GraphQL query for loans and payments
const GET_LOANS_AND_PAYMENTS = gql`
  query GetLoansAndPayments {
    loans {
      id
      name
      interestRate
      principal
      dueDate
      payments {
        id
        paymentDate
        amount
      }
    }
  }
`;

function LoanApp() {
  const { t } = useTranslation();
  const { loading, error, data, refetch } = useQuery(GET_LOANS_AND_PAYMENTS);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [formData, setFormData] = useState({
    loanId: '',
    paymentAmount: '',
  });

  useEffect(() => {
    if (data?.loans) {
      const processedLoans: Loan[] = data.loans.map((loan: ApiLoan) => {
        let paymentDate;
        if (loan.payments && loan.payments.length > 0) {
          paymentDate = loan.payments[0].paymentDate;
        }
        
        const dueDate = loan.dueDate || '';
        
        // Process payments if they exist
        const payments = loan.payments?.map((payment: ApiPayment) => ({
          id: String(payment.id),
          amount: payment.amount || 0,
          date: payment.paymentDate || '',
        })) || [];
        
        return {
          id: String(loan.id),
          name: loan.name,
          principal: loan.principal,
          interestRate: loan.interestRate,
          dueDate,
          paymentDate,
          status: calculateLoanStatus(
            dueDate, 
            paymentDate, 
            loan.principal, 
            loan.interestRate, 
            payments
          ),
          payments: payments
        };
      });
      setLoans(processedLoans);
    }
  }, [data]);

  const getStatusColor = (status: LoanStatus): string => {
    const colors = {
      'On Time': 'text-green-600 bg-green-50',
      'Late': 'text-orange-600 bg-orange-50',
      'Defaulted': 'text-red-600 bg-red-50',
      'Unpaid': 'text-gray-600 bg-gray-50',
    };
    return colors[status];
  };

  const handleLoanSelect = useCallback((loan: Loan) => {
    setSelectedLoan(loan);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedLoan(null);
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen p-8">
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
        <p className="font-bold">Error</p>
        <p>{error.message}</p>
        <button 
          onClick={() => refetch()} 
          className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded"
        >
          {t('common.tryAgain')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('loanDashboard.title')}</h1>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <img src={numidaLogo} alt="Numida Logo" className="h-10 logo" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AddNewPayment 
              formData={formData} 
              setFormData={setFormData} 
              refetchLoans={refetch}
            />
          </div>
          <div className="lg:col-span-2">
            <LoanList 
              loans={loans} 
              getStatusColor={getStatusColor} 
              onLoanSelect={handleLoanSelect}
            />
          </div>
        </div>

        {selectedLoan && (
          <Suspense fallback={
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          }>
            <LoanDetailsModal
              loan={selectedLoan}
              onClose={handleModalClose}
              getStatusColor={getStatusColor}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <ApolloProvider client={client}>
      <LoanApp />
    </ApolloProvider>
  );
}

export default App
