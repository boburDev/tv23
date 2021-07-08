import { createContext, useContext, useEffect, useState } from "react";
import IO from 'socket.io-client'
const Context = createContext()


const SocketProvider = ({children}) => {
    const [state,setState] = useState('')
    const isTester = true
    
    // console.log(IO('http://localhost:4000/live', {
    //     path: '/socket',
    //     transports: ['websocket']
    // }))
    
    useEffect(()=>{
        // HTTPS=true npm start

        if (isTester) {
            setState(IO('http://localhost:4000/live', {
                path: '/socket',
                transports: ['websocket']
            }))
        } else {
            setState(IO('https://23tv.uz/api/live', { transports: ['websocket'] }))
        }
    },[isTester])


    const value = {
        state,
        setState
    }
    return (
        <Context.Provider value={value}>
            <Context.Consumer>
                {
                    () => children
                }
            </Context.Consumer>
        </Context.Provider>
    )
}

const useSocket = (setterOnly) => {
    const { state, setState } = useContext(Context)
    return setterOnly ? [setState] : [state, setState]
}

export {
    SocketProvider,
    useSocket
}
