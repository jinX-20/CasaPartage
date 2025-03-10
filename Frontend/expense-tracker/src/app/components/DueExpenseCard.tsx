"use client";

import { useState, useEffect } from "react";

interface ExpenseDetail {
  description: string;
  total: number;
  youramount: number;
  others: string;
  date: string;
}

interface DueExpenseProps {
  name: string;
  amount: number;
  expenses: ExpenseDetail[]; 
}

export default function DueExpenseCard({ name, amount, expenses }: DueExpenseProps) {
  const [showDetails, setShowDetails] = useState(true);


  return (
    <div className="bg-[#EAE3CF] shadow-lg rounded-lg p-4 border border-gray-300">
      {/* Summary Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-black">You owe Rs.{amount}/- to {name}</h2>
        <button onClick={() => setShowDetails(!showDetails)} className="text-sm text-[#837C7C] hover:underline">
          {showDetails ? "Hide Details" : "View Details"}
        </button>
      </div>

      {/* Expense Details (Collapsible) */}
      {showDetails && (
        <div className="bg-[#EFEDEA] text-black p-3 mt-2 rounded-md text-sm">
          {expenses.map((expense, index) => (
            <div key={index} className="mb-3">
              <p>• <strong>Description:</strong> {expense.description}</p>
              <p><strong>Your amount:</strong> {expense.youramount}</p>
              <p><strong>Total amount:</strong> {expense.total}</p>
              <p><strong>Others:</strong> {expense.others}</p>
              <p><strong>Date:</strong> {expense.date ? expense.date : '-'}</p>

              <hr className="border-gray-300 my-2" /> 
            </div>
          ))}
          <button className="text-xs text-red-600 mt-2 hover:underline">Report discrepancy</button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-3 flex space-x-4">
        <button className="bg-[#F5D28E] px-4 py-2 rounded text-black font-medium hover:bg-[#b19e77]">Mark as paid!</button>
        <button className="bg-[#F5D28E] px-4 py-2 rounded text-black font-medium hover:bg-[#b19e77]">Pay Now!</button>
      </div>
    </div>
  );
}
