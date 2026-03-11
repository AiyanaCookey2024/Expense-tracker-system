import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BudgetDetails() {

    const apiURL = import.meta.env.VITE_DJANGO_API_URL || "http://127.0.0.1:8000/api";

    const { id } = useParams();
    const [budgets, setBudgets] = useState(null);

    useEffect(() => {
        fetch(`${apiURL}/api/budgets/${id}/`)
            .then(res => res.json())
            .then(data => setBudgets(data));
    }, [id]);

    if (!budgets) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>{budgets.name}</h1>

            <p>Name: {budgets.name}</p>
            <p>Total Amount: £{budgets.total_amount}</p>
            <p>Month: {budgets.month}</p>
            <p>Year: {budgets.year}</p>
        </div>
    );
}

export default BudgetDetails;