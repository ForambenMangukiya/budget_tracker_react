// import React from "react";
import { useContext } from "react";
import "./App.css";
import AddExpense from "./components/AddExpense";
import AddExpense2 from "./components/AddExpense2";
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
import Menu from "./components/Menu";

function App() {
  const { token } = useContext(AuthContext);
  console.log("token:", token);

  return (
    <div className="App">
      <Navbar />
      {/* <Landingpage /> */}
      {token ? (
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addexpense" element={<AddExpense2 />} />
            <Route path="/addincome" element={<AddIncome />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          <Menu />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      )}
    </div>
  );
}

export default App;
