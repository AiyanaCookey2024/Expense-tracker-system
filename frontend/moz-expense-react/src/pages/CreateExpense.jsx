import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateExpense() {

    const apiURL = import.meta.env.VITE_DJANGO_API_URL || "http://127.0.0.1:8000";

    const navigate = useNavigate();

    const [salaryPeriods, setSalaryPeriods] = useState([]);

    const [expense, setExpense] = useState({
        category: '',
        title: '',
        amount: '',
        month: '',
        year: '',
        salary_period: ''
    });

    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("access_token");
        if (!token) return;

        const formattedExpense = {
            ...expense,
            amount: parseFloat(expense.amount),
            month: parseInt(expense.month),
            year: parseInt(expense.year),
            salary_period: parseInt(expense.salary_period),
        };

        fetch(`${apiURL}/api/expenses/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formattedExpense),
        })
            .then(res => {
            if (!res.ok) {
                throw new Error("Failed to create expense");
            }
            return res.json();
            })
            .then(() => {
            navigate("/");
            })
            .catch(err => console.error(err));
        };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        fetch(`${apiURL}/api/salary-periods/`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch salary periods");
            }
            return res.json();
            })
            .then(data => setSalaryPeriods(data))
            .catch(err => console.error(err));
    }, [apiURL]);


    return (
        <div className="container">
            <h1>Create Expense</h1>
            <form onSubmit={handleSubmit}>
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
                <input name="title" placeholder="Title" value={expense.title} onChange={handleChange} />
                <input type="number" name="amount" placeholder="Amount" value={expense.amount} onChange={handleChange} />
                <input type="number" name="month" placeholder="Month" value={expense.month} onChange={handleChange} />
                <input type="number" name="year" placeholder="Year" value={expense.year} onChange={handleChange} />
                <select name="salary_period" value={expense.salary_period} onChange={handleChange}>
                    <option value="">Select Salary Period</option>

                    {salaryPeriods.map(period => (
                        <option key={period.id} value={period.id}>
                            {period.total_salary} ({period.month}/{period.year})
                        </option>
                    ))}
                </select>
                <button type="submit" className="btn">
                    Create</button>
            </form>
        </div>
    );
}

export default CreateExpense;