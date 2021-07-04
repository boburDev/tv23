import st from './movieInfo.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import rateStars from '../../../assets/image/rates.png'
import movieImg from '../../../assets/image/movie-film.svg'
import adsImg from '../../../assets/image/ads_banner.svg'
import { useTheme } from '../../../context/theme'

export default function MovieInfo({ movie, api }) {
    
    const [collapseDesc, setCollapseDesc] = useState(false)
    const [dark] = useTheme()
    const descStyle = {
        height :(!collapseDesc ? 48+'px' :'auto')
    }
    const setCollapse=()=>setCollapseDesc(!collapseDesc)

    return (
        <div className={st.movieWrapper} style={{background: dark ? '#0C0C0D' : '#F8F9FC'}}>
            <div className={st.movieIntro}>
                <div className={st.filmBio}>
                    <div className={st.moviePicture}>
                        <div className={st.film_img}>
                            <img src={movieImg} alt="film_picture"/>
                            <div className={st.img_rate}>
                                <p className={st.info_text}>Рейтинг:</p>
                                <img src={rateStars} alt="rate" height="5"/>
                            </div>
                        </div>    
                    </div>
                    <div className={st.movieInfo}>
                        
                        <div className={st.moviData}>
                            <p className={st.info_text}>Производство:</p>
                            <span  style={{color:dark ? '' : 'black'}}>Южная Корея</span>
                        </div>
                        <div className={st.moviData}>
                            <p className={st.info_text}>Дата премьеры:</p>
                            <span style={{color:dark ? '' : 'black'}}>5 сентября 2017 г.</span>
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
                        
                        <div className={`${st.genre} ${!dark ? st.dark : ''}`}>
                            <Link to="#">Фантези</Link>
                            <Link to="#">триллеры</Link>
                            <Link to="#">экранизации</Link>
                            <Link to="#">Ужасы</Link>
                        </div>
                    </div>
                    
                </div>
                <div className={st.ads}>
                    <img src={adsImg} alt="film_picture" />
                </div>
                
            </div>
            <div style={descStyle} className={st.description}>
                <p style={{color: dark ? '' : 'black'}}>
                    События сериала разворачиваются в двух временных линиях: прошлом, во времена Корё, и в XXI веке.
                    Токкэби живёт уже больше девяти веков. Некогда он был прославленным полководцем по имени Ким Син, но король начал опасаться его влияния и власти, и из-за происков советника заподозрил в желании взять власть в свои руки. Ким Син и ...
                    События сериала разворачиваются в двух временных линиях: прошлом, во времена Корё, и в XXI веке.
                    Токкэби живёт уже больше девяти веков. Некогда он был прославленным полководцем по имени Ким Син, но король начал опасаться его влияния и власти, и из-за происков советника заподозрил в желании взять власть в свои руки. Ким Син и ...
                </p>
                <div onClick={setCollapse} style={{color: dark ? '' : 'black'}}>Ochish</div>
            </div>
        </div>

    )
}
