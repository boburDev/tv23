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
import Loader from '../../loader/loader'

import { useEffect, useState } from "react"
export default function SignleMovie({ serial }) {
  const [api] = useApi()
  const [openModal] = useSharing()
  const params = useParams()
  const [movie, setMovie] = useState({})
  const [actors, setActors] = useState([])
  const [directors, setDirectors] = useState([])
  const [similarMovie, setSimilarMovie] = useState([])
  const [loadng, setLoading] = useState(false)

  async function getActors(api, params) {
	setLoading(true)
    const res = await axios.get(
      `${api}/movie-actors?movieId=${params && params.movieid}`
    )
    setActors(res.data.data)
	setLoading(false)
  }

  async function getDirector(api, params) {
	setLoading(true)
    const res = await axios.get(
      `${api}/movie-directors?movieId=${params && params.movieid}`
    )
	setLoading(false)
    setDirectors(res.data.data)
  }

  async function getMovies(api, params, movie) {
	setLoading(true)
    const res = await axios.get(`${api}/similar-movies/`, {
      params: {
        movieId: params && params.movieid,
        categoryName: movie && movie.category_name,
      },
    })
	setLoading(false)
    setSimilarMovie(res.data.data)
    console.log(res.data.data)
  }

  async function MovieDetail(api, params) {
    try {
		setLoading(true)
		const movies = await axios.get(api + "/movie-one", {
			params: {
				movieId: params && params.movieid,
			},
			headers: {
				Authorization: localStorage.getItem("Authorization") || 1,
			},
			})
		setLoading(false)
		setMovie(movies.data.data)
	} catch (error) {
		
	}
  }
  
  async function MovieSerialDetail(api, params) {
    try {
		const movies = await axios.get(api + "/serial-one", {
			params: {
				movieId: params && params.serialid,
			}
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
      getActors(api, params)
      getDirector(api, params)
	  if (serial) {
		MovieSerialDetail(api, params)
	  } else {
		MovieDetail(api, params)
	  }
    }
  }, [params, api, serial])


  return (
    <>
    {
      loadng && <Loader />
    }
      <MoviePlayerContainer movie={movie && movie} api={api} />
      <MovieInfo movie={movie} api={api} />
      <Ads />
      <Actor creator={directors} actors={actors} api={api} />
      <Category
        showAllLinkText={false}
        title="Похожие сериалы"
        movies={similarMovie}
      />
      <Comments api={api} film_id={params && params.movieid} />
      {openModal && <ShareLink />}
    </>
  )
}
