import { useRef, useState } from 'react'
import st from './signleMovie.module.css'
import { Link } from 'react-router-dom'
import rateStars from '../../../assets/image/rates.png'
import { useTheme } from '../../../context/themer'

export default function SingleMovieInfo({ movie, api }) {
    
    const innerDescription = useRef()
    const [collapseDesc, setCollapseDesc] = useState(false)
    const {dark} = useTheme()

    const descStyle = {
        height :(!collapseDesc ? 48+'px' :'auto')
    }

    const setCollapse=()=>{
        setCollapseDesc(x=>!x)
        console.log(innerDescription.current.innerHeight)
    }

    return (
        <div className={st.movieWrapper}>
            <div className={st.movieIntro}>
                <div className={st.filmBio}>
                    <div className={st.moviePicture}>
                        <div className={st.film_img}>
                            <img src={`${api}/${movie && movie.movie_thumnail_path}`} alt="film_picture"/>
                            <div className={st.img_rate}>
                                <p className={st.info_text}>Рейтинг:</p>
                                <img src={rateStars} alt="rate" height="5"/>
                            </div>
                        </div>    
                    </div>
                    <div className={st.movieInfo}>
                        
                        <div className={st.moviData}>
                            <p className={st.info_text}>Производство:</p>
                            <span  style={{color:dark ? '' : 'black'}}>{movie && movie.country_name}</span>
                        </div>
                        <div className={st.moviData}>
                            <p className={st.info_text}>Дата премьеры:</p>
                            <span style={{color:dark ? '' : 'black'}}>{movie && movie.movie_premeire_date}</span>
                        </div>
                        <div className={st.moviData}>
                            <p className={st.info_text}>Продолжительность:</p>
                            <span style={{color:dark ? '' : 'black'}}>134 мин.</span>
                        </div>
                        <div className={`${st.moviData} ${st.rating_film}`}>
                            <p className={st.info_text}>Рейтинг:</p>
                            <div>
                                <img src={rateStars} alt="rate"/>
                                <span style={{color:dark ? '' : 'black'}}>{movie && movie.movie_rate}%</span>
                            </div>
                        </div>
                        
                        <div className={st.genre}>
                            <Link to="#">Фантези</Link>
                            <Link to="#">триллеры</Link>
                            <Link to="#">экранизации</Link>
                            <Link to="#">Ужасы</Link>
                        </div>
                    </div>
                    
                </div>
                <div className={st.ads}>
                    <p>реклама</p>
                </div>
                
            </div>
            <div style={descStyle} className={st.description}>
                
                <p style={{color:dark ? '' : 'black'}} ref={innerDescription}>{movie && movie.movie_body}</p>
                <div onClick={setCollapse}>Ochish</div>
            </div>
        </div>

    )
}
