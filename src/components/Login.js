import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ReactComponent as Cornerleft } from "./svgCategories/cornerleft.svg";
import { ReactComponent as Cornerright } from "./svgCategories/cornerright.svg";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log(`Email:${email},Password:${password}`);

    const response = await fetch(
      "https://piggybank-api.onrender.com/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

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
    console.log("token:", data.token);

    if (data.token !== null && data.token !== undefined) {
      navigate("/dashboard");
    }
  };
  return (
    <Container maxWidth="sm">
      <Cornerright className="cornerright" />
      {isLoading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
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
          <FormControl fullWidth className="login-container">
            <TextField
              id="login-emailinput"
              type="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Please enter your Email"
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
              }}
            >
              {" "}
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="login-passwordinput"
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Please enter your Password"
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
              }}
            ></TextField>
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
                className="login"
              >
                Login
              </Button>
            </Box>
          </FormControl>

          <NavLink to="/signup" className="backtosignup">
            Sign Up
          </NavLink>
          {error && <div className="error">{error}</div>}
        </Box>
      )}
      <Cornerleft className="cornerleft" />
    </Container>
  );
}
