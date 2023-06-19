import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import LoadingOverlay from "react-loading-overlay";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("null");
  const [isLoading, setIsLoading] = useState("false");

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8080/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, first_name, last_name }),
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
      I'm in the Registration
      {/* <LoadingOverlay active={isLoading} spinner text="Signing up..."> */}
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>

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
      {/* </LoadingOverlay> */}
    </div>
  );
}
