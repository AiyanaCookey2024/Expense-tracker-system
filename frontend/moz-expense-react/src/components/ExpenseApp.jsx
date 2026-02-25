import { useEffect, useState } from "react";
import { getExpenses } from "../services/api";

function ExpenseApp() {
  const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const response = await getExpenses();
        setExpenses(response.data);
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
            {expenses.map(exp => (
                <div key={exp.id}>
                    {exp.title} - ${exp.amount}
                </div>
            ))}
        </div>
    );
}

export default ExpenseApp;