import "../components/styles/Landingpage.css";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../components/styles/Landingpage.css";
import Container from "@mui/material/Container";
import logo from "../components/images/piggylogo.gif";
import Box from "@mui/material/Box";
import { ReactComponent as Cornerleft } from "./svgCategories/cornerleft.svg";
import { ReactComponent as Cornerright } from "./svgCategories/cornerright.svg";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Landingpage() {
  const Navigate = useNavigate();
  const { token } = useContext(AuthContext);
  setTimeout(() => {
    Navigate("/entrypage");
  }, 4000);

  return (
    <Container
      className="landingPage"
      maxWidth="sm"
    >
      <Cornerright className="cornerright" />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap="10px"
        className="name"
      >
        <Box>
        <img className="logo" src={logo} width="400px" />
        </Box>
        <Link className="app_name" to="/entrypage">
          <h3>PiggyBank </h3>
        </Link>
      </Box>
      <Cornerleft className="cornerleft" />
    </Container>
  );
}
