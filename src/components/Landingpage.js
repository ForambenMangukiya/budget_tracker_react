import "../components/styles/Landingpage.css";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../components/styles/Landingpage.css";
import Container from "@mui/material/Container";
import logo from "../components/images/logo.png";
import Box from "@mui/material/Box";
import { ReactComponent as Cornerleft } from "./svgCategories/cornerleft.svg";
import { ReactComponent as Cornerright } from "./svgCategories/cornerright.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landingpage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/entrypage");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <Container
      className="landingPage"
      maxWidth="sm"
      sx={{ borderRadius: "20px" }}
    >
      <Cornerright className="cornerright" />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap="20px"
        className="name"
      >
        <img className="logo" src={logo} width="150px" />

        <Link className="app_name" to="/entrypage">
          <h1>piggy bank </h1>
        </Link>
      </Box>
      <Cornerleft className="cornerleft" />
    </Container>
  );
}
