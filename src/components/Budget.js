import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import ManualEntry from "./svg/IconManuallyEnter";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Budget() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const actions = [
    { icon: <ManualEntry />, name: "Add Budget", route: "/addbudget" },
  ];

  const handleActionClick = (route) => {
    navigate(route);
    setOpen(false);
  };
  const paperStyles = {
    // Customize the background color here
    background: "linear-gradient(#c80048, #961c48)",
  };
  return (
    <Container>
      <Box sx={{ height: 600, transform: "translateZ(0px)", flexGrow: 1 }}>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon sx={{ color: "#FFFF" }} />}
          onClose={() => {
            setOpen(false);
          }}
          onOpen={() => {
            setOpen(true);
          }}
          open={open}
          FabProps={{
            style: paperStyles,
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => handleActionClick(action.route)}
            />
          ))}
        </SpeedDial>
      </Box>
    </Container>
  );
}
