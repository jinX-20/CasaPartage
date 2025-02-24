"use client";
import { useState } from "react";
import ExpenseModal from "../components/ExpenseModal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">

    <ExpenseModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

