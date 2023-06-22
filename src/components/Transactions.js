import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from "@mui/material/Container";
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
export default function Transaction() {
  const [transaction, setTransaction] = React.useState("expenses");
  const [filter, setFilter] = React.useState("");
  const [category_name, setCatgeroy] = useState("");
  const { tranData, setTranData } = useContext(DataContext);
  const { token } = React.useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setTransaction(newValue);
  };
  const handleCategoryChange = (event) => {
    setCatgeroy(event.target.value);
  };
  console.log(tranData);

  //   useEffect(() => {
  //     // getting all transactions for one user within specific period
  //     const getData = async function () {
  //       try {
  //         const res = await fetch(`http://localhost:8080/transaction`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });

  //         const data = await res.json();
  //         setTranData(data);
  //         // setLoading(false)
  //       } catch (error) {
  //         console.log(error);
  //         // setLoading(false);
  //       }
  //       if (token) {
  //         getData();
  //       }
  //     };
  //   }, [token]);

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
    </Container>
  );
}
