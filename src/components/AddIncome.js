import { Box, TextField, MenuItem, InputLabel } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import "../components/styles/addIncome.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
export default function AddIncome() {
  const [category, setCatgeroy] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [deposits, setDeposits] = useState("");
  const [savings, setSavings] = useState("");
  const handlecategoryChange = (event) => {
    setCatgeroy(event.target.value);
  };
  const handDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDepositsChange = (event) => {
    setDeposits(event.target.value);
  };

  const handleSavingsChange = (event) => {
    setSavings(event.target.value);
  };

  const handleAddIncomesChange = (event) => {
    setCatgeroy("");
    setDate("");
    setDescription("");
    setAmount("");
    setDeposits("");
    setSavings("");
  };
  const commonStyles = {
    bgcolor: "background.paper",
    borderColor: "text.primary",
    m: 1,
    border: 1,
    width: "5rem",
    height: "5rem",
  };
  return (
    <div>
      <Box className="income_container">
        <InputLabel className="text-field-label">Choose category</InputLabel>

        <TextField
          className="addincome-textfield"
          label="Choose category"
          select
          value={category}
          onChange={handlecategoryChange}
        >
          <MenuItem value="Salary">salary </MenuItem>
          <MenuItem value="others"> Others</MenuItem>
        </TextField>
        <InputLabel className="text-field-label">Date</InputLabel>

        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          onChange={handDateChange}
        >
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker label="Pick the date" />
          </DemoContainer>
        </LocalizationProvider>

        <InputLabel className="text-field-label">Description </InputLabel>

        <TextField
          className="addincome-textfield"
          label=" add Description"
          value={description}
          onChange={handleDescriptionChange}
        ></TextField>
        <InputLabel className="text-field-label">Amount </InputLabel>

        <TextField
          className="addincome-textfield"
          label=" add your amount"
          value={amount}
          onChange={handleAmountChange}
        ></TextField>
        <InputLabel className="text-field-label">Deposites </InputLabel>

        <TextField
          className="addincome-textfield"
          label="add your deposites"
          value={deposits}
          onChange={handleDepositsChange}
        ></TextField>
        <InputLabel className="text-field-label">Savings</InputLabel>

        <TextField
          className="addincome-textfield"
          label="add your savings"
          value={savings}
          onChange={handleSavingsChange}
        ></TextField>

        <button className="addincome-btn " onClick={handleAddIncomesChange}>
          {" "}
          Add{" "}
        </button>
      </Box>
    </div>
  );
}
