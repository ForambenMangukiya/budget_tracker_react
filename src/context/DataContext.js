import { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [tranData, setTranData] = useState();

  //   useEffect(() => {
  //     first;

  //     return () => {
  //       second;
  //     };
  //   }, [third]);

  return (
    <DataContext.Provider value={{ tranData, setTranData }}>
      {props.children}
    </DataContext.Provider>
  );
}
