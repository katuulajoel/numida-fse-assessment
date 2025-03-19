import './App.css'
import React, { useState, useEffect } from 'react'
import AddNewPayment from './components/AddNewPayment'
import LoanList from './components/LoanList'
import LanguageSwitcher from './components/LanguageSwitcher'
// Import the logo from assets
import numidaLogo from './assets/logo.numida.png'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { useTranslation } from './i18n/useTranslation';

// GraphQL client setup
const client = new ApolloClient({
  uri: 'http://localhost:2024/graphql',
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
      }
    }
  }
`;

// Types
type LoanStatus = 'On Time' | 'Late' | 'Defaulted' | 'Unpaid'

interface Payment {
  id: number;
  payment_date: string;
}

interface LoanData {
  id: number;
  name: string;
  interest_rate: number;
  principal: number;
  due_date: string;
  payments: Payment[];
}

interface Loan {
  id: string
  name: string
  principal: number
  interestRate: number
  dueDate: string
  paymentDate?: string
  status: LoanStatus
}

// Function to determine loan status based on due date and payment date
const calculateLoanStatus = (dueDate: string, paymentDate?: string): LoanStatus => {
  if (!paymentDate) return 'Unpaid';
  
  const due = new Date(dueDate);
  const payment = new Date(paymentDate);
  const diffDays = Math.floor((payment.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 5) return 'On Time';
  if (diffDays <= 30) return 'Late';
  return 'Defaulted';
};

// Function to safely format dates
const formatDate = (dateString: string | null | undefined): string | undefined => {
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

function LoanApp() {
  const { t } = useTranslation();
  const { loading, error, data, refetch } = useQuery(GET_LOANS_AND_PAYMENTS);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [formData, setFormData] = useState({
    loanId: '',
    paymentAmount: '',
  });

  useEffect(() => {
    if (data?.loans) {
      const processedLoans: Loan[] = data.loans.map((loan: any) => {
        let paymentDate;
        if (loan.payments && loan.payments.length > 0) {
          paymentDate = loan.payments[0].paymentDate;
        }
        
        const dueDate = loan.dueDate || '';
        
        return {
          id: String(loan.id),
          name: loan.name,
          principal: loan.principal,
          interestRate: loan.interestRate,
          dueDate,
          paymentDate,
          status: calculateLoanStatus(dueDate, paymentDate)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData({ loanId: '', paymentAmount: '' })
  }

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
          Try Again
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
            <img src={numidaLogo} alt="Numida Logo" className="h-10" />
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
            <LoanList loans={loans} getStatusColor={getStatusColor} />
          </div>
        </div>
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
