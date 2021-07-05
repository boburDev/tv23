import MovieInfo from '../movieInfo/movieInfo'
import MoviePlayerContainer from '../moviePlayerContainer/moviePlayerContainer'
import Actor from '../../actors/actor'
import Ads from '../../ads/ads'
import Category from '../../categories/category/category'
import Comments from '../../comments/comments'
export default function SignleMovie() {
    return(
        <>
            <MoviePlayerContainer />
            <MovieInfo />
            <Ads />
            <Actor />
            <Category title="Похожие сериалы" movies={[]} />
            <Comments />
        </>
    )
}