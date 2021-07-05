import MovieInfo from '../movieInfo/movieInfo'
import MoviePlayerContainer from '../moviePlayerContainer/moviePlayerContainer'
import Actor from '../../actors/actor'
import Ads from '../../ads/ads'
// import Category from '../../categories/category/category'
import Comments from '../../comments/comments'
import { useSharing } from '../../../context/shareLink'
import ShareLink from '../../shareMovie/shareMovie'
import { useApi } from '../../../context/api'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
export default function SignleMovie() {
    const [api] = useApi()
    const [openModal] = useSharing()
    const params = useParams()

    // console.log(params.movieid, params.category)

    async function Movie(api, params) {
        const movie = await axios.get(api + '/movie-one', {
            headers: {
                Authorization: localStorage.getItem('access_token') || undefined
            },
            params: {
                movieId: params && params.movieid
            }
        })
        console.log(movie)
    }

    useEffect(()=>{
        Movie(api, params)

    }, [params,api])

    return(
        <>
            <MoviePlayerContainer movie={''} api={''} />
            <MovieInfo />
            <Ads />
            <Actor />
            {/* <Category title="Похожие сериалы" movies={[]} /> */}
            <Comments />
            {
                openModal && <ShareLink />
            }
        </>
    )
}