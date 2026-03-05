import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BudgetDetails() {

    const apiURL = import.meta.env.VITE_DJANGO_API_URL || "http://127.0.0.1:8000";

    const { id } = useParams();
    const [budget, setBudget] = useState(null);

    useEffect(() => {
        fetch(`${apiURL}/api/budgets/${id}/`)
            .then(res => res.json())
            .then(data => setBudget(data));
    }, [id]);

    if (!budget) return <p>Loading...</p>;

    return (
        <div>
            <h1>{budget.name}</h1>

            <p>Name: {budget.name}</p>
            <p>Total Amount: £{budget.total_amount}</p>
            <p>Month: {budget.month}</p>
            <p>Year: {budget.year}</p>
        </div>
    );
}

export default BudgetDetails;