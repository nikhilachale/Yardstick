
// ExpenseChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ExpenseChart({ transactions }) {
  const monthlyTotals = transactions.reduce((acc, tx) => {
    const month = tx.date.slice(0, 7);
    acc[month] = (acc[month] || 0) + tx.amount;
    return acc;
  }, {});

  const data = Object.entries(monthlyTotals).map(([month, total]) => ({ month, total }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
