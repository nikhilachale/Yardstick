import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo';
import Transaction from '@/models/Transaction';

export async function PUT(request, context) {
  try {
    await connectDB();
    const { id } = context.params;
    const data = await request.json();

    const updated = await Transaction.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    await connectDB();

    const params = await context.params; // Await the params
    const { id } = params; // Destructure the id after awaiting

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