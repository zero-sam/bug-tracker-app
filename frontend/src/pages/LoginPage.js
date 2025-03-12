import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Define multiple roles and credentials
    const credentials = [
      { username: "admin", password: "password123", role: "admin" },
      { username: "user", password: "user123", role: "user" },
    ];

    // Check credentials
    const user = credentials.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (user) {
      localStorage.setItem("token", "loggedIn"); // Fake auth token
      localStorage.setItem("role", user.role);

      // Redirect based on role
      if (user.role === "admin") navigate("/dashboard");
      else if (user.role === "user") navigate("/createbugs");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
