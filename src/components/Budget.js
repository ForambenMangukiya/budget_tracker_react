import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/budget.css";
import axios from "axios"; //last
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
// import { useJwt } from "react-jwt";

export default function Budget() {
  const { budgetData, setBudgetData, decodedToken } = useContext(DataContext);
  const { token } = useContext(AuthContext);
  console.log("budgetData:", budgetData);
  console.log("user_id:", decodedToken._id);
  // const { decodedToken } = useJwt();

  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("$");
  const [amount, setAmount] = useState(""); //last
  const [category_name, setCategory] = useState("");

  const handleAddBudget = () => {
    console.log("add budget clicked");
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
      })
      .catch((error) => {
        console.error("Error fetching budget data:", error);
      });
  };

  const handlecategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // const handleAddBudget = () => {
  //   console.log("Budget added");
  // };

  //last
  // const handleAddBudget = () => {
  //   updateUserBudgetData();
  // const formattedDate = selectedDate
  //   ? selectedDate.toLocaleDateString()
  //   : null;

  // const newBudgetData = {
  //   category_name: document.getElementById("budget_select_category").value,
  //   budget_description: description,
  //   limit_amount: selectedCurrency + amount,
  //   budget_date: selectedDate,
  // };

  // setBudgetData(newBudgetData);

  // if (decodedToken && decodedToken.id) {
  //   axios
  //     .put(`http://localhost:8080/users/${decodedToken._id}`, newBudgetData)
  //     .then((response) => {
  //       console.log("Budget added");

  //       // Call a function to send email
  //       sendEmail(budgetData);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding budget:", error);
  //     });
  // }
  // };

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
      </div>
      <div>
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
      </div>
    </div>
  );
}
