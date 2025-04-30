'use client';
import { useState } from 'react';

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
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [budgets, setBudgets] = useState(defaultBudgets);

  const handleAddOrEdit = (tx: Omit<Transaction, 'id'>) => {
    if (editing) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === editing.id ? { ...t, ...tx } : t))
      );
      setEditing(null);
    } else {
      setTransactions((prev) => [...prev, { ...tx, id: Date.now().toString() }]);
    }
  };

  const handleEdit = (tx: Transaction) => setEditing(tx);
  const handleDelete = (id: string) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

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