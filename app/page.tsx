'use client';
import { useEffect, useState } from 'react';
import {
  fetchTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
} from '@/lib/api';

import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import ExpenseChart from '@/components/ExpenseChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import DashboardSummary from '@/components/DashboardSummary';
import BudgetChart from '@/components/BudgetChart';
import BudgetInsights from '@/components/BudgetInsights';

const defaultBudgets = {
  Food: 5000,
  Transport: 3000,
  Shopping: 4000,
  Bills: 3500,
  Other: 2000,
};

  interface Transaction {
    _id: string;  // MongoDB ID field
    description: string;
    amount: number;
    category: string;
    date: string;
  }


export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [budgets, setBudgets] = useState(defaultBudgets);

  useEffect(() => {
    const load = async () => {
      const res = await fetchTransactions();
      setTransactions(res.data);
    };
    load();
  }, []);

  const handleAddOrEdit = async (tx: Omit<Transaction, 'id'>) => {
    if (editing) {
      console.log(`Updating transaction with ID: ${editing._id}`, tx);
      const res = await updateTransaction(editing._id, tx);
      setTransactions((prev) =>
        prev.map((t) => (t._id === editing._id ? res.data : t))
      );
      setEditing(null);
    } else {
      console.log('Adding new transaction:', tx);
      const res = await addTransaction(tx);
      setTransactions((prev) => [res.data, ...prev]);
    }
  };

  const handleEdit = (tx: Transaction) => setEditing(tx);

  const handleDelete = async (id: string) => {
    try {
      console.log('Deleting transaction with ID:', id);
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Personal Finance Visualizer</h1>

      <TransactionForm onSubmit={handleAddOrEdit} initialData={editing || undefined} />

      <DashboardSummary transactions={transactions} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExpenseChart transactions={transactions} />
        <CategoryPieChart transactions={transactions} />
      </div>

      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BudgetChart transactions={transactions} budgets={budgets} />
      <BudgetInsights transactions={transactions} budgets={budgets} />
    </main>
  );
}