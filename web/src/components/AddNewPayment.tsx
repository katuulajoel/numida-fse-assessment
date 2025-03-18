import React from 'react'

interface AddNewPaymentProps {
  formData: { loanId: string; paymentAmount: string }
  setFormData: React.Dispatch<React.SetStateAction<{ loanId: string; paymentAmount: string }>>
  handleSubmit: (e: React.FormEvent) => void
}

const AddNewPayment: React.FC<AddNewPaymentProps> = ({ formData, setFormData, handleSubmit }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm sticky top-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Add New Payment</h2>
      </div>
      <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
        <div>
          <label htmlFor="loanId" className="block text-sm font-medium text-gray-700">
            Loan ID
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="loanId"
              value={formData.loanId}
              onChange={(e) => setFormData({ ...formData, loanId: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Enter Loan ID"
            />
          </div>
        </div>

        <div>
          <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">
            Payment Amount
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="paymentAmount"
              value={formData.paymentAmount}
              onChange={(e) => setFormData({ ...formData, paymentAmount: e.target.value })}
              className="w-full p-2 pl-7 border rounded"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add Payment
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNewPayment
