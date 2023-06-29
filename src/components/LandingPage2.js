import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "../components/styles/LandingPage2.css";
import { ReactComponent as Cornerleft } from "./svgCategories/cornerleft.svg";
import { ReactComponent as Cornerright } from "./svgCategories/cornerright.svg";
// import { ReactComponent as Welcoming } from "./svgCategories/welcoming.svg";
import welcoming from "./images/welcoming.jpg";
import { useNavigate } from "react-router-dom";

export default function LandingPage2() {
  const navigate = useNavigate();

  const handelRegister = () => {
    navigate("/signup");
  };

  const handelLogin = () => {
    navigate("/login");
  };

  return (
    <Container
      className="landingPage"
      maxWidth="sm"
      sx={{ borderRadius: "20px" }}
    >
      <Cornerright className="cornerright" />
      {/* <Welcoming /> */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap="20px"
      >
        <img className="welcomeimage" src={welcoming} width="500px" />

        <Button
          style={{
            borderRadius: 35,
            backgroundColor: "#c80048",
            padding: "5px 88px",
          }}
          className="register-btn"
          variant="contained"
          onClick={handelRegister}
        >
          Register
        </Button>

        <Button
          style={{
            borderRadius: 35,
            backgroundColor: "#c80048",
            padding: "5px 100px",
          }}
          className="login-btn"
          variant="contained"
          onClick={handelLogin}
        >
          Login
        </Button>
      </Box>

      <Cornerleft className="cornerleft" />
    </Container>
  );
}
