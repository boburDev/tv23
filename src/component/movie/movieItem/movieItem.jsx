import { useState } from 'react'
import st from './movieItem.module.css'
import { Link, useParams } from 'react-router-dom'
import { useTheme } from '../../../context/theme'
import { useApi } from '../../../context/api'

export default function MovieItem({ movie = {} }) {
    const language = useParams()
    const [dark] = useTheme()
    const [api] = useApi()
    const [imageLoaded, setImageLoaded] = useState(false)
    return (
        <>
        <Link
        to={`/${language.lang}/categories/${movie.category_name}/${movie.movie_id}`}
        className={st.container}>

        <div
        className={`${st.imgBox } ${movie && imageLoaded ? '' : st.animate}`}>
            <img
            onLoad={()=>{setImageLoaded(true)}}
            src={`${api}/${movie && movie.movie_thumnail_path}`}
            style={{visibility:movie && imageLoaded ? '' : 'hidden'}}
            alt=""/>
        </div>
        <div
        className={`${st.title} ${movie ? '' : st.animate}`}
        style={{color:dark ? ' ': 'black'}}>{movie &&  movie.movie_name}</div>
        <div
        className={`${st.description} ${movie ? '' : st.animate}`}
        style={{color:dark ? ' ': 'black'}}>Janri: { movie && movie?.movie_genre && movie.movie_genre.toString().split(',').join(', ')}</div>
        </Link>
        </>
    )
}