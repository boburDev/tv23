import { createContext, useContext, useState } from "react";

const Context = createContext();

const ThemeProvider = ({ children }) => {
  const [state, setState] = useState(
    parseInt(window.localStorage.getItem("dark_mode")) === 0 ? false : true
  );

  const value = {
    state,
    setState,
  };
  return (
    <Context.Provider value={value}>
      <Context.Consumer>{() => children}</Context.Consumer>
    </Context.Provider>
  );
};

const useTheme = (setterOnly) => {
  const { state, setState } = useContext(Context);
  return setterOnly ? [setState] : [state, setState];
};

export { ThemeProvider, useTheme };
