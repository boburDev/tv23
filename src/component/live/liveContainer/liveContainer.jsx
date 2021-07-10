import LivePlayerContainer from '../livePlayerContainer/livePlayerContainer'
import UserLivePlayerContainer from '../livePlayerContainer/userLivePlayerContainer'
import { useApi } from '../../../context/api'
import { useAuth } from '../../../context/user'
import { useEffect, useState } from 'react'

export default function SignleMovie() {
    const [api] = useApi()
    const [auth] = useAuth()
    const [status,setStatus] = useState(1)

    useEffect(()=>{
        if (typeof auth === 'object' && auth) {
            const status = auth && auth.status
            setStatus(status)
        }
    },[auth])


    return(
        <>
            {
                (status === 23) ? <LivePlayerContainer movie={[]} api={api} /> :
                <UserLivePlayerContainer movie={[]} api={api} />
            }
        </>
    )
}