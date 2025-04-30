
// DashboardSummary.jsx
export default function DashboardSummary({ transactions }) {
    const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);
    const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  
    const categoryTotals = transactions.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-xl">
          <h2 className="text-lg font-semibold">Total Expenses</h2>
          <p className="text-2xl">₹{total}</p>
        </div>
        <div className="p-4 border rounded-xl">
          <h2 className="text-lg font-semibold">Category Breakdown</h2>
          <ul className="text-sm">
            {Object.entries(categoryTotals).map(([cat, amt]) => (
              <li key={cat}>{cat}: ₹{amt}</li>
            ))}
          </ul>
        </div>
        <div className="p-4 border rounded-xl">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <ul className="text-sm">
            {recent.map((tx) => (
              <li key={tx.id}>{tx.description} - ₹{tx.amount}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  