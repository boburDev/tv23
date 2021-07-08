import { useEffect, useState } from 'react'
import IO from 'socket.io-client'

export default function Socket({ api }) {
    const [connect, setConnect] = useState(false)
    const [socket, setSocket] = useState(null)

    useEffect(()=>{
        if (api) {
            setSocket(IO(api + '/live', {
                transports: ['websocket'],
                autoConnect: false,
                path: '/socket'
            }))
        }
    },[api])

    useEffect(()=>{
        if (connect) {
            socket.connect()
        } else {
            if (socket) socket.disconnect()
        }
    }, [socket, connect])

    return (
        <>
            <button onClick={() => setConnect(!connect)}>
                { connect ? 'Disconnect' : 'Connect' }
            </button>
        </>
    )
}