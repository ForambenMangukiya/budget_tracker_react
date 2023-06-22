import { useJwt } from "react-jwt";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import LinearProgress from "@mui/material/LinearProgress";
import "./styles/dashboard.css";
import IconHome from "./svg/IconHome";
import { DataContext } from "../context/DataContext";
import { FunctionsOutlined } from "@mui/icons-material";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);

  const { tranData, setTranData } = useContext(DataContext);
  const { budgetData, setBudgetData } = useContext(DataContext);

  console.log("decodedToken", decodedToken);

  const timeperiod = "3months";
  //TODO : there is no decodedToken.name.
  // Need to fetch from user by user object id to get the name

  useEffect(() => {
    // getting all transactions for one user within specific period
    const getData = async function () {
      try {
        const res = await fetch(
          `http://localhost:8080/transaction?timeperiod=${timeperiod}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setTranData(data);
        // setLoading(false)
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    };
    // getting all budgets for one user
    const getBudget = async function () {
      try {
        const res = await fetch(
          `http://localhost:8080/users/${decodedToken._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setBudgetData(data);
        // setLoading(false)
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    };
    if (token) {
      getData();
      getBudget();
    }
  }, [token]);

  console.log("transaction data:", tranData);
  console.log("Budget data:", budgetData);
  console.log("decoded token id:", decodedToken);

  //find all credit transactions
  // creditTrans = tranData.filter((trans) => (trans.transign = "CR"));
  //find all debit transactions
  //calculate budgets

  return (
    <div>
      <div className="dash-container">
        <div className="dash-progress">
          <p className="dash-expected">Expected savings</p>
          <h2 className="dash-h2">1250,00 €</h2>

          <div className="linear-progress-container1">
            <h6 className="progress-left">Budget</h6>
            <span className="progress-right">amount</span>
            <LinearProgress variant="determinate" value={50} />
          </div>

          <div className="linear-progress-container2">
            <h6 className="progress-left">spent</h6>
            <span className="progress-right">amount</span>
            <LinearProgress variant="determinate" value={70} />
          </div>
        </div>
        <div>
          <h3 className="dash-title">Top spending</h3>
          <div className="dash-topSpending">
            <div>
              <img className="dash-icon" src="../img/education.png" />
              <p className="dash-icon-title">title</p>
            </div>
            <div>
              <img className="dash-icon" src="../img/entertainment.png" />
              <p className="dash-icon-title">title</p>
            </div>
            <div>
              <img className="dash-icon" src="../img/bills.png" />
              <p className="dash-icon-title">title</p>
            </div>
            <div>
              <img className="dash-icon" src="../img/medicine.png" />
              <p className="dash-icon-title">title</p>
            </div>
          </div>
          <h3 className="dash-title">Monthly Budgets</h3>
          <div className="dash-progress">
            <div className="dash-budget">
              <img className="dash-icon" src="../img/education.png" />
              <div className="dash-budget-title">
                <h2 className="dash-budget-title">Title</h2>
                <p className="dash-budget-info">Budget 260€ / Month</p>
              </div>
            </div>
            <div className="linear-progress-container2">
              <h6 className="progress-left">amount</h6>
              <span className="progress-right">amount</span>
              <LinearProgress variant="determinate" value={60} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
