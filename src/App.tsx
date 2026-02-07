import React, { useState, useEffect } from "react";
import type { Transaction } from "./types";
import { PlusCircle, Wallet } from "lucide-react";
import "./App.css";

const App: React.FC = () => {
  const [transaction, setTransaction] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("my_transactions");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("my_transactions", JSON.stringify(transaction));
  }, [transaction]);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const addTransaction = (e: React.FormEvent, type: "Income" | "Expense") => {
    e.preventDefault();
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      description: description,
      category: type,
      amount: type === "Expense" ? -Math.abs(amount) : Math.abs(amount),
      date: new Date().toLocaleDateString(),
    };
    setTransaction([...transaction, newTransaction]);
    setAmount(0);
    setDescription("");
  };
  const totalBalance = transaction.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = transaction
    .filter((t) => t.category === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transaction
    .filter((t) => t.category === "Expense")
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>
        <Wallet /> Finance Tracker
      </h1>
      <div className="balance-card">
        <h2>Current Balance: ₹{totalBalance.toFixed(2)}</h2>
      </div>
      <div className="balance-card">
        <h5 children={`Total Income: ₹${totalIncome.toFixed(2)}`} />
        <h5 children={`Total Expenditure: ₹${totalExpense.toFixed(2)}`} />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
            alignItems: "center",
          }}
        >
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
            alignItems: "center",
          }}
        >
          <button
            className="button-btn income-button"
            onClick={(e) => addTransaction(e, "Income")}
          >
            <div className="button-content">
              <PlusCircle />
              <p>Add Income</p>
            </div>
          </button>
          <button
            className="button-btn expense-button"
            onClick={(e) => addTransaction(e, "Expense")}
          >
            <div className="button-content">
              <PlusCircle />
              <p>Add Expense</p>
            </div>
          </button>
        </div>
      </form>
      <ul className="transactions-list">
        {transaction.map((t) => (
          <li
            key={t.id}
            className={`transaction-item ${t.category === "Income" ? "income" : "expense"}`}
          >
            {t.description}: ₹{Math.abs(t.amount).toFixed(2)} ({t.date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
