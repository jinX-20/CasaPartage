"use client";
import { useState, useEffect } from "react";

interface ExpenseModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function ExpenseModal({ isOpen, setIsOpen }: ExpenseModalProps) {
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setIsOpen]);

  if (!isOpen) return null; // Don't render if not open

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expenseData = {
      description,
      totalAmount: parseFloat(totalAmount),
      participants: participants.split(","),
      date,
      splitDetails: [] // Add logic here for split details if needed
    };

    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Expense added successfully!");
        setIsOpen(false); // Close modal after successful submission
      } else {
        alert(result.error || "Failed to add expense.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => setIsOpen(false)} // Close on background click
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black">Add New Expense</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Modal Form */}
        <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Expense Description*"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-md focus:ring-2 focus:ring-[#BC8D0B] outline-none text-black"
          />
          <input
            type="text"
            placeholder="Participants* (comma separated)"
            required
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="border p-2 rounded-md focus:ring-2 focus:ring-[#BC8D0B] outline-none text-black"
          />
          <input
            type="number"
            placeholder="Amount*"
            required
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="border p-2 rounded-md focus:ring-2 focus:ring-[#BC8D0B] outline-none text-black"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded-md focus:ring-2 focus:ring-[#BC8D0B] outline-none text-gray-400"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#BC8D0B] text-white py-2 rounded-lg hover:bg-[#8E6B09] transition"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}
