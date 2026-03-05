import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EditExpense() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [expense, setExpense] = useState({
        category: "",
        title: "",
        amount: "",
        month: "",
        year: ""
    });

    useEffect(() => {
        fetch(`${apiURL}/api/expenses/${id}/`)
          .then(res => res.json())
          .then(data => setExpense(data))
    }, [id])
    
    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${apiURL}/api/expenses/${id}/`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(expense)
        })
            .then(() => navigate(`/expenses/${id}`))
    }

    return (
        <div>
            <h1>Update Expense</h1>
            <form onSubmit={handleSubmit}>
                <input name="category" placeholder="Category" value={expense.category} onChange={handleChange} />
                <input name="title" placeholder="Title" value={expense.title} onChange={handleChange} />
                <input name="amount" placeholder="Amount" value={expense.amount} onChange={handleChange} />
                <input name="month" placeholder="Month" value={expense.month} onChange={handleChange} />
                <input name="year" placeholder="Year" value={expense.year} onChange={handleChange} />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditExpense;