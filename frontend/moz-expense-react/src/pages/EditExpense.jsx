import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EditExpense() {

    const apiURL = import.meta.env.VITE_DJANGO_API_URL || "http://127.0.0.1:8000"

    const { id } = useParams();
    const navigate = useNavigate();
    const [salaryPeriods, setSalaryPeriods] = useState([]);
    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        category: "",
        salary_period: "",
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

        const formattedExpense = {
            ...expense,
            amount: parseFloat(expense.amount),
            salary_period: parseInt(expense.salary_period)
        };

        fetch(`${apiURL}/api/expenses/${id}/`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(expense)
        })
            .then(() => navigate(`/expenses/${id}`))
    }

    useEffect(() => {

        fetch(`${apiURL}/api/salary-periods/`)
            .then(res => res.json())
            .then(data => setSalaryPeriods(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h1>Update Expense</h1>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Title" value={expense.title} onChange={handleChange} />
                <input name="amount" placeholder="Amount" value={expense.amount} onChange={handleChange} />
                <input name="month" placeholder="Month" value={expense.month} onChange={handleChange} />
                <input name="year" placeholder="Year" value={expense.year} onChange={handleChange} />
                <select name="category" value={expense.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option value="FOOD">Food</option>
                    <option value="TRANSPORT">Transport</option>
                    <option value="ENTERTAINMENT">Entertainment</option>
                    <option value="BILLS">Bills</option>
                    <option value="FUN">Fun</option>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="SAVINGS/INVESTMENTS">Savings/Investments</option>
                    <option value="OTHER">Other</option>
                </select>
                <select name="salary_period" value={expense.salary_period} onChange={handleChange}>
                    <option value="">Select Salary Period</option>

                    {salaryPeriods.map(period => (
                        <option key={period.id} value={period.id}>
                            {period.total_salary} ({period.month}/{period.year})
                        </option>
                    ))}
                </select>
                <button type="submit" className="btn">
                    Update </button>
            </form>
        </div>
    );
}

export default EditExpense;