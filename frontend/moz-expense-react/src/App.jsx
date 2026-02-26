import { useEffect, useState } from "react";
import Form from "./components/Form";
import Expense from "./components/Expense";

const apiURL = import.meta.env.VITE_DJANGO_API_URL || "http://127.0.0.1:8000/api";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/expenses/`)
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

  function addTask(name) {
    fetch(`${apiURL}/expenses/`, {
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

    fetch(`${apiURL}/expenses/${id}/`, {
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

  function editTask(id, newName) {
    fetch(`${apiURL}/expenses/${id}/`, {
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

  function deleteTask(id) {
    fetch(`${apiURL}/expenses/${id}/`, {
      method: "DELETE"
    }).then(() => {
      setTasks(tasks.filter(t => t.id !== id));
    });
  }

  return (
    <div className="todoapp">
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
    </div>
  );
}

export default App;