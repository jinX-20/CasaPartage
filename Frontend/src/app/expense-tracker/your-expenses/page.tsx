"use client";
import { useState, useEffect } from "react";
import { useUser } from '../../UserContext/UserContextProvider';
import ExpenseCard from "../components/ExpenseCard";

export default function YourExpenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {user, setUser, isLoading} = useUser();
  const userId = user?._id;
  const userName = user?.name;

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`/api/expenses?paidBy=${userId}`);

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
    if (!isLoading) {
      fetchExpenses();
    }
  }, [isLoading, user]);

  if (isLoading || loading) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white">
      <div className="mt-6 space-y-6">
        {expenses.length > 0 ? (
          expenses.map((expense: any, index) => (
            <ExpenseCard
              {...expense}
              paidBy={userName}
            />
          ))
        ) : (
          <div className="p-6 text-black">
            <h1 className="text-2xl font-semibold">Your Expenses</h1>
            <p>No more expenses!</p>
          </div>
        )}
      </div>
    </div>
  )
}
