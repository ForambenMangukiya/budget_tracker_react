import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Container from "@mui/material/Container";
import ScanReceipt from "./svg/IconScanReciept";
import LinkAccount from "./svg/IconPayWithCard";
import ManualEntry from "./svg/IconManuallyEnter";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

import { DataContext } from "../context/DataContext";
import "./styles/transactions.css";

const actions = [
  { icon: <LinkAccount />, name: "Link", route: "/link" },
  { icon: <ManualEntry />, name: "Expense", route: "/addexpense" },
  { icon: <ManualEntry />, name: "Income", route: "/addincome" },
  { icon: <ScanReceipt />, name: "Scan", route: "/" },
];
// export default function Transactions() {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     const response = await fetch("http://localhost:8080/transaction", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         category_name,
//         tran_description,
//         tran_amount,
//         tran_sign,
//         tran_curency,
//         tran_date,
//       }),
//     });
//     const data = await response.json();
//   };
export default function Transactions() {
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState(0);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setTransaction(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleActionClick = (route) => {
    navigate(route);
    handleClose();
  };
  const sampleData = [
    { amount: "200.00€", category: "Food", date: "13.07.2023" },
    { amount: "50.00€", category: "Transport", date: "13.07.2023" },
    { amount: "3000.00€", category: "Rent", date: "10.07.2023" },
    { amount: "2.99€", category: "Food", date: "10.07.2023" },
    { amount: "56.46€", category: "Energy", date: "09.07.2023" },
  ];
  return (
    <Container maxWidth="sm">
      <Tabs value={transaction} onChange={handleChange} centered>
        <Tab label="expenses" />
        <Tab label="income" />
      </Tabs>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          ml: 0.5,
        }}
      >
        <Typography sx={{ fontWeight: "bold", mb: 1 }}>Spent</Typography>
      </Box>
      {transaction === 0 ? (
        <Box>
          {sampleData.map((element) => (
            <Box
              component="div"
              className="transaction-div"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography
                variant="p"
                component="p"
                className="transaction-item"
                sx={{ fontWeight: "bold" }}
              >
                {element.amount}
              </Typography>
              <Typography
                variant="p"
                component="p"
                className="transaction-item"
              >
                {element.category}
              </Typography>
              <Typography
                variant="p"
                component="p"
                className="transaction-item"
              >
                {element.date}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : null}
      <Box sx={{ height: 330, transform: "translateZ(0px)", flexGrow: 1 }}>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
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
