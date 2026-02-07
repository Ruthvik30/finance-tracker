import "./Summary.css";

interface SummaryProps {
  income: number;
  balance: number;
  expenses: number;
}

export const Summary: React.FC<SummaryProps> = ({
  income,
  balance,
  expenses,
}) => {
  return (
    <div className="summary-container">
      <div className="summary-card">
        <h3>Income</h3>
        <p className="summary-income">₹{income.toFixed(2)}</p>
      </div>
      <div className="summary-card">
        <h3>Expenses</h3>
        <p className="summary-expenses">₹{Math.abs(expenses).toFixed(2)}</p>
      </div>
      <div className="summary-card">
        <h3>Total Balance</h3>
        <p className="summary-balance">
          <strong>₹{balance.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
};
