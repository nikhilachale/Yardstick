
// BudgetChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function BudgetChart({ transactions, budgets }) {
  const categoryActuals = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const data = Object.entries(budgets).map(([category, budget]) => ({
    category,
    budget,
    spent: categoryActuals[category] || 0
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="budget" fill="#ccc" name="Budget" />
          <Bar dataKey="spent" fill="#3b82f6" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
