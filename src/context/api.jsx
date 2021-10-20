import { createContext, useContext, useEffect, useState } from "react"

const Context = createContext()

const ApiProvider = ({ children }) => {
  const [state, setState] = useState("")
  const isTester = true

  useEffect(() => {
    // HTTPS=true npm start
    const server = {
      server_dev: "http://localhost:4000",
      server_dep: "http://aapi.23tv.uz",
    }
    
    if (isTester) {
      setState(server.server_dev)
    } else {
      setState(server.server_dep)
    }
  }, [isTester])

  const value = {
    state,
    setState,
  }
  return (
    <Context.Provider value={value}>
      <Context.Consumer>{() => children}</Context.Consumer>
    </Context.Provider>
  )
}

const useApi = (setterOnly) => {
  const { state, setState } = useContext(Context)
  return setterOnly ? [setState] : [state, setState]
}

export { ApiProvider, useApi }
