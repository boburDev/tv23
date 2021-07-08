import LivePlayerContainer from '../livePlayerContainer/livePlayerContainer'
import Comments from '../../comments/comments'
import { useSharing } from '../../../context/shareLink'
import ShareLink from '../../shareMovie/shareMovie'
import { useApi } from '../../../context/api'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
// import Socket from '../socket/socket'
import { useSocket } from '../../../context/socket'

export default function SignleMovie() {
    const [api] = useApi()
    const [openModal] = useSharing()
    const params = useParams()
    const [movie, setMovie] = useState({})
    const [socket] = useSocket()

    async function Movie(api, params) {
        const movie = await axios.get(api + '/movie-one', {
            headers: {
                Authorization: localStorage.getItem('access_token') || 1
            },
            params: {
                movieId: params && params.movieid
            }
        })
        setMovie(movie.data.data)
    }

    
    

    useEffect(()=>{
        Movie(api, params)
    }, [params,api, socket])

    return(
        <>
            <LivePlayerContainer movie={movie} api={api} />
            <Comments />
            {
                openModal && <ShareLink />
            }
            {/* <Socket api={api} /> */}
        </>
    )
}