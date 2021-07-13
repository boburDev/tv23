import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "./api";
import IO from "socket.io-client";
const Context = createContext();

const SocketProvider = ({ children }) => {
  const [state, setState] = useState("");
  const [api] = useApi();
  const isTester = true;

  useEffect(() => {
    if (isTester) {
      setState(
        IO(api + "/live", {
          path: "/socket.io",
          transports: ["websocket"],
          autoConnect: false,
        })
      );
    } else {
      setState(
        IO(api + "/live", {
          path: "/socket.io",
          transports: ["websocket"],
          autoConnect: false,
        })
      );
    }
  }, [isTester, api]);

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

const useSocket = (setterOnly) => {
  const { state, setState } = useContext(Context);
  return setterOnly ? [setState] : [state, setState];
};

export { SocketProvider, useSocket };
