import { useState } from "react";

function BudgetForm(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.name);
    const [newAmount, setNewAmount] = useState(props.amount);
    const [newMonth, setNewMonth] = useState(props.month);
    const [newYear, setNewYear] = useState(props.year);

    function handleSubmit(e) {
        e.preventDefault();

        props.editBudgetForm(props.id, {
            name: newName, 
            total_amount: parseFloat(newAmount), 
            month: parseInt(newMonth), 
            yaer: parseInt(newYear)
        });

        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor={`name-${props.id}`}>Name</label>
                <input
                    id={`name-${props.id}`}
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />

                <label>Total Amount</label>
                <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                />

                <label>Month</label>
                <input
                    type="number"
                    value={newMonth}
                    onChange={(e) => setNewMonth(e.target.value)}
                />

                <label>Year</label>
                <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                />
            </div>

            <div className="btn-group">
                <button type="button" onClick={() => setEditing(false)}>
                   Cancel
                </button>
                <button type="submit">
                    Save
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div>
                <strong>{props.name}</strong> - £{props.total_amount} ({props.month}/{props.year})
            </div>
            <div className="btn-group">
                <button type="button" onClick={() => setEditing(true)}>
                    Edit
                </button>
                <button type="button" onClick={() => props.deleteBudget(props.id)}>
                    Delete
                </button>
            </div>
        </div>
    );

    return (
        <li className="budget">
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}

export default BudgetForm;