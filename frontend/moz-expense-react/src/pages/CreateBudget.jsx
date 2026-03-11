import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateBudget() {
    const apiURL = import.meta.env.VITE_DJANGO_API_URL || "http://127.0.0.1:8000/api";

    const navigate = useNavigate();

    const [budget, setBudget] = useState({
        name: '',
        total_amount: '',
        month: '',
        year: ''
    });

    const handleChange = (e) => {
        setBudget({
            ...budget,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${apiURL}/api/budgets/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(budget)
        })
            .then(() => navigate("/"))
}

    return (
        <div className="container">
            <h1>Create Budget</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={budget.name} onChange={handleChange} />
                <input name="total_amount" placeholder="Total Amount" value={budget.total_amount} onChange={handleChange} />
                <input name="month" placeholder="Month" value={budget.month} onChange={handleChange} />
                <input name="year" placeholder="Year" value={budget.year} onChange={handleChange} />
                <button type="submit" className="btn">
                    Create</button>
            </form>
        </div>
    );
}

export default CreateBudget;