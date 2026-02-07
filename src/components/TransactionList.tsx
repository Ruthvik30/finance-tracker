import type { Transaction } from "../types";
import { Trash2 } from "lucide-react";
import "./TransactionList.css";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
}) => {
  return (
    <div>
      <h3 style={{ textAlign: "left" }}>Transactions</h3>
      <div className="transactions-list">
        {transactions.map((t) => (
          <div
            key={t.id}
            className={`transaction-item ${t.category === "Income" ? "income" : "expense"}`}
          >
            <div className="transaction-description">
              {t.description}: ₹{Math.abs(t.amount).toFixed(2)} ({t.date})
              <button className="btn-trash" onClick={() => onDelete(t.id)}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
