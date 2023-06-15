import React from 'react';
import './App.css';
import AddExpense from './components/AddExpense';
import AddIncome from './components/AddIncome';
import Budget from './components/Budget';
import Dashboard from './components/Dashboard';
import Landingpage from './components/Landingpage';
import Login from './components/Login';
import Registration from './components/Registration';
import Reports from './components/Reports';
import Transactions from './components/Transactions';


function App() {
  return (
    <div className="App">

      <h1>Welcome to PiggyBank</h1>

      <AddExpense />
      <AddIncome />
      <Budget />
      <Dashboard />
      <Landingpage />
      <Login />
      <Registration />
      <Reports />
      <Transactions />

    </div>
  );
}

export default App;
