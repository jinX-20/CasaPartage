"use client";

import { useUser } from '../UserContext/page';

export default function ExpenseTrackerPage() {
  const { user, setUser } = useUser();

  return (
    <div>
      <h1>Expense Tracker</h1>
      <p>{user._id}</p>
      <p>{user.email}</p>
      <p>{user.name}</p>
    </div>
  );
}