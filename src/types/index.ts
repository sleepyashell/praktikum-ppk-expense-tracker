// Definisi tipe data dapat ditambahkan di sini oleh tim developer
export interface User {
  id: string;
  name: string;
  email: string;
}

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  userId: string;
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  created_at?: string;
}
