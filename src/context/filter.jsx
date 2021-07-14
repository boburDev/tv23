import { createContext, useContext, useState } from "react";

const Context = createContext();

const FilterProvider = ({ children }) => {
  const [state, setState] = useState(true);

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

const useFilter = (setterOnly) => {
  const { state, setState } = useContext(Context);
  return setterOnly ? [setState] : [state, setState];
};

export { FilterProvider, useFilter };
