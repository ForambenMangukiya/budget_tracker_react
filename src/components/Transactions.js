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
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import { useState, useEffect, useContext } from "react";
import { MenuItem, InputLabel, Alert, OutlinedInput } from "@mui/material";

import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import "./styles/transactions.css";

const actions = [
  { icon: <LinkAccount />, name: "Link", route: "/link" },
  { icon: <ManualEntry />, name: "Expense", route: "/addexpense" },
  { icon: <ManualEntry />, name: "Income", route: "/addincome" },
  { icon: <ScanReceipt />, name: "Scan", route: "/" },
];

//Date Filtering in Transaction Component
//Modal? OPTIONAL

export default function Transactions() {
  //state
  const [transaction, setTransaction] = useState("expenses");
  const [filter, setFilter] = useState("");
  const [category_name, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  //navigate
  const navigate = useNavigate();
  //context
  const { tranData } = useContext(DataContext);
  const { token } = useContext(AuthContext);
  // console.log(tranData);

  //handlers
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
    setCategory(event.target.value);
  };

  const paperStyles = {
    // Customize the background color here
    background: "linear-gradient(#c80048, #961c48)",
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     setError(null);

  //Currency Format
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  let euro = Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
  });
  let pounds = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  //useEffect
  useEffect(() => {
    //Logic for the filtering, probably a new fetch to get the filtered array from the backend
  }, [filter]);

  return (
    <Container maxWidth="sm" className="transactions-container">
      <Tabs value={transaction} onChange={handleChange} centered>
        <Tab label="expenses" value="expenses" />
        <Tab label="income" value="income" />
      </Tabs>
      {/* Expenses */}
      {transaction === "expenses" && (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              ml: 0.5,
            }}
          >
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Spent</Typography>
          </Box>
          {tranData
            .filter((element) => element.tran_sign === "DR")
            .sort((a, b) => new Date(b.tran_date) - new Date(a.tran_date))
            .map((element) => {
              const origDate = element.tran_date;
              const newDate = new Date(origDate);
              const newLocalDate = newDate
                .toLocaleDateString("en-GB") //ADD different Country code here to format it
                .replace(/[/]/g, ".");

              const capitalizedDesc = element.tran_description.replace(
                /./,
                (c) => c.toUpperCase()
              );
              return (
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
                    {USDollar.format(element.tran_amount)}
                  </Typography>
                  <Typography
                    variant="p"
                    component="p"
                    className="transaction-item"
                  >
                    {capitalizedDesc}
                  </Typography>
                  <Typography
                    variant="p"
                    component="p"
                    className="transaction-item"
                  >
                    {newLocalDate}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      )}
      {/* Income */}
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

      <Box sx={{ height: 330, transform: "translateZ(0px)", flexGrow: 1 }}>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon sx={{ color: "#FFFF" }} />}
          onClose={handleClose}
          onOpen={handleOpen}
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
