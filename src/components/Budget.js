import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import ManualEntry from "./svg/IconManuallyEnter";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
// 1.  getting data from mongodb
import { AuthContext } from "../context/AuthContext";
import { useJwt } from "react-jwt";
import { DataContext } from "../context/DataContext";

export default function Budget() {
  //2
  const { token } = useContext(AuthContext);
  const [budgetData, setBudgetData] = useState([]);
  const { decodedToken } = useJwt(token);

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

  //3
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch(
          `https://piggybank-api.onrender.com/users/${decodedToken._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setBudgetData(data.budgets);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBudgets();
  }, [decodedToken._id, token]);

  return (
    <div>
      {/* 4 */}
      {budgetData.map((budget) => (
        <div key={budget._id}>
          <h3>{budget.category_name}</h3>
          <p>{budget.budget_date}</p>
          <p>{budget.limit_amount}</p>
          <p>{budget.budget_description}</p>
        </div>
      ))}
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
    </div>
  );
}
