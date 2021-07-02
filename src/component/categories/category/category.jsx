import { useEffect, useRef, useState } from 'react'
import MovieItem from '../../movieItem/movieItem'
import './category.css'
import { Link } from 'react-router-dom'

import SliderCounterAdvanced from '../../sliderCounter/SliderCounterAdvanced'
import SliderCounterBasic from '../../sliderCounter/sliderCounterBasic'
import NoFoundVideos from '../../notFound/notFount'

import { useTheme } from '../../../context/theme'

export default function Category({title, link, loading, movies =[], visibled = 6, type='basic', showAllLink = true}) {
    const [dark] = useTheme()

    const counts = Math.ceil(movies.length/visibled>5 ? 5 : movies.length/visibled)

    const itemsWay = useRef()
    const [current, setCurrent] = useState(0)
    const [itemsWayHeight, setitemsWayHeight] = useState()

    const itemContainer = {
        height:itemsWayHeight
    }

    useEffect(()=>{
        setitemsWayHeight(itemsWay.current.innerHeight)
    }, [setitemsWayHeight])




  const movie = {
    category_id: '1234',
    movie_id: "123rgfd",
    movie_thumnail_path: "../../assets/image/ads_banner.svg",
    movie_name: "Reklama",
    movie_genre: "rek, ed, gsd, gfdvd, fvfd"
  }
    
    return (
        <div className="container">
           
           <div className="titleBox">
                <h1 style={{color: dark ? '' : 'black'}} className="titleText">{title}</h1>
                {
                    showAllLink && <Link to={link} className="title">Все</Link>
                }
            </div>

            <div style={itemContainer} ref={itemsWay}  className="items">
                    {movies && movies.length===0  ? (
                    loading ?  //if Loaded finished and no found videos
                    <>
                        <MovieItem movie={movie} />
                        <MovieItem movie={movie} />
                        <MovieItem movie={movie} />
                        <MovieItem movie={movie} />
                        <MovieItem movie={movie} />
                        <MovieItem movie={movie} />
                    </> :<NoFoundVideos />
                    ) : movies.map((item, key )=>{
                            return (<MovieItem movie={item} key={key} /> )
                        }
                    )}
                    
            </div>
            <div className="bottom">
                {movies.length>visibled  ? 
                <div className="pagination" style={{justifyContent:type==='advanced' ? 'space-between' : 'center'}}>
                {type==='advanced' ? 
                    <SliderCounterAdvanced max={counts>5 ? 5 :counts  } current={current} setCurrent={setCurrent}/>
                    : <SliderCounterBasic max={counts>5 ? 5 :counts}  current={current} setCurrent={setCurrent} />
                }
                </div> : '' }
            </div>
        </div>
    )
}
