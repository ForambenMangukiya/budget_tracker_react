// import React from "react";
import { useContext } from "react";
import "./App.css";
import AddExpense from "./components/AddExpense";
import AddIncome from "./components/AddIncome";
import Budget from "./components/Budget";
import Dashboard from "./components/Dashboard";
import Landingpage from "./components/Landingpage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Reports from "./components/Reports";
import Transactions from "./components/Transactions";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { token } = useContext(AuthContext);
  console.log("token:", token);

  return (
    <div className="App">
      {/* <h1>Welcome to PiggyBank</h1>
      <Navbar />
      <Landingpage /> */}
      {token ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
          <Route path="/addexpense" element={<AddExpense />} />
          <Route path="/addincome" element={<AddIncome />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      )}
    </div>
  );
}

export default App;
