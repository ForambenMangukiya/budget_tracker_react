import "../components/styles/Landingpage.css";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../components/styles/Landingpage.css";
import { Container, Typography } from "@mui/material";
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
  }, 40000);

  return (
    <Container
      className="landingPage"
      sx={{
        maxWidth: "sm",
        minHeight: "100vh",
      }}
    >
      <Cornerright className="cornerright" />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        // minHeight="100vh"
        // gap="10px"
        className="name"
      >
        <Box style={{ position: 'relative', width: '350px' }}>
          <img className="logo" src={logo} width="350px" alt="Logo" />
          <Typography
            variant="h1"
            sx={{
              position: 'absolute',
              top: '75%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '36px',
              fontWeight: 900,
              color: '#eb1b67',
              textAlign: 'center',
            }}
          >
            Piggy<span style={{ color: '#453f78' }}>Bank</span>
          </Typography>
        </Box>


        <Box sx={{padding: "10px"}}>
        <Typography style={{fontSize: "14px", textAlign: "center", paddingLeft: "50px", paddingRight: "50px",}}>
          You're amazing for taking this first step 
          towards getting better control over your money 
          and financial goals.
        </Typography>
        </Box>

        {/* <Link className="app_name" to="/entrypage"> */}
          {/* <h3>PiggyBank </h3> */}
        {/* </Link> */}
      </Box>
      <Cornerleft className="cornerleft" />
    </Container>
  );
}
