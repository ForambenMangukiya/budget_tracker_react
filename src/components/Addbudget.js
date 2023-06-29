import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/addbudget.css";
import axios from "axios"; //last
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
// import { useJwt } from "react-jwt";

export default function Addbudget() {
  const { budgetData, setBudgetData, decodedToken } = useContext(DataContext);
  const { token } = useContext(AuthContext);
  console.log("budgetData:", budgetData);
  // // console.log("user_id:", decodedToken._id);
  // const { decodedToken } = useJwt();

  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("$");
  const [amount, setAmount] = useState(""); //last
  const [category_name, setCategory] = useState("");
  //alert msg
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddBudget = () => {
    console.log("add budget clicked");
    //alert
    if (!category_name || !description || !selectedDate || !amount) {
      setErrorMessage("Please fill all the fields.");
      setSuccessMessage("");
      return;
    }

    updateUserBudgetData();
  };

  const updateUserBudgetData = () => {
    console.log("inside the updatefunc");
    console.log("with token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestBody = {
      budgets: [
        {
          category_name: category_name,
          budget_description: description,
          budget_date: selectedDate,
          limit_amount: amount,
        },
      ],
    };

    //main
    console.log("requestBody", requestBody);
    // Fetch budget data if decodedToken is available
    axios
      // .get(`http://localhost:8080/users/${decodedToken.id}`)
      .put(`http://localhost:8080/users/${decodedToken._id}`, requestBody, {
        headers,
      })
      .then((response) => {
        console.log("response:", response);
        setBudgetData(response.data);
        //TODO: handle error if user.budget is successfully updated or there is an error.

        setSuccessMessage("Budget added successfully.");
        // Clear form fields
        setDescription("");
        setSelectedDate(null);
        setSelectedCurrency("$");
        setAmount("");
        setCategory("");
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error fetching budget data:", error);
        //alert
        setErrorMessage("Error adding budget. Please try again.");
      });
  };

  //TODO: once the button is clicked successfully updated, clear all fields.

  const handlecategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      I'm in the Budget
      <div className="budget_container">
        {/* <label className="budget_category">Category:</label>
        <select id="budget_category_option">
          <option value="budget_transport">Transport</option>
          <option value="budget_groceries">Groceries</option>
          <option value="budget_bills">Bills</option>
          <option value="budget_food">Food</option>
          <option value="budget_energy">Energy</option>
          <option value="budget_entertainment">Entertainment</option>
        </select> */}

        <label className="budget_category">Category Name:</label>
        <select
          id="budget_select_category"
          value={category_name}
          onChange={handlecategoryChange}
        >
          <option>Please choose the category</option>
          <option value="transport">Transport</option>
          <option value="groceries">Groceries</option>
          <option value="bills">Bills</option>
          <option value="food">Food</option>
          <option value="energy">Energy</option>
          <option value="entertainment">Entertainment</option>
        </select>

        <label className="budget_description">Description:</label>
        <input
          id="budget_description_input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please fill in this field"
        />

        <label className="budget_date">Date:</label>
        <DatePicker
          id="budget_datepick"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="YYYY-MM-DD"
        />

        <lable className="budget_amount">Amount:</lable>
        <div id="budget_amount_option">
          <select
            className="budget_currency"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
          >
            <option value="dollar">$</option>
            <option value="pound">£</option>
            <option value="euro">€</option>
          </select>

          <input
            className="budget_amountinput"
            placeholder="Please choose currency and add amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <button className="Add_budget" onClick={handleAddBudget}>
          Add Budget
        </button>
        {/* alert */}
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      {/* <div>
        Budget Data:
        {budgetData && (
          <div>
            Category: {budgetData.category_name}
            <br />
            Description: {budgetData.budget_description}
            <br />
            Amount: {budgetData.limit_amount}
            <br />
            Date:{" "}
            {budgetData.budget_date ? budgetData.budget_date.toString() : ""}
            <br />
          </div>
        )}
      </div> */}
    </div>
  );
}
