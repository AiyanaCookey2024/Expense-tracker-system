import { Link } from "react-router-dom";

function Home({ expenses, budgets, deleteExpense, deleteBudget }) {

  
  return (
    <div className="expensesapp">

      <h1>Expenses</h1>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.category}</td>
              <td>{expense.title}</td>
              <td>£{expense.amount}</td>

              <td style={{display:"flex", gap:"10px"}}>

                <Link to={`/expenses/${expense.id}`}>
                  <button>View</button>
                </Link>

                <Link to={`/expenses/edit/${expense.id}`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => deleteExpense(expense.id)}>
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <h1>Budgets</h1>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Amount</th>
            <th>Month</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {budgets.map(budget => (
            <tr key={budget.id}>

              <td>{budget.name}</td>
              <td>£{budget.total_amount}</td>
              <td>{budget.month}</td>
              <td>{budget.year}</td>

              <td style={{display:"flex", gap:"10px"}}>

                <Link to={`/budgets/${budget.id}`}>
                  <button>View</button>
                </Link>

                <Link to={`/budgets/edit/${budget.id}`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => deleteBudget(budget.id)}>
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Home;