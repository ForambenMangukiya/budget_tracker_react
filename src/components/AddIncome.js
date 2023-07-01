import {
  Box,
  TextField,
  MenuItem,
  InputLabel,
  Alert,
  OutlinedInput,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import "../components/styles/addIncome.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AddIncome() {
  const [category_name, setCatgeroy] = useState("");
  const [tran_date, setDate] = useState(null);
  const [tran_description, setDescription] = useState("");
  const [tran_amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const [user, setUser] = useState("");
  const { token } = React.useContext(AuthContext);
  const { refresh, setRefresh } = React.useContext(DataContext);
  const handleAddIncomesChange = async (e) => {
    e.preventDefault();

    if (
      category_name === "" ||
      tran_date === null ||
      tran_description === "" ||
      tran_amount === ""
    ) {
      setAlert(<Alert severity="warning">Please fill all the fields !</Alert>);
    } else {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://piggybank-api.onrender.com/Transaction",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              category_name, // HOUSE, TRANSPORTATION
              tran_description,
              tran_amount,
              tran_sign: "CR", //DR (income) or CR(expense)
              tran_currency: "US",
              tran_date,
              user,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to add income");
        }
        setIsLoading(false);
        setCatgeroy("");
        setDate(null);
        setDescription("");
        setAmount("");
        setAlert(<Alert severity="success">Your income has been saved</Alert>);
        setRefresh(!refresh);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handlecategoryChange = (event) => {
    setCatgeroy(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <Container maxWidth="sm"
    sx={{
      paddingTop: "100px",
    }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ borderRadius: "20px" }} className="income_container">
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>

            <Select
              required
              className="addincome-textfield"
              label="Category"
              value={category_name}
              onChange={handlecategoryChange}
              sx={{ textAlign: "left", borderRadius: "31px" }}
            >
              <MenuItem value="Salary">salary </MenuItem>
              <MenuItem value="Deposits"> Deposits</MenuItem>
              <MenuItem value="Savings"> Savings</MenuItem>
              <MenuItem value="Others"> Others</MenuItem>
            </Select>
          </FormControl>
          {/* <InputLabel className="text-field-label">Date</InputLabel> */}
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DatePicker
                  label="Date"
                  value={tran_date}
                  className="background_grey"
                  onChange={handleDateChange}
                  sx={{
                    borderRadius: "31px",
                    "& fieldset": {
                      borderRadius: "30px",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
          {/* <InputLabel className="text-field-label">Description </InputLabel> */}
          <FormControl fullWidth>
            <TextField
              className="addincome-textfield"
              label="Description"
              value={tran_description}
              onChange={handleDescriptionChange}
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
              }}
            ></TextField>
            {/* <InputLabel className="text-field-label">Amount </InputLabel> */}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Amount </InputLabel>
            <OutlinedInput
              className="addincome-textfield"
              label=" add your amount"
              type="number"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={tran_amount}
              onChange={handleAmountChange}
              sx={{ borderRadius: "31px" }}
            ></OutlinedInput>
          </FormControl>
          <Button
            sx={{
              ":hover": { bgcolor: "grey" },
              borderRadius: "31px",
              background: "#c80048",
              width: "150px",
              height: "50px",
              margin: "20px",
              color: "white",
            }}
            onClick={handleAddIncomesChange}
          >
            ADD
          </Button>
          <Box sx={{ mt: 1 }}>{alert}</Box>
        </Box>
      )}
    </Container>
  );
}
