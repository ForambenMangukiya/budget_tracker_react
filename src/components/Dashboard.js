import { useJwt } from "react-jwt";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import LinearProgress from "@mui/material/LinearProgress";
import "./styles/dashboard.css";
import IconHome from "./svg/IconHome";
import { DataContext } from "../context/DataContext";
import { ConstructionOutlined, FunctionsOutlined } from "@mui/icons-material";

import Swiper from "swiper/bundle";
import "swiper/css/bundle";

//importing SVG -------------------
import { ReactComponent as IconAddNew } from "./svgCategories/add-new.svg";
import { ReactComponent as IconBills } from "./svgCategories/bills.svg";
import { ReactComponent as IconCommunication } from "./svgCategories/communication.svg";
import { ReactComponent as IconEatingOut } from "./svgCategories/eating-out.svg";
import { ReactComponent as IconEducation } from "./svgCategories/education.svg";
import { ReactComponent as IconEntertainment } from "./svgCategories/entertainment.svg";
import { ReactComponent as IconGroceries } from "./svgCategories/groceries.svg";
import { ReactComponent as IconInsurance } from "./svgCategories/insurance.svg";
import { ReactComponent as IconMedicine } from "./svgCategories/medicine.svg";
import { ReactComponent as IconOthers } from "./svgCategories/others.svg";
import { ReactComponent as IconPets } from "./svgCategories/pets.svg";
import { ReactComponent as IconRent } from "./svgCategories/rent.svg";
import { ReactComponent as IconRepairs } from "./svgCategories/repairs.svg";
import { ReactComponent as IconTransportation } from "./svgCategories/transportation.svg";
import { ReactComponent as IconWork } from "./svgCategories/work.svg";
import Charts from "./Chart";

