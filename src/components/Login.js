import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log(`Email:${email},Password:${password}`);
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      setTimeout(() => {
        localStorage.setItem("token", data.token);

        setIsLoading(false);
        login(data.token);
      }, 5000);
    }
  };
  return (
    <div>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <form className="login-container" onSubmit={handleSubmit}>
          <h3>Log in</h3>
          <label className="login-email">Email: </label>
          <input
            id="login-emailinput"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Please enter your Email"
          />

          <label className="login-password">Password: </label>
          <input
            id="login-passwordinput"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Please enter your Password"
          />

          <button className="login">Login</button>
          <NavLink to="/signup" className="backtosignup">
            Sign Up
          </NavLink>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
}
