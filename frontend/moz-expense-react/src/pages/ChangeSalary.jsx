import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function SalaryPeriod() {
    const [period, setPeriod] = useState(null);
    const [salary, setSalary] = useState(0);
    const apiURL = import.meta.env.VITE_DJANGO_API_URL || "http://127.0.0.1:8000/api";
    const navigate = useNavigate();

   useEffect(() => {
    fetch(`${apiURL}/api/salary-periods/`)
      .then(res => res.json())
      .then(data => {
        setPeriod(data[0]); 
      });
    }, []);


  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${apiURL}/api/salary-periods/${period.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(period)
    })
      .then(res => res.json())
      .then(updated => {
        console.log("Updtaed:", updated)
        setPeriod(updated);
      })
    .then(() => navigate("/"))
    }


  if (!period) return <p>Loading...</p>;

  return (
    <div className="container">

      <h1>Salary Period</h1>

      <form onSubmit={handleSubmit}>

        <label>Month</label>
        <input
          type="number"
          value={period.month}
          onChange={e =>
            setPeriod({ ...period, month: Number(e.target.value) })
          }
        />

        <label>Year</label>
        <input
          type="number"
          value={period.year}
          onChange={e =>
            setPeriod({ ...period, year: Number(e.target.value )})
          }
        />

        <label>Salary</label>
        <input 
            type="number"
            value={period.total_salary || ""}
            onChange={e =>
                setPeriod({...period, total_salary: Number(e.target.value)})
            }
        />

        <button type="submit" className="btn">
          Update Salary Period
        </button>

      </form>

    </div>
  );
}

export default SalaryPeriod;

    