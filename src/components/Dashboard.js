import { useJwt } from "react-jwt";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import LinearProgress from "@mui/material/LinearProgress";
import "./styles/dashboard.css";
import IconHome from "./svg/IconHome";
import { DataContext } from "../context/DataContext";
import { ConstructionOutlined, FunctionsOutlined } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import { MenuItem, InputLabel } from "@mui/material";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

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
import { Refresh } from "plaid-threads";
import { Container, Box } from "@mui/material";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const {
    categories,
    setCategories,
    categoriesObj,
    budgetData,
    setBudgetData,
    tranData,
    setTranData,
  } = useContext(DataContext);

  //===========================
  //Library Initialization
  //===========================

  // init Swiper:
  const swiper = new Swiper(".swiper", {
    // effect: "cards",
    // cardsEffect: {
    //   // ...
    // },

    direction: "horizontal",
    loop: true,

    // pagination: {
    //   el: ".swiper-pagination",
    // },

    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
  });

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
  const [filter, setFilter] = useState("month");
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);

  // =============================================================================================
  // =============================================================================================
  // =========================================================================
  // filtering Data
  // ========================================================================

  useEffect(() => {
    const now = new Date();
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    setEndDate(today);
    const last5Years = new Date(
      now.getFullYear() - 5,
      now.getMonth(),
      now.getDate()
    ).getTime();
    setStartDate(last5Years);
  }, []);

  useEffect(() => {
    const now = new Date();
    if (filter === "week") {
      const lastWeek = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      ).getTime();
      setStartDate(lastWeek);
    }
    if (filter === "month") {
      const lastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      ).getTime();
      setStartDate(lastMonth);
    }
    if (filter === "3months") {
      const last3Months = new Date(
        now.getFullYear(),
        now.getMonth() - 3,
        now.getDate()
      ).getTime();
      setStartDate(last3Months);
    }
    if (filter === "6months") {
      const last6Months = new Date(
        now.getFullYear(),
        now.getMonth() - 6,
        now.getDate()
      ).getTime();
      setStartDate(last6Months);
    }
    if (filter === "year") {
      const lastYear = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate()
      ).getTime();
      setStartDate(lastYear);
    }
    if (filter === "all") {
      const last5Years = new Date(
        now.getFullYear() - 5,
        now.getMonth(),
        now.getDate()
      ).getTime();
      setStartDate(last5Years);
    }
  }, [filter]);

  useEffect(() => {
    const filtered = tranData?.filter((data) => {
      const timestampDate = new Date(data.tran_date).getTime();
      return timestampDate < endDate && timestampDate > startDate;
    });
    setFilteredData(filtered);
  }, [tranData, endDate, startDate]);

  const creditTrans = filteredData?.filter((trans) => trans.tran_sign === "CR");
  // setCreditTrans(creditTrans);
  const debitTrans = filteredData?.filter((trans) => trans.tran_sign === "DR");

  // setDebitTrans(debitTrans);
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

  let expensesSumBudgets = 0;
  categories.map((category) => {
    if (category.limit > 0) {
      expensesSumBudgets = expensesSumBudgets + category.spent;
    }
  });
  //==============================================================
  //calculate budgets
  //===============================================================

  const budgetSum = budgetData?.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.limit_amount),
    0
  );

  //expected to save
  const savings = incomeSum - budgetSum - expensesSum;

  //graphic bars
  const spentBar = (expensesSum * 100) / incomeSum;
  const budgetBar = (expensesSumBudgets * 100) / budgetSum;

  // =========================================================================
  // filtering Data
  // ========================================================================

  console.log("filtered Data", filteredData);
  // console.log("tranData", tranData);
  // console.log("categories", categories);
  // console.log("categoriesObj", categoriesObj);
  // console.log("savings", savings);
  // console.log("budgetData", budgetData);
  // console.log("incomeSum:", incomeSum);
  // console.log("expensesSum:", expensesSum);
  // console.log("spentbar:", spentBar);
  console.log("sumBudgets", expensesSumBudgets);
  console.log("endDate", endDate);
  console.log("################### filteredDat In Dashboard", filteredData);

  const categoryIcons = {
    bills: IconBills,
    communication: IconCommunication,
    eatingOut: IconEatingOut,
    education: IconEducation,
    entertainment: IconEntertainment,
    groceries: IconGroceries,
    insurance: IconInsurance,
    medicine: IconMedicine,
    others: IconOthers,
    pets: IconPets,
    rent: IconRent,
    repairs: IconRepairs,
    transport: IconTransportation,
    work: IconWork,
    food: IconEatingOut,
    others: IconOthers,
  };

  return (
    <Container 
    sx={{
      paddingTop: "100px", 
      maxWidth: "sm",
      minHeight: "100vh",
    }}
    >
      <Grid container spacing={2} className="dash-container">
        
        <Grid item xs={12} className="dash-progress">
          <p className="dash-expected">Expected savings</p>
          <h2 className="dash-h2">{savings} $</h2>

          <div className="linear-progress-container1">
            <span className="progress-left">{expensesSum} $</span>
            <span className="progress-right">{incomeSum} $</span>
            <LinearProgress
              variant="determinate"
              value={spentBar > 100 ? 100 : spentBar}
            />
          </div>
          <h5 className="spent-title">Budget</h5>
          <div className="linear-progress-container2">
            <span className="progress-left">{expensesSumBudgets} $</span>
            <span className="progress-right">{budgetSum} $</span>
            <LinearProgress
              variant="determinate"
              value={budgetBar > 100 ? 100 : budgetBar}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <Charts />
        </Grid>
        
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


      <Grid item xs={12}>
        <h3 className="dash-title">Monthly Budgets</h3>
        <Box className="swiper">
          <Box className="swiper-wrapper">
            {budgetData?.map((each) => (
              <Box className="swiper-slide">
                <Box className="dash-budget">
                 
                  {(() => {
                    const Icon =
                      categoryIcons[
                        each.category_name ? each.category_name : "others"
                      ];

                    return <Icon />;
                  })()}
                  <Box className="dash-budget-title">
                    <h2 className="dash-budget-title">{each.category_name}</h2>
                    <p className="dash-budget-info">
                      {categoriesObj[each.category_name]
                        ? Number(each.limit_amount) -
                          categoriesObj[each.category_name].spent
                        : Number(each.limit_amount)}
                      $ remaining
                    </p>
                  </Box>
                </Box>

                <Box className="linear-progress-container2">
                  <h6 className="progress-left">
                    {categoriesObj?.hasOwnProperty(each.category_name)
                      ? `${categoriesObj[each.category_name].spent} $`
                      : "0 $"}
                  </span>
                  <span className="progress-right">{each.limit_amount} $</span>
                  <LinearProgress
                    variant="determinate"
                    // value={(() => {
                    //   if (categoriesObj[each.category_name]) {
                    //     const percentage =
                    //       (categoriesObj[each.category_name].spent *
                    //         100 *
                    //         100) /
                    //       categoriesObj[each.category_name.limit];
                    //     return percentage > 100 ? 100 : percentage;
                    //   }
                    // })()}
                    value={
                      categoriesObj[each.category_name] &&
                      categoriesObj[each.category_name].spent <
                        categoriesObj[each.category_name].limit
                        ? (categoriesObj[each.category_name].spent * 100) /
                          categoriesObj[each.category_name].limit
                        : categoriesObj[each.category_name] &&
                          categoriesObj[each.category_name].spent !== 0
                        ? 100
                        : 0
                    }
                    // value={50}
                  />
                </Box>
            
              </Box>
            ))}
             
          </Box>
            <Box class="swiper-pagination"></Box>
            <Box class="swiper-scrollbar"></Box>
        </Box>
        </Grid>
      </Grid>
     


    </Container>
  );
}
