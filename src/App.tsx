import React, { useState, useEffect } from "react";
import type { Transaction } from "./types";
import { PlusCircle, Wallet } from "lucide-react";
import "./App.css";
import { Summary } from "./components/Summary";
import { TransactionList } from "./components/TransactionList";

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

  const addTransaction = (e: React.MouseEvent, type: "Income" | "Expense") => {
    e.preventDefault();
    // validation logic
    if (description.trim() === "") {
      alert("Please enter a description for the transaction.");
      return;
    }
    if (amount <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }
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
    .reduce((acc, curr) => acc + curr.amount, 0);

  const deleteTransaction = (id: string) => {
    const updatedTransactions = transaction.filter((t) => t.id !== id);
    setTransaction(updatedTransactions);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>
        <Wallet size={45} /> Finance Tracker
      </h1>
      <Summary
        income={totalIncome}
        balance={totalBalance}
        expenses={totalExpense}
      />
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
      <TransactionList
        transactions={transaction}
        onDelete={deleteTransaction}
      />
    </div>
  );
};

export default App;
