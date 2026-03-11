import { useParams } from "react-router-dom";   
import { useEffect, useState } from "react";

function ExpenseDetails() {
    const apiURL = import.meta.env.VITE_DJANGO_API_URL="https://expense-tracker-system-1l5v.onrender.com"

    const { id } = useParams();
    const [expenses, setExpenses] = useState(null);


useEffect(() => {
    fetch(`${apiURL}/api/expenses/${id}/`)
      .then(res => res.json())
      .then(data => setExpenses(data))
}, [id])

if (!expenses) return <p>Loading...</p>;

return (
    <div className="container">
        <h1>{expenses.title}</h1>

        <p>Category: {expenses.category}</p>
        <p>Title: {expenses.title}</p>
        <p>Amount: £{expenses.amount}</p>
        <p>Month: {expenses.month}</p>
        <p>Year: {expenses.year}</p>
    </div>
  );
}
export default ExpenseDetails;