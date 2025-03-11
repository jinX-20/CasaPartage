"use client";
import { useState, useEffect } from "react";

export default function YourExpenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/expenses?paidBy=Newton");

      if (!response.ok) {
        console.error("Failed to fetch expenses with status:", response.status);
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();

      if (data.length === 0) {
        console.log("No expenses found.");
    }

      if (data && Array.isArray(data.expenses)) {
        setExpenses(data.expenses);
      } else {
        console.error("Fetched data does not contain an array of expenses:", data);
        setExpenses([]); 
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setExpenses([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-semibold">Your Expenses</h1>
      {expenses.length === 0 ? (
        <p>No expenses to display.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {expenses.map((expense: any) => (
            <div key={expense._id} className="bg-[#EAE3CF] p-4 rounded-lg shadow-lg border border-gray-300">
              <h2 className="text-lg font-bold">{expense.description}</h2>
              <p>Total Amount: Rs.{expense.totalAmount}/-</p>
              <p>Date: {expense.date ? new Date(expense.date).toLocaleDateString() : "-"}</p>
              <p>Paid By: {expense.paidBy}</p>
              {expense.splitDetails?.length > 0 && (
                <div className="mt-2 bg-[#EFEDEA] p-3 rounded-md">
                  <h3 className="font-medium">Split Details:</h3>
                  <ul className="text-sm space-y-1">
                    {expense.splitDetails.map((detail: any, idx: number) => {
                      const participant = expense.participants.find((p: any) => p.name === detail.name);
                      return (
                        <li key={idx}>
                          {detail.name}: Rs.{detail.amount}/- ({participant ? participant.status : "-"})
                        </li>
                      );
                    })}
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
