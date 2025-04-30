
// TransactionItem.jsx
export default function TransactionItem({ transaction, onEdit, onDelete }) {
    return (
      <div className="flex justify-between items-center p-2 border rounded-md">
        <div>
          <p className="font-medium">₹{transaction.amount}</p>
          <p className="text-sm text-gray-500">{transaction.description} ({transaction.category})</p>
          <p className="text-xs text-gray-400">{transaction.date}</p>
          <p className="text-xs text-gray-400">{transaction._id}</p>
        </div>
        <div className="space-x-2">
          <button onClick={() => onEdit(transaction)} className="text-blue-500">Edit</button>
          <button onClick={() => onDelete(transaction._id)} className="text-red-500">Delete</button>
        </div>
      </div>
    );
  }
  