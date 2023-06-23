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
  const { categories, setCategories } = useContext(DataContext);

  const [budgetBar, setBudgetBar] = useState();
  const [budgetSum, setBudgetSum] = useState();
  const [spentBar, setSpentBar] = useState();
  const [savings, setSavings] = useState();
  const [debitTrans, setDebitTrans] = useState([]);
  const [creditTrans, setCreditTrans] = useState([]);
  const [incomeSum, setIncomeSum] = useState();

  console.log("decodedToken", decodedToken);

  //TODO : there is no decodedToken.name.
  // Need to fetch from user by user object id to get the name

  //find all credit&debit transactions //DR (expense) or CR(income)
  console.log(" trandata from Dashboard: ", tranData);

  useEffect(() => {
    if (tranData.length > 0) {
      setCreditTrans(tranData?.filter((trans) => trans.tran_sign === "CR"));
      setDebitTrans(tranData?.filter((trans) => trans.tran_sign === "DR"));

      const incomeSum = creditTrans.reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.tran_amount),
        0
      );

      const expensesSum = debitTrans.reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.tran_amount),
        0
      );

      //calculate budgets

      const budgetSum = budgetData?.reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.limit_amount),
        0
      );
      setBudgetSum(budgetSum);
      setIncomeSum(incomeSum);

      //expected to save

      setSavings(incomeSum - budgetSum);

      console.log("income:", incomeSum);
      console.log("expenses:", expensesSum);
      console.log("budget:", budgetSum);

      //graphic bars

      setBudgetBar((budgetSum * 100) / incomeSum);
      setSpentBar((expensesSum * 100) / budgetSum);
    }

    //================
    //Top Spendings
    //================

    const groupedObjects = debitTrans.reduce((result, obj) => {
      const { category_name, tran_amount } = obj;
      if (!result[category_name]) {
        result[category_name] = { name: category_name, spent: 0, limit: 0 };
      }
      result[category_name].spent += Number(tran_amount);
      return result;
    }, {});

    const filteredArray = Object.values(groupedObjects);
    const sortedArray = filteredArray.sort((a, b) => b.spent - a.spent);
    setCategories(sortedArray);

    console.log(groupedObjects);
    console.log("sortedArray", sortedArray);
  }, [tranData]);

  console.log("savings", savings);

  // const array = [
  //   { category_name: "transport", tran_amount: 100 },
  //   { category_name: "food", tran_amount: 200 },
  //   { category_name: "transport", tran_amount: 420 },
  //   { category_name: "food", tran_amount: 150 },
  //   { category_name: "transport", tran_amount: 100 },
  // ];

  return (
    <div>
      <div className="dash-container">
        <div className="dash-progress">
          <p className="dash-expected">Expected savings</p>
          <h2 className="dash-h2">{savings} $</h2>

          <div className="linear-progress-container1">
            <h6 className="progress-left">Budget</h6>
            <span className="progress-right">{incomeSum} $</span>
            <LinearProgress
              variant="determinate"
              value={budgetBar > 100 ? 100 : budgetBar}
            />
          </div>

          <div className="linear-progress-container2">
            <h6 className="progress-left">spent</h6>
            <span className="progress-right">{budgetSum} $</span>
            <LinearProgress
              variant="determinate"
              value={spentBar > 100 ? 100 : spentBar}
            />
          </div>
        </div>
        <div>
          <h3 className="dash-title">Top spending</h3>
          <div className="dash-topSpending">
            {categories.map((category) => (
              <div>
                <img className="dash-icon" src="../img/education.png" />
                <p className="dash-icon-title">{category.name}</p>
              </div>
            ))}
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
