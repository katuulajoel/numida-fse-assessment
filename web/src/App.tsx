import './App.css'
import React, { useState } from 'react'
import AddNewPayment from './components/AddNewPayment'
import LoanList from './components/LoanList'
// Import the logo from assets
import numidaLogo from './assets/logo.numida.png'

// Types
type LoanStatus = 'On Time' | 'Late' | 'Defaulted' | 'Unpaid'

interface Loan {
  id: string
  name: string
  principal: number
  interestRate: number
  dueDate: string
  paymentDate?: string
  status: LoanStatus
}

function App() {
  const [loans] = useState<Loan[]>([
    {
      id: '1',
      name: 'Home Loan',
      principal: 250000,
      interestRate: 3.5,
      dueDate: '2021-10-01',
      status: 'On Time',
    },
    {
      id: '2',
      name: 'Auto Loan',
      principal: 35000,
      interestRate: 5.25,
      dueDate: '2021-09-15',
      paymentDate: '2021-09-20',
      status: 'Late',
    },
    {
      id: '3',
      name: 'Personal Loan',
      principal: 15000,
      interestRate: 7.0,
      dueDate: '2021-09-30',
      status: 'Unpaid',
    }
  ])

  const [formData, setFormData] = useState({
    loanId: '',
    paymentAmount: '',
  })

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

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Loan Payment Dashboard</h1>
          <img src={numidaLogo} alt="Numida Logo" className="h-10" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AddNewPayment formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
          </div>
          <div className="lg:col-span-2">
            <LoanList loans={loans} getStatusColor={getStatusColor} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
