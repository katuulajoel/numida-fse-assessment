import React from 'react'
import { useTranslation } from '../i18n/useTranslation'
import { Loan } from '../models/Loan'

interface LoanListProps {
  loans: Loan[]
  getStatusColor: (status: Loan['status']) => string
  onLoanSelect: (loan: Loan) => void
}

const LoanList: React.FC<LoanListProps> = ({ loans, getStatusColor, onLoanSelect }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{t('loanDashboard.loanList.title')}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('loanDashboard.loanList.columns.loanId')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('loanDashboard.loanList.columns.loanName')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('loanDashboard.loanList.columns.principal')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('loanDashboard.loanList.columns.interestRate')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('loanDashboard.loanList.columns.dueDate')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('loanDashboard.loanList.columns.paymentDate')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('loanDashboard.loanList.columns.status')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr 
                key={loan.id} 
                onClick={() => onLoanSelect(loan)}
                className="cursor-pointer hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  UGX {loan.principal.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {loan.interestRate}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {loan.paymentDate || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                    {loan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LoanList
