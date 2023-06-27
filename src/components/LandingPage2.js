import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "../components/styles/LandingPage2.css";
export default function LandingPage2() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Button className="register-btn" variant="contained">
          Register
        </Button>

        <Button className="login-btn" variant="contained">
          Login
        </Button>
      </Box>
    </Container>
  );
}