export default function Dashboard() {
  // const { token } = useContext(AuthContext);
  // const { decodedToken } = useJwt(token);
  // const {
  //   categories,
  //   setCategories,
  //   categoriesObj,
  //   budgetData,
  //   setBudgetData,
  //   tranData,
  //   setTranData,
  // } = useContext(DataContext);

  // //===========================
  // //Library Initialization
  // //===========================

  // // init Swiper:
  // const swiper = new Swiper(".swiper", {
  //   effect: "cards",
  //   cardsEffect: {
  //     // ...
  //   },

  //   direction: "horizontal",
  //   loop: true,

  // pagination: {
  //   el: ".swiper-pagination",
  // },

  //   scrollbar: {
  //     el: ".swiper-scrollbar",
  //     draggable: true,
  //   },
  // });

  // ===========================
  // useStates
  // ===========================

  // const [initialSpend, initialSpend] = useState();
  // const [budgetBar, setBudgetBar] = useState();
  // const [budgetSum, setBudgetSum] = useState();
  // const [spentBar, setSpentBar] = useState();
  // const [savings, setSavings] = useState();
  // const [debitTrans, setDebitTrans] = useState([]);
  // const [creditTrans, setCreditTrans] = useState([]);
  // const [incomeSum, setIncomeSum] = useState();

  // const creditTrans = tranData?.filter((trans) => trans.tran_sign === "CR");
  // // setCreditTrans(creditTrans);
  // const debitTrans = tranData?.filter((trans) => trans.tran_sign === "DR");

  // // setDebitTrans(debitTrans);
  // const incomeSum = creditTrans.reduce(
  //   (accumulator, currentValue) =>
  //     accumulator + Number(currentValue.tran_amount),
  //   0
  // );

  // const expensesSum = debitTrans.reduce(
  //   (accumulator, currentValue) =>
  //     accumulator + Number(currentValue.tran_amount),
  //   0
  // );

  // const expensesSumBudgets = categories.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue.spent,
  //   0
  // );
  // // console.log("expensesSumBudgets", expensesSumBudgets);

  // //calculate budgets

  //calculate budgets
  // console.log("%%Budget DAta", budgetData);
  // const budgetSum = budgetData?.reduce(
  //   (accumulator, currentValue) =>
  //     accumulator + Number(currentValue.limit_amount),
  //   0
  // );
  // setBudgetSum(budgetSum);
  // setIncomeSum(incomeSum);

  //expected to save
  // const savings = incomeSum - budgetSum + expensesSum;
  // setSavings(incomeSum - budgetSum);

  // console.log("income:", incomeSum);
  // console.log("expenses:", expensesSum);
  // console.log("budget:", budgetSum);

  //graphic bars
  // const spentBar = (expensesSum * 100) / incomeSum;
  // const budgetBar = (expensesSumBudgets * 100) / budgetSum;

  // setBudgetBar((budgetSum * 100) / incomeSum);
  // setSpentBar((expensesSum * 100) / budgetSum);

  //================
  //Top Spendings
  //================

  // setCategories(sortedArray);

  //console.logs

  // console.log("tranData", tranData);
  // console.log("categories", categories);
  // console.log("categoriesObj", categoriesObj);
  // console.log("savings", savings);
  // console.log("budgetData", budgetData);
  // console.log("incomeSum:", incomeSum);
  // console.log("expensesSum:", expensesSum);
  // console.log("spentbar:", spentBar);

  // const categoryIcons = {
  //   bills: IconBills,
  //   communication: IconCommunication,
  //   eatingOut: IconEatingOut,
  //   education: IconEducation,
  //   entertainment: IconEntertainment,
  //   groceries: IconGroceries,
  //   insurance: IconInsurance,
  //   medicine: IconMedicine,
  //   others: IconOthers,
  //   pets: IconPets,
  //   rent: IconRent,
  //   repairs: IconRepairs,
  //   transport: IconTransportation,
  //   work: IconWork,
  //   food: IconEatingOut,
  //   others: IconOthers,
  // };

  return (
    <div>
      {/*       
      <div className="dash-container">
        <div className="dash-progress">
          <p className="dash-expected">Expected savings</p>
          <h2 className="dash-h2">{savings} $</h2>

          <div className="linear-progress-container1">
            <h6 className="progress-left">spent</h6>
            <span className="progress-right">{incomeSum} $</span>
            <LinearProgress
              variant="determinate"
              value={spentBar > 100 ? 100 : spentBar}
            />
          </div>

          <div className="linear-progress-container2">
            <h6 className="progress-left">budget</h6>
            <span className="progress-right">{budgetSum} $</span>
            <LinearProgress
              variant="determinate"
              value={budgetBar > 100 ? 100 : budgetBar}
            />
          </div>
        </div>
        <Charts />
         */}

      {/* <h3 className="dash-title">Top spending</h3>
        <div className="dash-topSpending">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.name];
            return (
              <div>
                <IconComponent />
                <p className="dash-icon-title">{category.name}</p>
              </div>
            );
          })}
        </div> */}

      {/* 
        <h3 className="dash-title">Monthly Budgets</h3>
        <div className="swiper">
          <div className="swiper-wrapper">
            {budgetData?.map((each) => (
              <div className="swiper-slide">
                <div className="dash-budget">
                 
                  {(() => {
                    const Icon =
                      categoryIcons[
                        each.category_name ? each.category_name : "others"
                      ];

                    return <Icon />;
                  })()}
                  <div className="dash-budget-title">
                    <h2 className="dash-budget-title">{each.category_name}</h2>
                    <p className="dash-budget-info">
                      {Number(each.limit_amount) - Number(each.spent)} $
                      remaining
                    </p>
                  </div>
                </div>

                <div className="linear-progress-container2">
                  <h6 className="progress-left">
                    {categoriesObj?.hasOwnProperty(each.category_name)
                      ? `${categoriesObj[each.category_name].spent} $`
                      : "0 $"}
                  </h6>
                  <span className="progress-right">{each.limit_amount} $</span>
                  <LinearProgress
                    variant="determinate"
                    // value={categoriesObj[each.category_name] ? 90 : 20}
                    value={
                      categoriesObj[each.category_name]
                        ? (categoriesObj[each.category_name].spent * 100) /
                          categoriesObj[each.category_name].limit
                        : 0
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div class="swiper-pagination"></div>

          <div class="swiper-scrollbar"></div>
        </div>
      </div> */}
    </div>
  );
}
