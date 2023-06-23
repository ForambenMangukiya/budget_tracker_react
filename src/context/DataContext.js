import { useState, useEffect, createContext, useContext } from "react";
import { useJwt } from "react-jwt";
import { AuthContext } from "../context/AuthContext";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [tranData, setTranData] = useState([]);
  const [budgetData, setBudgetData] = useState();
  const [categories, setCategories] = useState([]);

  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  console.log(token);

  // =============================
  // Fetching Data
  // ============================
  const timeperiod = undefined;
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
  }, [token, timeperiod]);

  //   console.log("transaction data:", tranData);
  console.log("Budget data:", budgetData);
  //   console.log("decoded token id:", decodedToken);

  return (
    <DataContext.Provider
      value={{
        tranData,
        setTranData,
        budgetData,
        setBudgetData,
        categories,
        setCategories,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
