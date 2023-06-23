import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Container from "@mui/material/Container";
import ScanReceipt from "./svg/IconScanReciept";
import LinkAccount from "./svg/IconPayWithCard";
import ManualEntry from "./svg/IconManuallyEnter";
import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { AuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  InputLabel,
  Alert,
  OutlinedInput,
} from "@mui/material";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

const actions = [
  { icon: <LinkAccount />, name: "Link", route: "/link" },
  { icon: <ManualEntry />, name: "Expense", route: "/addexpense" },
  { icon: <ManualEntry />, name: "Income", route: "/addincome" },
  { icon: <ScanReceipt />, name: "Scan", route: "/" },
];

export default function Transactions() {
  const [transaction, setTransaction] = React.useState("expenses");
  const [filter, setFilter] = React.useState("");
  const [category_name, setCatgeroy] = useState("");
  const { tranData, setTranData } = useContext(DataContext);
  const { token } = React.useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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

  //transactions functions
  const handleChange = (event, newValue) => {
    setTransaction(newValue);
  };
  const handleCategoryChange = (event) => {
    setCatgeroy(event.target.value);
  };
  console.log(tranData);

  useEffect(() => {
    const getData = async function () {
      try {
        const res = await fetch(`http://localhost:8080/transaction`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setTranData(data);
        // setLoading(false)
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
      if (token) {
        getData();
      }
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Tabs value={transaction} onChange={handleChange} centered>
        if (transaction === "Expenses") {}
        <Tab label="expenses" value="expenses" />
        <Tab label="income" value="income" />
      </Tabs>
      {transaction === "expenses" && <Box> </Box>}
      {transaction === "income" && (
        <Box>
          <FormControl fullWidth>
            <InputLabel id="category-label">Filter by Category</InputLabel>

            <Select
              required
              className="addincome-textfield"
              label="Filter by Category "
              value={category_name}
              onChange={handleCategoryChange}
              sx={{ textAlign: "left", borderRadius: "31px" }}
            >
              <MenuItem value="Salary">salary </MenuItem>
              <MenuItem value="Deposits"> Deposits</MenuItem>
              <MenuItem value="Savings"> Savings</MenuItem>
              <MenuItem value="Others"> Others</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
      <div>
        {tranData?.map((item) => (
          <div key={item.id}>
            <h1>{item.category_name}</h1>
          </div>
        ))}
      </div>

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
