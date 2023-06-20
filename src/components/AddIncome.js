import { Box, TextField, MenuItem } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import "../components/styles/addIncome.css";
export default function AddIncome() {
  const [category, setCatgeroy] = useState("");
  const handleChange = (event) => {
    setCatgeroy(event.target.value);
  };
  return (
    <div>
      <Box className="income_container">
        <TextField
          className="addincome-textfield"
          label="Choose category"
          select
          value={category}
          onChange={handleChange}
        >
          <MenuItem value="Salary">salary </MenuItem>
          <MenuItem value="others"> Others</MenuItem>
        </TextField>

        <TextField className="addincome-textfield" label="Please add Date">
          Date
        </TextField>

        <TextField
          className="addincome-textfield"
          label="Please add Description"
        ></TextField>

        <TextField
          className="addincome-textfield"
          label="Please add your amount"
        ></TextField>

        <TextField
          className="addincome-textfield"
          label="add your deposites"
        ></TextField>

        <TextField
          className="addincome-textfield"
          label="add your savings"
        ></TextField>

        <button className="addincome-btn "> Add </button>
      </Box>
    </div>
  );
}
