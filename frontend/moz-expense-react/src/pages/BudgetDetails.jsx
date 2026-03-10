import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BudgetDetails() {

    const apiURL = import.meta.env.VITE_DJANGO_API_URL="https://expense-tracker-system-1l5v.onrender.com"

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