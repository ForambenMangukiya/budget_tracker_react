import { Box, TextField, MenuItem, InputLabel } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import "../components/styles/addIncome.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
export default function AddIncome() {
  const [category_name, setCatgeroy] = useState("");
  const [tran_date, setDate] = useState(null);
  const [tran_description, setDescription] = useState("");
  const [tran_amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const handleAddIncomesChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/Transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          category_name, // HOUSE, TRANSPORTATION
          tran_description,
          tran_amount,
          tran_sign: "DR", //DR (income) or CR(expense)
          tran_currency: "US",
          tran_date,
          user,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to add income");
      }
      setIsLoading(true);
      setCatgeroy("");
      setDate(null);
      setDescription("");
      setAmount("");
    } catch (error) {
      console.log(error);
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
    <div>
      <Box className="income_container">
        {/* <InputLabel className="text-field-label">Choose category</InputLabel> */}

        <TextField
          className="addincome-textfield"
          label="Choose category"
          select
          value={category_name}
          onChange={handlecategoryChange}
        >
          <MenuItem value="Salary">salary </MenuItem>
          <MenuItem value="Deposits"> Deposits</MenuItem>
          <MenuItem value="Savings"> Savings</MenuItem>
          <MenuItem value="Others"> Others</MenuItem>
        </TextField>
        {/* <InputLabel className="text-field-label">Date</InputLabel> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label="Pick the date"
              value={tran_date}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>

        {/* <InputLabel className="text-field-label">Description </InputLabel> */}

        <TextField
          className="addincome-textfield"
          label=" add Description"
          value={tran_description}
          onChange={handleDescriptionChange}
        ></TextField>
        {/* <InputLabel className="text-field-label">Amount </InputLabel> */}

        <TextField
          className="addincome-textfield"
          label=" add your amount"
          value={tran_amount}
          onChange={handleAmountChange}
        ></TextField>

        <button className="addincome-btn " onClick={handleAddIncomesChange}>
          {" "}
          Add{" "}
        </button>
      </Box>
    </div>
  );
}
