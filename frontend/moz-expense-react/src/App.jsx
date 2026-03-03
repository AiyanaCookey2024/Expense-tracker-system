import { useEffect, useState } from "react";
import Form from "./components/Form";
import Expense from "./components/Expense";
import Budget from "./components/Budget";
import BudgetForm from "./components/BudgetForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const apiURL = import.meta.env.VITE_DJANGO_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    fetch(`${apiURL}/api/budgets/`)
      .then(res => res.json())
      .then(data => {
        setBudgets(data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${apiURL}/api/expenses/`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(exp => ({
          id: exp.id,
          name: exp.title,
          completed: exp.completed
        }));
        setTasks(mapped);
      })
      .catch(err => console.error(err));
  }, []);

  function addBudget(name, totalAmount, month, year) {
    fetch(`${apiURL}/api/budgets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        total_amount: totalAmount,
        month,
        year
      })
    })
      .then(res => res.json())
      .then(newBudget => {
        setBudgets([
          ...budgets,
          newBudget
        ]);
      });
  }

  function addTask(name) {
    fetch(`${apiURL}/api/expenses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: name,
        amount: 10.00,
        category: "OTHER",
        completed: false
      })
    })
      .then(res => res.json())
      .then(newExp => {
        setTasks([
          ...tasks,
          {
            id: newExp.id,
            name: newExp.title,
            completed: newExp.completed
          }
        ]);
      });
  }

  function toggleTaskCompleted(id) {
    const task = tasks.find(t => t.id === id);

    fetch(`${apiURL}/api/expenses/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: !task.completed
      })
    })
      .then(res => res.json())
      .then(updated => {
        setTasks(tasks.map(t =>
          t.id === id ? { ...t, completed: updated.completed }
            : t
        ));
      });
  }

  function editBudget(id, updatedFields) {
    fetch(`${apiURL}/api/budgets/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        updatedFields
      })
    })
      .then(res => res.json())
      .then(updated => {
        setBudgets(budgets.map(b =>
          b.id === id ? updated : b
        ));
      });
  }

  function editTask(id, newName) {
    fetch(`${apiURL}/api/expenses/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: newName
      })
    })
      .then(res => res.json())
      .then(updated => {
        setTasks(tasks.map(t =>
          t.id === id
            ? { ...t, name: updated.title }
            : t
        ));
      });
  }
  
  function deleteBudget(id) { 
    fetch(`${apiURL}/api/budgets/${id}/`, {
      method: "DELETE"
    }).then(() => {
      setBudgets(budgets.filter(b => b.id !== id));
    });
  }

  function deleteTask(id) {
    fetch(`${apiURL}/api/expenses/${id}/`, {
      method: "DELETE"
    }).then(() => {
      setTasks(tasks.filter(t => t.id !== id));
    });
  }

  return (
    <div className="expensesapp">
      <h1>Expenses</h1>
      <Form addTask={addTask} />
      <ul>
        {tasks.map(task => (
          <Expense
            key={task.id}
            id={task.id}
            name={task.name}
            completed={task.completed}
            toggleTaskCompleted={toggleTaskCompleted}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>

      <hr />

      <h1>Budgets</h1>
      <Form addTask={addBudget} />
        
      <ul>
        {budgets.map(budget => (
          <Budget
            key={budget.id}
            id={budget.id}
            name={budget.name}
            total_amount={budget.total_amount}
            month={budget.month}
            year={budget.year}
            editBudget={editBudget}
            deleteBudget={deleteBudget}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;