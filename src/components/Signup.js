import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from  "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [country_code, setCountry_code] = useState("DE");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("http://localhost:8080/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, first_name, last_name, country_code }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      // setTimeout(() => {
        localStorage.setItem("token", data.token);
        setIsLoading(false);
        login(data.token);
      // }, 5000);
    }
    
    if (data.token !== null && data.token !== undefined) {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      I'm in the Signup Form
      { isLoading ? (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
      ) : (
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <label>Country:</label>
        <input
          type="text"
          value={country_code}
          onChange={(e) => setCountry_code(e.target.value)}
        />

        <label>Firstname:</label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
        />

        <label>Lastname:</label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
      )}
    </div>
  );
}
