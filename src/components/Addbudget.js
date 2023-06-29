import React, { useState, useContext, useEffect } from "react";
// import DatePicker from "react-datepicker";

import Box from "@mui/material/Box";
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

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./styles/addbudget.css";
import axios from "axios"; //last
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
// import { useJwt } from "react-jwt";

export default function Addbudget() {
  const { budgetData, setBudgetData, decodedToken } = useContext(DataContext);
  const { token } = useContext(AuthContext);
  const [alert, setAlert] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(null);
  console.log("budgetData:", budgetData);
  // // console.log("user_id:", decodedToken._id);
  // const { decodedToken } = useJwt();

  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [currency, setCurrency] = useState("$");
  const [amount, setAmount] = useState(""); //last
  const [category, setCategory] = useState("");

  // const handleAddBudget = () => {
  //   console.log("add budget clicked");
  //   updateUserBudgetData();
  // };

  // const updateUserBudgetData = () => {
  //   console.log("inside the updatefunc");
  //   console.log("with token");
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   };

  //   const requestBody = {
  //     budgets: [
  //       {
  //         category_name: category_name,
  //         budget_description: description,
  //         budget_date: selectedDate,
  //         limit_amount: amount,
  //       },
  //     ],
  //   };

  //   console.log("requestBody", requestBody);
  //   // Fetch budget data if decodedToken is available
  //   axios
  //     // .get(`http://localhost:8080/users/${decodedToken.id}`)
  //     .put(`http://localhost:8080/users/${decodedToken._id}`, requestBody, {
  //       headers,
  //     })
  //     .then((response) => {
  //       console.log("response:", response);
  //       //TODO: handle error if user.budget is successfully updated or there is an error.

  //       setBudgetData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching budget data:", error);
  //     });
  // };

  // //TODO: once the button is clicked successfully updated, clear all fields.

  // const handlecategoryChange = (event) => {
  //   setCategory(event.target.value);
  // };

  // const handleCurrencyChange = (e) => {
  //   setSelectedCurrency(e.target.value);
  // };

  // const handleAmountChange = (e) => {
  //   setAmount(e.target.value);
  // };

  return (
    // <div>
    <Container>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ mt: 2 }} />
        </Box>
      ) : (
        <Box sx={{ minWidth: 120, p: 2 }} className="addexp_box">
          <form>
            {/*Category */}
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                required
                labelId="category-label"
                id="category"
                value={category}
                label="Category"
                className="background_grey"
                onChange={(e) => setCategory(e.target.value)}
                sx={{ textAlign: "left", borderRadius: "31px" }}
              >
                <MenuItem value={"eduaction"}>Eduaction</MenuItem>
                <MenuItem value={"communication"}>Communication</MenuItem>
                <MenuItem value={"bills"}>Bills</MenuItem>
                <MenuItem value={"rent"}>Rent</MenuItem>
                <MenuItem value={"medicine"}>Medicine</MenuItem>
                <MenuItem value={"groceries"}>Groceries</MenuItem>
                <MenuItem value={"eatingOut"}>Eating Out</MenuItem>
                <MenuItem value={"entertainment"}>Entertainment</MenuItem>
                <MenuItem value={"pets"}>Pets</MenuItem>
                <MenuItem value={"repairs"}>Repairs</MenuItem>
                <MenuItem value={"work"}>Work</MenuItem>
                <MenuItem value={"insurance"}>Insurance</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
              </Select>
            </FormControl>

            {/*Date*/}
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  className="background_grey"
                  // inputFormat="DD/MM/YYYY"
                  value={date}
                  onChange={(selectedDate) => setDate(selectedDate)}
                  sx={{
                    borderRadius: "31px",
                    "& fieldset": {
                      borderRadius: "30px",
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>

            {/*Amount */}
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                type="number"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
                className="background_grey"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                sx={{ borderRadius: "31px" }}
              />
            </FormControl>
            {/*Description */}
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Description"
                className="background_grey"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  borderRadius: "31px",
                  "& fieldset": {
                    borderRadius: "30px",
                  },
                }}
              />
            </FormControl>
            {/* Submit Button */}
            <Button
              variant="outlined"
              onClick={() => {
                setAlert("Submitted");
              }}
              className="btn_add"
              sx={{ mt: 1, pt: 2, pb: 2, pl: 5, pr: 5 }}
            >
              Add
            </Button>
            {/* Alert Message */}
            <Box sx={{ mt: 1 }}>{alert}</Box>
          </form>
        </Box>
      )}
    </Container>
  );
}
