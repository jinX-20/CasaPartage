"use client";
import { useState } from "react";

interface participant {
  name: string;
  status: string;
  userId: string;
}

interface split {
  name: string;
  userId: string;
  amount: number;
}

interface ExpenseProp {
  description: string;
  totalAmount: number;
  splitDetails: split[];
  participants: participant[];
  paidBy: string;
  date: Date;
  id: string;
}

const ExpenseCard: React.FC<ExpenseProp> = ({ description, totalAmount, paidBy, date, splitDetails, participants }) => {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="bg-[#EAE3CF] shadow-lg rounded-lg p-4 border border-gray-300">
      {/* Summary Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-black">{description}</h2>
        <button onClick={() => setShowDetails(!showDetails)} className="text-sm text-[#837C7C] hover:underline">
          {showDetails ? "Hide Details" : "View Details"}
        </button>
      </div>

      {/* Expense Details (Collapsible) */}
      {showDetails && (
        <div className="bg-[#EFEDEA] text-black p-3 mt-2 rounded-md text-sm">
          <div className="mb-3">
            <p><strong>Total Amount:</strong> Rs.{totalAmount}/-</p>
            <p><strong>Split Details:</strong>
              <ul className="text-sm space-y-0.3">
                {splitDetails.map((detail: any, idx: number) => {
                  const participant = participants.find((p: any) => p.userId === detail.userId);
                  return (
                    <li key={idx}>
                      • {detail.name}: Rs.{detail.amount}/- ({participant ? participant.status : "-"})
                    </li>
                  );
                })}
              </ul>
            </p>
            <p><strong>PaidBy:</strong> {paidBy}</p>
            <p><strong>Date:</strong> {date ? new Date (date).toLocaleDateString() : '-'}</p>

            <hr className="border-gray-300 my-2" />
          </div>
          <button className="text-xs text-red-600 mt-2 hover:underline">Report discrepancy</button>
        </div>
      )}
    </div>
  );
};

export default ExpenseCard;