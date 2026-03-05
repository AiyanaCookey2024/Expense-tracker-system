import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateExpense() {

    const apiURL = import.meta.env.VITE_DJANGO_API_URL || "http://127.0.0.1:8000";

    const navigate = useNavigate();

    const [expense, setExpense] = useState({
        category: '',
        title: '',
        amount: '',
        month: '',
        year: ''
    });

    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${apiURL}/api/expenses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        })
            .then(() => navigate("/"))
}

    return (
        <div>
            <h1>Create Expense</h1>
            <form onSubmit={handleSubmit}>
                <input name="category" placeholder="Category" value={expense.category} onChange={handleChange} />
                <input name="title" placeholder="Title" value={expense.title} onChange={handleChange} />
                <input name="amount" placeholder="Amount" value={expense.amount} onChange={handleChange} />
                <input name="month" placeholder="Month" value={expense.month} onChange={handleChange} />
                <input name="year" placeholder="Year" value={expense.year} onChange={handleChange} />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateExpense;