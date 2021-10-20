import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "./api";
const Context = createContext();

const AuthorizetionProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [api] = useApi();

  async function Auth(api) {
    try {
      if (api.length) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem("Authorization") || ""
      const res = await axios.get(api + "/user-data")
      setState(res.data.data)
      }
    } catch (error) {
      setState(error.response && error.response.status)
    }
  }

  useEffect(() => {
    Auth(api);
  }, [api]);

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

const useAuth = (setterOnly) => {
  const { state, setState } = useContext(Context);
  return setterOnly ? [setState] : [state, setState];
};

export { AuthorizetionProvider, useAuth };
