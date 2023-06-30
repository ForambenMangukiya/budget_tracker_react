import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import countryList from "./Countrylist";
import React from "react";
import "./styles/signup.css";
import Container from "@mui/material/Container";
import { ReactComponent as Cornerleft } from "./svgCategories/cornerleft.svg";
import { ReactComponent as Cornerright } from "./svgCategories/cornerright.svg";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { InputLabel, TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [country_code, setCountry_code] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch(
      "https://piggybank-api.onrender.com/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          country_code,
          first_name,
          last_name,
        }),
      }
    );

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
    <Container maxWidth="sm" sx={{ borderRadius: "20px" }}>
      <Cornerright className="cornerright" />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <CircularProgress sx={{ color: "#b9b9b9" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            minHeight: "100vh",
          }}
        >
          <FormControl fullWidth className="signup-container">
            <TextField
              id="firstnameinput"
              label="First name"
              type="text"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
              }}
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="lastnameinput"
              label="Last name"
              type="text"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
              }}
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel className="country">Country</InputLabel>
            <Select
              id="countryselectinput"
              value={country_code}
              onChange={(e) => setCountry_code(e.target.value)}
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
              }}
            >
              <MenuItem value="US">US</MenuItem>
              <MenuItem value="DE">DE</MenuItem>
              {countryList.map((countryCode) => {
                if (countryCode !== "US" && countryCode !== "DE") {
                  return (
                    <MenuItem key={countryCode} value={countryCode}>
                      {countryCode}
                    </MenuItem>
                  );
                }
                return null;
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="emailinput"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="passwordinput"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
              }}
            />
            <Box>
              <Button
                sx={{
                  ":hover": { bgcolor: "grey" },
                  borderRadius: "31px",
                  background: "#c80048",
                  width: "150px",
                  height: "50px",
                  margin: "20px",
                  color: "white",
                }}
                onClick={handleSubmit}
                className="signup"
              >
                Register
              </Button>
              <NavLink to="/login" className="backtologin">
                Login
              </NavLink>
              {error && <div className="error">{error}</div>}
            </Box>
          </FormControl>
        </Box>
      )}
      <Cornerleft className="cornerleft" />
    </Container>
  );
}
