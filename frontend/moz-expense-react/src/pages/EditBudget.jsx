import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EditBudget() {


    const { id } = useParams();
    const navigate = useNavigate();
    const [expense, setBudget] = useState({
        name: "",
        total_amount: "",
        month: "",
        year: ""
    });

    useEffect(() => {
        fetch(`${apiURL}/api/budgets/${id}/`)
          .then(res => res.json())
          .then(data => setBudget(data))
    }, [id])
    
    const handleChange = (e) => {
        setBudget({
            ...budget,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${apiURL}/api/budgets/${id}/`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(expense)
        })
            .then(() => navigate(`/budgets/${id}`))
    }

    return (
        <div>
            <h1>Edit Budget</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={budget.name} onChange={handleChange} />
                <input name="total amount" placeholder="Total Amount" value={budget.total_amount} onChange={handleChange} />
                <input name="month" placeholder="Month" value={budget.month} onChange={handleChange} />
                <input name="year" placeholder="Year" value={budget.year} onChange={handleChange} />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default EditBudget;