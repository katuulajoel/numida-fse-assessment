export type LoanStatus = 'On Time' | 'Late' | 'Defaulted' | 'Unpaid';

export interface Payment {
  id: string;
  amount: number;
  date: string;
}

export interface Loan {
  id: string;
  name: string;
  principal: number;
  interestRate: number;
  dueDate: string;
  paymentDate?: string;
  status: LoanStatus;
  description?: string;
  payments: Payment[];
}

// API response interfaces
export interface ApiPayment {
  id: number;
  paymentDate: string;
  amount: number;
}

export interface ApiLoan {
  id: number;
  name: string;
  interest_rate: number;
  principal: number;
  due_date: string;
  payments: ApiPayment[];
}
