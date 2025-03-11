"use client";
import { useState, useEffect } from "react";
import DueExpenseCard from "../components/DueExpenseCard";

const userr = 'ham';

export default function DueExpenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userDues, setUserDues] = useState<any[]>([]);


  const fetchDueExpenses = async () => {
    try {
      const response = await fetch(`/api/expenses?user=${userr}`);

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
        calculateUserDues(data.expenses, userr);
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

  const calculateUserDues = (expenses: any[], userr: string) => {
    const dues: any = {};
  
    expenses.forEach((expense) => {
      // Find the user in the participants array with 'pending' status
      const userParticipant = expense.participants.find(
        (participant: any) => participant.name === userr && participant.status === 'pending'
      );
  
      if (userParticipant) {
        const paidBy = expense.paidBy;
  
        // Find the amount for the user in the splitDetails array
        const userSplit = expense.splitDetails.find(
          (split: any) => split.name === userr
        );
  
        if (userSplit) {
          if (!dues[paidBy]) {
            dues[paidBy] = {
              name: paidBy,
              amount: 0,
              expenses: [],
            };
          }
  
          // Add the user's amount from the splitDetails array
          dues[paidBy].amount += userSplit.amount;
  
          dues[paidBy].expenses.push({
            id: expense._id,
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
      }
    });
  
    console.log("Calculated dues (user with 'pending' status):", dues);
    setUserDues(Object.values(dues));
  };
  
  

  const markAllAsPaid = async (expenses: any[], userr: string) => {
    try {
      const expenseIds = expenses.map((expense) => expense.id);

      const response = await fetch("/api/expenses?mark-as-paid=true", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expenseIds, user: userr }),
      });

      const responseText = await response.text(); 

      if (!response.ok) {
        console.error("Failed to mark expenses as paid:", responseText);
        alert("Failed to mark expenses as paid. Response: " + responseText);
        throw new Error('Failed to mark expenses as paid');
      }
      
      const result = JSON.parse(responseText);  // Try to parse the response text manually
      alert(result.message);

      
      fetchDueExpenses();
      console.log("AFTER FETCH");

      // const result = await response.json();

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchDueExpenses();
  }, []);

  useEffect(() => {
    console.log("User dues updated:", userDues);
  }, [userDues]);
  

  if (loading) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white">
      <div className="mt-6 space-y-6">
        {userDues.length > 0 ? (
          userDues.map((due: any, index) => (
            <DueExpenseCard
              key={index}
              {...due}
              userr={userr}
              markAllAsPaid={markAllAsPaid} // Pass the function as prop
            />
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
