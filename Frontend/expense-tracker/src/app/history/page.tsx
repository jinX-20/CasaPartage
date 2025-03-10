"use client";
import { useState, useEffect } from "react";

export default function ExpenseHistory() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpensesHistory = async () => {
    try {
      const response = await fetch("/api/expenses");

      if (!response.ok) {
        console.error("Failed to fetch expenses history with status:", response.status);
        throw new Error("Failed to fetch expenses history");
      }

      const data = await response.json();

      if (data.length === 0) {
        console.log("No expense history found.");
      }

      if (data && Array.isArray(data.expenses)) {
        setExpenses(data.expenses);
      } else {
        console.error("Fetched data does not contain an array of expenses:", data);
        setExpenses([]);
      }
    } catch (error) {
      console.error("Error fetching expenses history:", error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpensesHistory();
  }, []);

  if (loading) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-semibold">Expense History</h1>
      {expenses.length === 0 ? (
        <p>No expense history to display.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {expenses.map((expense: any) => (
            <div key={expense._id} className="bg-white p-4 rounded-md shadow-md">
              <h2 className="font-bold">{expense.description}</h2>
              <p>Amount: {expense.totalAmount}</p>
              <p>Date: {expense.date ? new Date(expense.date).toLocaleDateString() : "-"}</p>
              <p>Paid By: {expense.paidBy}</p>
              <p>
                Participants:{" "}
                {expense.participants.map((participant: any, idx: number) => (
                  <span key={idx}>{participant.name} ({participant.status}){idx !== expense.participants.length - 1 ? ", " : ""}</span>
                ))}
              </p>
              {expense.splitDetails?.length > 0 && (
                <div className="mt-2">
                  <h3>Split Details:</h3>
                  <ul>
                    {expense.splitDetails.map((detail: any, idx: number) => (
                      <li key={idx}>
                        {detail.name}: {detail.amount}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
