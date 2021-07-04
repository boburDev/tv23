import MovieInfo from '../movieInfo/movieInfo'
import MoviePlayerContainer from '../moviePlayerContainer/moviePlayerContainer'
import Actor from '../../actors/actor'
export default function SignleMovie() {
    return(
        <>
            <MoviePlayerContainer />
            <MovieInfo />
            <Actor />
        </>
    )
}