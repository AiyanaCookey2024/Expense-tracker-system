import { useParams } from "react-router-dom";   
import { useEffect, useState } from "react";

function ExpenseDetails() {
    const apiURL = import.meta.env.VITE_API_URL || "http://http://127.0.0.1:8000/";

    const { id } = useParams();
    const [expense, setExpense] = useState(null);


useEffect(() => {
    fetch(`${apiURL}/api/expenses/${id}/`)
      .then(res => res.json())
      .then(data => setExpense(data))
}, [id])

if (!expense) return <p>Loading...</p>;

return (
    <div>
        <h1>{expense.title}</h1>

        <p>Category: {expense.category}</p>
        <p>Title: {expense.title}</p>
        <p>Amount: £{expense.amount}</p>
        <p>Month: {expense.month}</p>
        <p>Year: {expense.year}</p>
    </div>
  );
}
export default ExpenseDetails;