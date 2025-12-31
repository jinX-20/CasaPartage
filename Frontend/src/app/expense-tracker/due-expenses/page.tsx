"use client";
import { useState, useEffect } from "react";
import DueExpenseCard from "../components/DueExpenseCard";
import { useUser } from '../../UserContext/UserContextProvider';

export default function DueExpenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userDues, setUserDues] = useState<any[]>([]);
  const {user, setUser, isLoading} = useUser();

  const userId = user?._id;

  const fetchUserNameFromUserId = async (userId: String) => {
    try {
      const response = await fetch(`/api/expenses?user=${userId}&getUserNameFromUserId=true`);
      if (!response.ok) {
        throw new Error("Failed to fetch username");
      }
      const data = await response.json();
      return data.userName;
      
    } catch(error) {
      return "undefined";
      console.log(error.message);
    }
  }

  const fetchDueExpenses = async () => {
    try {
      const response = await fetch(`/api/expenses?user=${userId}`);

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
        calculateUserDues(data.expenses, userId);
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

  const calculateUserDues = (expenses: any[], userId: string) => {
    const dues: any = {};
  
    expenses.forEach((expense) => {
      // Find the user in the participants array with 'pending' status
      const userParticipant = expense.participants.find(
        (participant: any) => participant.userId === userId && participant.status === 'pending'
      );
  
      if (userParticipant) {
        const paidBy = expense.paidBy;
  
        // Find the amount for the user in the splitDetails array
        const userSplit = expense.splitDetails.find(
          (split: any) => split.userId === userId
        );
  
        if (userSplit) {
          if (!dues[paidBy]) {
            dues[paidBy] = {
              name: fetchUserNameFromUserId(paidBy),
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
              .filter((split: any) => split.userId !== userId)
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
      
      const result = JSON.parse(responseText); 
      alert(result.message);      
      fetchDueExpenses();

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      fetchDueExpenses();
    }
  }, [isLoading, user]);


  useEffect(() => {
    console.log("User dues updated:", userDues);
  }, [userDues]);
  

  if (isLoading || loading) {
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
              userId={userId}
              markAllAsPaid={markAllAsPaid} // Pass the function as prop
            />
          ))
        ) : (
          <div className="p-6 text-black">
            <h1 className="text-2xl font-semibold">Due Expenses</h1>
            <p>No more due expenses!</p>
          </div>
        )}
      </div>
    </div>
  );
}
