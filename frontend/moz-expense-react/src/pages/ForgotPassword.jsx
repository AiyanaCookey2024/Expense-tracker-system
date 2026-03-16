import { useState } from "react"

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const apiURL = import.meta.env.VITE_DJANGO_API_URL || "http://127.0.0.1:8000";

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`${apiURL}/api/auth/password-reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    alert(data.message || "If the email exists, a reset link has been sent.");
  }

  return (
    <div className="container">
      <h1>Reset Password</h1>

      <form onSubmit={handleSubmit}>
        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send reset link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;