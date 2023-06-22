import { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [tranData, setTranData] = useState();
  const [budgetData, setBudgetData] = useState();

  return (
    <DataContext.Provider
      value={{ tranData, setTranData, budgetData, setBudgetData }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
