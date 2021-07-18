import MovieInfo from "../movieInfo/movieInfo"
import MoviePlayerContainer from "../moviePlayerContainer/moviePlayerContainer"
import Actor from "../../actors/actor"
import Ads from "../../ads/ads"
import Category from "../../categories/category/category"
import Comments from "../../comments/comments"
import { useSharing } from "../../../context/shareLink"
import ShareLink from "../../shareMovie/shareMovie"
import { useApi } from "../../../context/api"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
export default function SignleMovie() {
  const [api] = useApi()
  const [openModal] = useSharing()
  const params = useParams()
  const [movie, setMovie] = useState({})
  const [actors, setActors] = useState([])
  const [directors, setDirectors] = useState([])
  const [similarMovie, setSimilarMovie] = useState([])

  async function getActors(api, params) {
    const res = await axios.get(
      `${api}/movie-actors?movieId=${params && params.movieid}`
    )
    setActors(res.data.data)
  }

  async function getDirector(api, params) {
    const res = await axios.get(
      `${api}/movie-directors?movieId=${params && params.movieid}`
    )
    setDirectors(res.data.data)
  }

  async function getMovies(api, params, movie) {
    const res = await axios.get(`${api}/similar-movies/`, {
      params: {
        movieId: params && params.movieid,
        categoryName: movie && movie.category_name,
      },
    })
    setSimilarMovie(res.data.data)
  }

  async function MovieDetail(api, params) {
    try {
		// console.log(params && params.movieid)
		// console.log(localStorage.getItem("Authorization") || 1)
		const movies = await axios.get(api + "/movie-one", {
			params: {
				movieId: params && params.movieid,
			},
			headers: {
				Authorization: localStorage.getItem("Authorization") || 1,
			},
			})
		setMovie(movies.data.data)
	} catch (error) {
		
	}
  }


  useEffect(() => {
    if (movie && movie.category_id) {
      getMovies(api, params, movie)
    }
  }, [movie, params, api])

  useEffect(() => {
    if (api) {
      MovieDetail(api, params)
      getActors(api, params)
      getDirector(api, params)
    }
  }, [params, api])


  return (
    <>
      <MoviePlayerContainer movie={movie && movie} api={api} />
      <MovieInfo movie={movie} api={api} />
      <Ads />
      <Actor creator={directors} actors={actors} api={api} />
      <Category
        showAllLinkText={false}
        title="Похожие сериалы"
        movies={similarMovie}
      />
      <Comments />
      {openModal && <ShareLink />}
    </>
  )
}
