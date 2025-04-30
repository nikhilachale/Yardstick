// transactions/route.js (Next.js App Router API Route)
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo';
import Transaction from '@/models/Transaction';

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Adding new transaction:', data); // Log the data being added

    await connectDB();
    const newTx = await Transaction.create(data);

    console.log('Transaction added successfully:', newTx); // Log the created transaction
    return NextResponse.json(newTx);
  } catch (error) {
    console.error('Error adding transaction:', error); // Log any errors
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const data = await req.json();
  await connectDB();
  const updated = await Transaction.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(request, context) {
  try {
    await connectDB();

    const { id } =  await context.params; // ✅ this is the correct way
    console.log('Deleting transaction with ID:', id);

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
