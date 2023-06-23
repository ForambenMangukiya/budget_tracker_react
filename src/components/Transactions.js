import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

import { DataContext } from "../context/DataContext";
import "./styles/transactions.css";

export default function Transaction() {
  const [transaction, setTransaction] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTransaction(newValue);
  };

  const sampleData = [
    { amount: "200.00€", category: "Food", date: "13.07.2023" },
    { amount: "50.00€", category: "Transport", date: "13.07.2023" },
    { amount: "3000.00€", category: "Rent", date: "10.07.2023" },
    { amount: "2.99€", category: "Food", date: "10.07.2023" },
    { amount: "56.46€", category: "Energy", date: "09.07.2023" },
  ];
  return (
    <>
      <Container className="transactions-container">
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
      </Container>
    </>
  );
}

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
//   return <div>I'm in the Transactions</div>;
// }
