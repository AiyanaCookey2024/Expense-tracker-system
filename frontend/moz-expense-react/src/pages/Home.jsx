import { Link } from "react-router-dom";

function Home({ expenses, budgets, deleteExpense, deleteBudget }) {

  
  return (
    <div className="container">

      <h1>Dashboard</h1>

      <h2>Expenses</h2>

      <div className="table-wrapper">
      <table>
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

              <td>

                <Link className="btn view-details" to={`/expenses/${expense.id}`}>
                  View Details
                </Link>

                <Link className="btn edit" to={`/expenses/edit/${expense.id}`}>
                  Edit
                </Link>

                <button className="btn delete" onClick={() => deleteExpense(expense.id)}>
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>


      <h2>Budgets</h2>

      <div className="table-wrapper">

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

              <td>

                <Link className="btn view-details" to={`/budgets/${budget.id}`}>
                  View Details
                </Link>

                <Link className="btn edit" to={`/budgets/edit/${budget.id}`}>
                  Edit
                </Link>

                <button className="btn delete" onClick={() => deleteBudget(budget.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  </div>
  );
}

export default Home;