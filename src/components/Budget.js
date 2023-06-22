import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/budget.css";

// Rest of your code
export default function Budget() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("$");
  const [amount, setAmount] = useState("");

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAddExpense = () => {
    // Add our logic here to handle the expense addition
    console.log("Expense added");
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
        <select id="budget_select_category">
          <option>Please choose the category</option>
          <option value="budget_transport">Transport</option>
          <option value="budget_groceries">Groceries</option>
          <option value="budget_bills">Bills</option>
          <option value="budget_food">Food</option>
          <option value="budget_energy">Energy</option>
          <option value="budget_entertainment">Entertainment</option>
        </select>

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
            placeholder="Please add your amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <button className="Add_budget" onClick={handleAddExpense}>
          Add Budget
        </button>
      </div>
    </div>
  );
}
