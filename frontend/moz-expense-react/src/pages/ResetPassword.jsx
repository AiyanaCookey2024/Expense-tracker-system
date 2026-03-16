import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");

  const apiURL = import.meta.env.VITE_DJANGO_API_URL || "http://127.0.0.1:8000";

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`${apiURL}/api/auth/password-reset-confirm/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        new_password: password,
      }),
    });

    const data = await res.json();

    alert(data.message || data.error);
  }

  return (
    <div className="container">
      <h1>Set New Password</h1>

      <form onSubmit={handleSubmit}>
        <label>New Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Reset password</button>
      </form>
    </div>
  );
}

export default ResetPassword;