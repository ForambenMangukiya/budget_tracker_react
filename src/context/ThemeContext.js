import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeContextProvider(props) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const styling = {
    backgroundColor: theme === "dark" ? "var(--bg-main)" : "white",
    backgroundBoard: theme === "dark" ? "var(--bg-board)" : "white",
    txtColor: theme === "dark" ? "white" : "black",
    borders: theme === "dark" ? "1px solid white" : "1px solid var(--grey4)",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, styling }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
