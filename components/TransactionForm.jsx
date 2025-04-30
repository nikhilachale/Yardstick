// TransactionForm.jsx
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const categories = ["Food", "Transport", "Shopping", "Bills", "Other"];

export default function TransactionForm({ onSubmit, initialData = {} }) {
  const [amount, setAmount] = useState(initialData.amount || "");
  const [date, setDate] = useState(initialData.date || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [category, setCategory] = useState(initialData.category || "Other");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) return alert("All fields required");
    onSubmit({ amount: parseFloat(amount), date, description, category });
    setAmount("");
    setDate("");
    setDescription("");
    setCategory("Other");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded-xl">
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">{initialData.id ? "Update" : "Add"} Transaction</Button>
    </form>
  );
}
