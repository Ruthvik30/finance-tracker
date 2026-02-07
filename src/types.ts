export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: 'Income' | 'Expense';
}

export interface BudgetState {
  transactions: Transaction[];
  balance: number;
}