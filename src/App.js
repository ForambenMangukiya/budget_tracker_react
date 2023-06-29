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
import Menu from "./components/Menu";
import Client from "./plaid/Client";
import LandingPage2 from "./components/LandingPage2";

function App() {
  const { token } = useContext(AuthContext);
  console.log("token:", token);

  return (
    <div className="App">
      {/* <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={token ? <Dashboard /> : <Navigate to="/landingpage" />}
          />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/addexpense"
            element={token ? <AddExpense /> : <Navigate to="/login" />}
          />
          <Route
            path="/addincome"
            element={token ? <AddIncome /> : <Navigate to="/login" />}
          />
          <Route
            path="/budget"
            element={token ? <Budget /> : <Navigate to="/login" />}
          />
          <Route
            path="/reports"
            element={token ? <Reports /> : <Navigate to="/login" />}
          />
          <Route
            path="/transactions"
            element={token ? <Transactions /> : <Navigate to="/login" />}
          />
          <Route
            path="/link"
            element={token ? <Client /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/login"
            element={token ? <Dashboard /> : <Navigate to="/landingpage" />}
          />
          <Route
            path="/signup"
            element={token ? <Dashboard /> : <Navigate to="/landingpage" />}
          />
        </Routes>
        <Menu />
      </div> */}

      {/* <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes> */}
      {token ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addexpense" element={<AddExpense />} />
            <Route path="/addincome" element={<AddIncome />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/link" element={<Client />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Menu />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/entrypage" element={<LandingPage2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
