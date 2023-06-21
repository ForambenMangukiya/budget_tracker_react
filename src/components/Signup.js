import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import countryList from "./Countrylist";
import { NavLink } from "react-router-dom";
import React from "react";
import "./styles/signup.css";

// import LoadingOverlay from "react-loading-overlay";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [country, setCountry] = useState("");
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
      body: JSON.stringify({ email, password, country, first_name, last_name }),
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
    <div className="signup-container">
      I'm in the Registration
      {/* <LoadingOverlay active={isLoading} spinner text="Signing up..."> */}
      <form className="signup-header" onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <label className="firstname">First name:</label>
        <input
          id="firstnameinput"
          type="text"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
          placeholder="Please fill in this field"
        />

        <label className="lastname">Last name:</label>
        <input
          id="lastnameinput"
          type="text"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
          placeholder="Please fill in this field"
        />

        <label className="country">Country:</label>
        <select
          id="countryselectinput"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="countryselectinput">Select Country</option>
          <option value="US">US</option>
          <option value="DE">DE</option>
          {countryList.map((countryCode) => {
            if (countryCode !== "US" && countryCode !== "DE") {
              return (
                <option key={countryCode} value={countryCode}>
                  {countryCode}
                </option>
              );
            }
            return null;
          })}
        </select>

        <label className="email">Email:</label>
        <input
          id="emailinput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Please fill in this field"
        />

        <label className="password">Password:</label>
        <input
          id="passwordinput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Please fill in this field"
        />
        <button className="signup">Register</button>
        <NavLink to="/login" className="backtologin">
          Login
        </NavLink>
        {error && <div className="error">{error}</div>}
      </form>
      {/* </LoadingOverlay> */}
    </div>
  );
}
