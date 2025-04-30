
// BudgetInsights.jsx
export default function BudgetInsights({ transactions, budgets }) {
    const categoryActuals = transactions.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});
  
    const overspent = Object.entries(budgets).filter(([cat, limit]) => categoryActuals[cat] > limit);
  
    return (
      <div className="p-4 border rounded-xl">
        <h2 className="text-lg font-semibold">Spending Insights</h2>
        {overspent.length === 0 ? (
          <p className="text-green-600">All spending within limits.</p>
        ) : (
          <ul className="text-red-500 text-sm">
            {overspent.map(([cat, limit]) => (
              <li key={cat}>{cat} exceeded by ₹{categoryActuals[cat] - limit}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  