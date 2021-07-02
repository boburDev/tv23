import { useState } from 'react'
import './movieItem.css'

import { Link } from 'react-router-dom'
import { useTheme } from '../../context/theme'
// import { useApi } from '../../context/api'

export default function MovieItem({ movie = {} }) {

    // const [api] = useApi()
    const [imageLoaded, setImageLoaded] = useState(false)
    const [dark] = useTheme()

    // console.log(api)

    return (
        <>
        {
            movie && <Link
            to={`/categories/${movie && movie.category_id}/${movie && movie.movie_id}`}
            className="container-link">
    
                <div className={`imgBox ${movie && imageLoaded ? '' : 'animate'}`}>
                    <img
                    onLoad={()=>{setImageLoaded(true)}}
                    src={`${movie.movie_thumnail_path}`}
                    style={{visibility:movie && imageLoaded ? '' : 'hidden'}}
                    alt=""/>
                </div>
    
                <div
                className={`title ${movie ? '' : 'animate'}`}
                style={{color:dark ? ' ': 'black'}}>
                    {movie &&  movie.movie_name}
                </div>
    
                <div
                className={`description ${movie ? '' : 'animate'}`}
                style={{color:dark ? ' ': 'black'}}>
                    Janri: { movie && movie?.movie_genre && movie.movie_genre.toString().split(',').join(', ')}
                </div>
            </Link>
        }
        </>
    )
}
