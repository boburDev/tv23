import st from "./category.module.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import MovieItem from "../../movie/movieItem/movieItem"
import SliderCounterAdvanced from "../../sliderCounter/SliderCounterAdvanced"
import SliderCounterBasic from "../../sliderCounter/sliderCounterBasic"
import NoFoundVideos from "../../notFound/videoNotFound/notFount"
import { useTheme } from "../../../context/theme"
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage.jsx'
import { usePagination } from '../../../context/pagination'

export default function Category({
  title,
  pagination,
  link,
  loading,
  movies = [],
  count = 0,
  visibled = 6,
  showAllLink = true,
  showAllLinkText = true,
}) {
  const [dark] = useTheme()
  const [setPagination] = usePagination(true)
  const counts = (Math.ceil(movies.length / visibled > 5 ? 5 : movies.length / visibled))
  const [current, setCurrent] = useState(0)
  const [movie, setMovie] = useState([])
  const [ til ] = useLang()
  const categoryId = link && link.category_name

  useEffect(()=>{
	setPagination(current+1)
  },[current, setPagination])

  useEffect(()=>{
	setMovie(movies)
  },[movies])
  
  useEffect(()=>{
	  console.log(movie)
  },[movie])

  return (
    <div className={st.container}>
      <div className={st.category_wrapper}>
        {showAllLink && (
          <div className={st.titleBox}>
            <h1
              style={{ color: dark ? "#fff" : "#000" }}
              className={st.titleText}
            >
              {title}
            </h1>
            {showAllLinkText && (
              <Link to={link} className={st.title}>
                {Language[til].categories.category.all}
              </Link>
            )}
          </div>
        )}
        {
			(count > 0) ? <div className={st.items}>
			{movie && movie.length === 0 ? (
			  loading ? ( //if Loaded finished and no found videos
				<>
				  <MovieItem />
				  <MovieItem />
				  <MovieItem />
				  <MovieItem />
				  <MovieItem />
				  <MovieItem />
				</> 
			  ) : (
				<NoFoundVideos />
			  )
			) : (
			  movie.map(
				(item, key) =>
				<MovieItem
				caregoryId={categoryId}
				key={Math.random() * Math.random()}
				movie={item}
			  />
			  )
			)}
		  </div> : 
		  <div className={st.items}>
			{movies && movies.length === 0 ? (
			  loading ? ( //if Loaded finished and no found videos
				<>
				  <MovieItem />
				  <MovieItem />
				  <MovieItem />
				  <MovieItem />
				  <MovieItem />
				  <MovieItem />
				</> 
			  ) : (
				<NoFoundVideos />
			  )
			) : (
			  movies.map(
				(item, key) =>
				  current * visibled <= key &&
				  (current + 1) * visibled > key && (
					<MovieItem
					  caregoryId={categoryId}
					  key={Math.random() * Math.random()}
					  movie={item}
					/>
				  )
			  )
			)}
		  </div>
		}
        {
			(count > 0) ? <div className={st.bottom}>
			{
				<div className={st.pagination}
				style={{ justifyContent: pagination === "basic" ? "center" : "space-between" }}>
					<SliderCounterBasic
					  max={count}
					  current={current}
					  setCurrent={setCurrent}
					  mode={dark}
					/>
				</div>
			}
		  </div> : <div className={st.bottom}>
          {movies.length > visibled ? (
            <div
              className={st.pagination}
              style={{
                justifyContent:
                  pagination === "basic" ? "center" : "space-between",
              }}>
              {pagination === "basic" ? (
                <SliderCounterBasic
                  max={counts > 6 ? 5 : counts}
                  current={current}
                  setCurrent={setCurrent}
                  mode={dark}
                />
              ) : (
                <SliderCounterAdvanced
                  max={counts > 6 ? 5 : counts}
                  current={current}
                  setCurrent={setCurrent}
                  mode={dark}
                />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
		}
      </div>
    </div>
  )
}
