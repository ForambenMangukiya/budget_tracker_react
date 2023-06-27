// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./styles/budget.css";
// import axios from "axios"; //last

// export default function Budget() {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedCurrency, setSelectedCurrency] = useState("$");
//   const [description, setDescription] = useState("");
//   const [amount, setAmount] = useState(""); //last

//   const handleCurrencyChange = (e) => {
//     setSelectedCurrency(e.target.value);
//   };

//   const handleAmountChange = (e) => {
//     setAmount(e.target.value);
//   };

//   // const handleAddBudget = () => {
//   //   console.log("Budget added");
//   // };

//   //last
//   const handleAddBudget = () => {
//     const budgetData = {
//       category_name: document.getElementById("budget_select_category").value,
//       budget_description: description,
//       limit_amount: selectedCurrency + amount,
//       budget_date: selectedDate,
//     };

//     axios
//       .post(" http://localhost:8080/users/:id/budget", budgetData)
//       .then((response) => {
//         console.log("Budget added");
//       })
//       .catch((error) => {
//         console.error("Error adding budget:", error);
//       });
//   };

//   return (
//     <div>
//       I'm in the Budget
//       <div className="budget_container">
//         {/* <label className="budget_category">Category:</label>
//         <select id="budget_category_option">
//           <option value="budget_transport">Transport</option>
//           <option value="budget_groceries">Groceries</option>
//           <option value="budget_bills">Bills</option>
//           <option value="budget_food">Food</option>
//           <option value="budget_energy">Energy</option>
//           <option value="budget_entertainment">Entertainment</option>
//         </select> */}

//         <label className="budget_category">Category Name:</label>
//         <select id="budget_select_category">
//           <option>Please choose the category</option>
//           <option value="budget_transport">Transport</option>
//           <option value="budget_groceries">Groceries</option>
//           <option value="budget_bills">Bills</option>
//           <option value="budget_food">Food</option>
//           <option value="budget_energy">Energy</option>
//           <option value="budget_entertainment">Entertainment</option>
//         </select>

//         <label className="budget_description">Description:</label>
//         <input
//           id="budget_description_input"
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Please fill in this field"
//         />

//         <label className="budget_date">Date:</label>
//         <DatePicker
//           id="budget_datepick"
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           dateFormat="yyyy-MM-dd"
//           placeholderText="YYYY-MM-DD"
//         />

//         <lable className="budget_amount">Amount:</lable>
//         <div id="budget_amount_option">
//           <select
//             className="budget_currency"
//             value={selectedCurrency}
//             onChange={handleCurrencyChange}
//           >
//             <option value="dollar">$</option>
//             <option value="pound">£</option>
//             <option value="euro">€</option>
//           </select>

//           <input
//             className="budget_amountinput"
//             placeholder="Please add your amount"
//             type="number"
//             value={amount}
//             onChange={handleAmountChange}
//           />
//         </div>
//         <button className="Add_budget" onClick={handleAddBudget}>
//           Add Budget
//         </button>
//       </div>
//     </div>
//   );
// }
