import { Routes, Route, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import ExpenseDetails from "./pages/ExpenseDetails";
import BudgetDetails from "./pages/BudgetDetails";
import CreateExpense from "./pages/CreateExpense";
import CreateBudget from "./pages/CreateBudget";
import EditExpense from "./pages/EditExpense";
import EditBudget from "./pages/EditBudget";

import Home from "./pages/Home";


function App() {
  const [expense, setExpense] = useState([]);
  const [budget, setBudget] = useState([]);
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
        setExpenses(data);
      })
      .catch(err => console.error(err));
  }, []);

  function addBudget(data) {
    fetch(`${apiURL}/api/budgets/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(newBud => {
        setBudgets(prev => [...prev, newBud]);
      });
  }
 
  function addExpense(data) {
  fetch(`${apiURL}/api/expenses/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(newExp => {
      setExpenses(prev => [...prev, newExp]);
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

 function editExpense(id, updatedFields) {
  fetch(`${apiURL}/api/expenses/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields)
  })
    .then(res => res.json())
    .then(updated => {
      setExpenses(prev =>
        prev.map(e => e.id === id ? updated : e)
      );
    });
}
  
  function deleteBudget(id) { 
    fetch(`${apiURL}/api/budgets/${id}/`, {
      method: "DELETE"
    }).then(() => {
      setBudgets(budgets.filter(b => b.id !== id));
    });
  }

  function deleteExpense(id) {
  fetch(`${apiURL}/api/expenses/${id}/`, {
    method: "DELETE"
  })
    .then(() => {
      setExpenses(prev =>
        prev.filter(e => e.id !== id)
      );
    });
}

  return (
  <>
    <nav style={{
      display: "flex",
      gap: "20px",
      padding: "20px",
      background: "#111",
      color: "white"
    }}>
      <Link to="/">Home</Link>
      <Link to="/create-expense">Create Expense</Link>
      <Link to="/create-budget">Create Budget</Link>
      <Link to="/summary">Summary</Link>
    </nav>

    <Routes>
      <Route
        path="/"
        element={
          <Home
            expenses={expense}
            budgets={budget}
            deleteExpense={deleteExpense}
            deleteBudget={deleteBudget}
          />
        }
      />

      <Route path="/create-expense" element={<Create Expense={addExpense}/>} />
      <Route path="/create-budget" element={<Create Budget={addBudget}/>} />
      <Route path="/expenses/:id" element={<Expense Detail/>} />
      <Route path="/expenses/edit/:id" element={<Edit Expense={editExpense}/>} />
      <Route path="/budgets/:id" element={<Budget Detail/>} />
      <Route path="/budgets/edit/:id" element={<Edit Budget={editBudget}/>} />
    </Routes>
  </>
);
}

export default App;