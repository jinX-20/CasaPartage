import DueExpenseCard from "../components/DueExpenseCard";

export default function DueExpenses() {
  const dueExpenses = [
    {
      name: "Mr.X",
      amount: 120,
      expenses: [
        { description: "Pani Puri", total: 354, others: "Mrs.X, Mrs.Z", date: "3/2/25" },
        { description: "Cab", total: 254, others: "Mrs.X, Mrs.Z", date: "3/2/25" },
      ],
    },
    {
      name: "Mr.Y",
      amount: 200,
      expenses: [
        { description: "Dinner", total: 500, others: "Mrs.Y, Mr.Z", date: "3/2/25" }
      ],
    },
    {
      name: "Mr.Y",
      amount: 200,
      expenses: [
        { description: "Dinner", total: 500, others: "Mrs.Y, Mr.Z", date: "3/2/25" }
      ],
    },
  ];

  return (
    <div className="p-6 bg-white">
      <div className="mt-6 space-y-6">
        {dueExpenses.map((expense, index) => (
          <DueExpenseCard key={index} {...expense} />
        ))}
      </div>
        <div className="flex justify-center items-center py-10">
        <div className="text-2xl text-black">
          No more due expenses!
        </div>
      </div>

    </div>
  );
}
