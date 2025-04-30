// TransactionList.jsx
import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (!transactions.length) return <p className="text-gray-500">No transactions found.</p>;
  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <TransactionItem key={tx.id} transaction={tx} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
