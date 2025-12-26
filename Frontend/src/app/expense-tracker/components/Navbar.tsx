"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ExpenseModal from "./ExpenseModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="flex space-x-4 p-3 rounded-md">
        {[
          { name: "Due Expenses", href: "/expense-tracker/due-expenses" },
          { name: "Your Expenses", href: "/expense-tracker/your-expenses" },
          { name: "History", href: "/expense-tracker/history" },
          { name: "Visualize", href: "/expense-tracker/visualize" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-lg text-[#82583F] font-inter font-semibold ${
              pathname === item.href ? "bg-[#FFFCF2]" : "hover:bg-[#E5C99B]"
            }`}
            >
              {item.name}
            </Link>
        ))}

        {/* Add Expense Button (Opens Modal) */}
        <button
          onClick={() => 
            setIsModalOpen(true)
          }
          className="px-4 py-2 rounded-lg text-[#82583F] font-inter font-semibold hover:bg-[#E5C99B]"
        >
          + Add Expense
        </button>
      </div>

      {/* Expense Modal */}
      <ExpenseModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
}
