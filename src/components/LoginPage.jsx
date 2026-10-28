/**
 * @author Tran Van Cuong
 */
import { useState } from "react";
import logo from "../assets/logo.svg";
import { login } from "../services/authService";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Username and password are required.");
      return;
    }
    const result = login(username, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
      
    onLogin(result.user);
  };

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <img src={logo} alt="FUNews logo" className="login-logo" />
        <h1>FUNewsManagementSystem</h1>
        <p className="muted">Sign in to the admin area</p>

        {error && <div className="alert alert-error">{error}</div>}

        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button type="submit" className="btn btn-primary btn-block">Login</button>
      </form>
    </div>
  );
}
