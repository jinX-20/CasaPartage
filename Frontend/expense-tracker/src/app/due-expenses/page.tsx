"use client";
import { useState, useEffect } from "react";

import DueExpenseCard from "../components/DueExpenseCard";

export default function DueExpenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userDues, setUserDues] = useState<any[]>([]);

  const fetchDueExpenses = async () => {
    try {
      const userr = 'ham';
      const response = await fetch(`/api/expenses?user=${userr}`);

      if (!response.ok) {
        console.error("Failed to fetch expenses with status:", response.status);
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();

      // console.log(data);

      if (data.length === 0) {
        console.log("No expenses found.");
      }

      if (data && Array.isArray(data.expenses)) {
        setExpenses(data.expenses);
        calculateUserDues(data.expenses, userr);
        // console.log(data.expenses);
        // console.log(userDues);
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

  const calculateUserDues = (expenses: any[], userr: String) => {
    const dues: any = {};

    expenses.forEach((expense) => {
      // Check if the user is a participant of the expense
      const userSplit = expense.splitDetails.find(
        (split: any) => split.name === userr
      );

      if (userSplit) {
        const paidBy = expense.paidBy;
        if (!dues[paidBy]) {
          dues[paidBy] = {
            name: paidBy,
            amount: 0,
            expenses: [],
          };
        }

        // Add to the total due amount for that paidBy
        dues[paidBy].amount += userSplit.amount;

        // Add the expense details
        dues[paidBy].expenses.push({
          description: expense.description,
          total: expense.totalAmount,
          youramount: userSplit.amount,
          others: expense.splitDetails
            .filter((split: any) => split.name !== userr)
            .map((split: any) => split.name)
            .join(", "),
          date: expense.date,
        });
      }
    });
    
    setUserDues(Object.values(dues));
  };

  useEffect(() => {
    fetchDueExpenses();
  }, []);

  if (loading) {
    return <div className="text-black">Loading...</div>;
  }
  

  return (
    <div className="p-6 bg-white">
      <div className="mt-6 space-y-6">
        {userDues.length > 0 ? (
          userDues.map((due: any, index) => (
            <DueExpenseCard key={index} {...due} />
          ))
        ) : (
          <div className="text-2xl text-black">
            No more due expenses!
          </div>
        )}
      </div>
    </div>
  );
}
