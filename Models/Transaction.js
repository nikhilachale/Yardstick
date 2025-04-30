// Transaction.js
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: String,
  description: String,
  category: String
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
