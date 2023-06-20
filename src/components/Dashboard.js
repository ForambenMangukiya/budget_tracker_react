import { useJwt } from "react-jwt";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import LinearProgress from "@mui/material/LinearProgress";
import "./styles/dashboard.css";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);

  console.log("decodedToken", decodedToken);
  //TODO : there is no decodedToken.name.
  // Need to fetch from user by user object id to get the name

  return (
    <div>
      <div className="dash-container">
        <div className="dash-progress">
          <p className="dash-expected">Expected savings</p>
          <h2 className="dash-h2">1250,00</h2>
          <LinearProgress
            className="linear-progress"
            variant="determinate"
            value={40}
          />
          <LinearProgress
            className="linear-progress"
            variant="determinate"
            value={90}
          />
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

            <LinearProgress
              className="linear-progress"
              variant="determinate"
              value={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
