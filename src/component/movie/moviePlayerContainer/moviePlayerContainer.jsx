import { useCallback, useEffect, useState } from "react"
import st from "./moviePlayerContainer.module.css"
import stMovieItem from "../movieItem/movieItem.module.css"
import Button from "../../elements/button/button"
import DropDown from "../../elements/dropDown/dropDown"
import DropDownItem from "../../elements/dropDown/dropDownItem/dropDownItem"
import unSelectedStart from "../../../assets/logo/unselected_start.svg"
import favourStart from "../../../assets/logo/rate_and_favour.svg"
import sendIcon from "../../../assets/logo/send_icon.svg"
import sendSelectedIcon from "../../../assets/logo/send_icon_selected.svg"
import sendSelectedBlackIcon from "../../../assets/logo/send_icon_selected_black.svg"
import VideoPlayer from "../moviePlayer/moviePlayer"
import VideoTrillerPlayer from "../moviePlayer/movieTrillerPlayer"
import { useResolution } from "../../../context/resolution"
import { useTheme } from "../../../context/theme"
import { useSharing } from "../../../context/shareLink"
import { useAuth } from '../../../context/user'
import { useParams } from 'react-router-dom'
import axios from "axios"
import SliderCounterAdvanced from "../../sliderCounter/SliderCounterAdvanced";
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'

export default function MoviePlayerContainer({ movie = {}, api, visibled = 6 }) {
  const [resolution, setResolution] = useResolution()
//   const [playerType, setPlayerType] = useState(localStorage.getItem("player_type") || "Триллеры")
  const [dark] = useTheme()
  const [triller,settriller] = useState(true)
  const [current, setCurrent] = useState(0);
  const [serials,setSerials] = useState([])
  const [playerHeight, setPlayerHeight] = useState("")
  const [isVideo, setIsVideo] = useState(false)
  const [isVideoTriller, setIsVideoTriler] = useState(false)
  const [isFavourite, setIsFavourite] = useState(false)
  const [sendLink, setSendLink] = useState(false)
  const [openModal, setOpenModal] = useSharing()
  const [userData] = useAuth()
  const [isLogged,setIsLogged] = useState(false)
  const language = useParams()
  const [ til ] = useLang()

  const settingSize = () => {
    var playerRef = document.getElementById("playerRef")
    setPlayerHeight((playerRef.offsetWidth * 480) / 854)
  }

  const [imageLoaded, setImageLoaded] = useState(false);

  const changeResolution = (resolution) => {
    window.localStorage.setItem("video_resolution", resolution)
    setResolution(resolution)
    window.location.reload()
  }

  useCallback(() => {
    window.addEventListener("load", settingSize)
    window.addEventListener("resize", settingSize)
    return () => {
      window.addEventListener("load", settingSize)
      window.addEventListener("resize", settingSize)
    }
  }, [])

  const coverBtnStyle = {
    marginBottom: "20px",
    width: "200px",
  }

  const ligthMode = {
    background: dark ? "rgb(35 35 39)" : "#fff",
    color: dark ? "#fff" : "#777",
  }

  useEffect(() => {
    if (movie && !movie.triller_id) {
      localStorage.setItem("player_type", "Фильмы")
    }

	if (movie && movie.triller_id) {
		settriller(true)
	}else {
		settriller(false)
	}
  }, [movie])


  useEffect(()=>{
	  if (typeof userData === 'object' && userData) {
		setIsLogged(true)
	}
  },[userData])


  async function GetSerials(api,movieId) {
	const res = await axios.get(api+ '/serials', {
		params: {
			movieId: movieId
		}
	})
	setSerials(res.data.data)
  }


  useEffect(()=>{
	if (movie && movie.movie_serial_is) {
		GetSerials(api,movie.movie_id)
	}
  }, [movie,api])

  useEffect(()=>{
	  if (serials) {
		//   setCounts(Math.ceil(serials.length / visibled > 5 ? 5 : serials.length / visibled))
	  }
  }, [serials,visibled])


  function changeToTime(time) {
	const minutInHours = (time - 0) / 3600
	const minutInMinuts = ((minutInHours) - Math.floor(minutInHours)) * 60
	const hours = Math.floor(minutInHours)
	const minuts = Math.floor(minutInMinuts) 
	const seconds = Math.floor((minutInMinuts - minuts) * 60)

	const t = `${hours > 10 ? hours : '0' + hours} : ${minuts > 10 ? minuts : '0'+ minuts} : ${seconds > 10 ? seconds : '0' + seconds}`
	return t
  }

  function pagination(val) {
	return Math.ceil(val.length / visibled > 5 ? 5 : val.length / visibled)
  }

  return (
    <div className={st.container} style={{ background: dark ? "#0C0C0D" : "#F8F9FC" }}>
      <div className={st.topBar}>
        <div className={st.configures}>
          <div className={st.dropdown} style={ligthMode}>
            <DropDown activeText={resolution} style={ligthMode}>
              <DropDownItem
                onClick={() => {
                  changeResolution("360p")
                }}
              >
                360p
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  changeResolution("720p")
                }}
              >
                720p
              </DropDownItem>
              {movie && !movie.movie_4k_is && (
                <DropDownItem
                  style={{ borderBottom: "none" }}
                  onClick={() => {
                    changeResolution("HD")
                  }}
                >
                  HD(1080)
                </DropDownItem>
              )}

              {movie && movie.movie_4k_is && (
                <>
                  <DropDownItem
                    onClick={() => {
                      changeResolution("HD")
                    }}
                  >
                    HD(1080)
                  </DropDownItem>
                  <DropDownItem
                    style={{ borderBottom: "none" }}
                    onClick={() => {
                      changeResolution("HD")
                    }}
                  >
                    4K
                  </DropDownItem>
                </>
              )}
            </DropDown>
          </div>
        </div>
      </div>
      <div style={{ height: playerHeight }} id="playerRef" className={st.playerArea}>
        {isVideo ? (
          <div className={st.cover}>
            {movie && movie.movie_id && <VideoPlayer api={api} movie={movie} />}
          </div>
        ) : isVideoTriller ? (<div className={st.cover}>
			{
				movie && movie.movie_id && <VideoTrillerPlayer api={api} movie={movie} />
			}
		</div>) : (
          <div className={st.cover}>
            <img src={`${api}/${movie.movie_screen}`} alt="video_cover" />
            <div className={st.controlBtn}>
              <div onClick={() => {
				  if (isLogged) {
					  setIsVideo(true)
				  } else {
						const confirmation = window.confirm('Do you want to logIn')
						if (confirmation) {
							window.location.href = `/${language.lang || 'ru'}/login`
						}else {
							// window.alert('Unda uzr kino kuromisiz')
						}
				  }
				}}>
                <Button style={coverBtnStyle}>
                  {Language[til].movie.moviePlayerContainer.watchByFollow}
                  </Button>
              </div>
              {
				  triller && <div onClick={()=>setIsVideoTriler(true)}>
					<Button style={{ background: "#111112", ...coverBtnStyle }}>
					{Language[til].movie.moviePlayerContainer.watchTrailer}
					</Button>
				</div>
			  }
            </div>
          </div>
        )}
      </div>
      
	  <div className={st.topBar}>
        <div style={{ color: dark ? "#fff" : "#000" }} className={`${st.title_films} ${dark ? "" : st.black}`}>
          <p>
            {Language[til].movie.moviePlayerContainer.name}: 
            </p>
          <h3>{movie && movie.movie_name}</h3>
        </div>
        <div className={`${st.additional_functions} ${dark ? "" : st.black}`}>
          <div onClick={() => setIsFavourite(!isFavourite)}className={st.favourite}>
            <Button
              className={st.btn}
              style={{
                background: dark ? "rgb(35 35 39)" : "#fff",
                color: dark ? isFavourite && "#fff" : isFavourite ? "#000" : "",
              }}>
              <img width="20px" className={st.icon}
                src={isFavourite ? favourStart : unSelectedStart} alt="favourite" />
              <p> 
                {Language[til].movie.moviePlayerContainer.toForwards}
                </p>
            </Button>
          </div>
          <div onClick={() => {
              setSendLink(!sendLink)
              setOpenModal(!openModal)
            }} className={st.favourite}>
            <Button
              className={st.btn}
              style={{
                background: dark ? "rgb(35 35 39)" : "#fff",
                color: dark ? openModal && "#fff" : sendLink ? "#000" : "",
              }}
            >
              <img
                width="20px"
                className={st.icon}
                src={
                  dark
                    ? openModal
                      ? sendSelectedIcon
                      : sendIcon
                    : openModal
                    ? sendSelectedBlackIcon
                    : sendIcon
                }
                alt="favourite"
              />
              <p>
                {/* {Language[til].movie.MoviePlayerContainer.send} */}
                </p>
            </Button>
          </div>
        </div>
      </div>
	
	<div style={{width: '100%'}}>
	{
		serials && serials.serials && 
		<>
			<div className={st.serialItems}>
			{
			serials.serials.map((val,key) => current * visibled <= key &&
			(current + 1) * visibled > key && 
			
			<div key={key} className={stMovieItem.container}>
				<div className={`${stMovieItem.imgBox} ${movie && imageLoaded ? "" : stMovieItem.animate}`}>
				<img onLoad={() => setImageLoaded(true)}
					src={`${api}/${val.movie_thumnail_path}`} style={{ visibility: movie && imageLoaded ? "" : "" }} alt=""/>
				</div>
				<div className={`${stMovieItem.description} ${movie ? "" : stMovieItem.animate}`}
				style={{ color: dark ? " " : "black", display: "flex", justifyContent: 'space-between', width: '100%', fontSize: '16px' }}>
				<p style={{ fontWeight: "bold" }}>{val.movie_seria}</p>
				<p style={{ fontWeight: "bold", color: '#777' }}>{changeToTime(val.movie_length)}</p>
				</div>
			</div>
			)
			}
			</div>
			
			<div className={st.bottom}>
				<div className={st.pagination} style={{ width: '100%', justifyContent: "space-between" }}>
					<SliderCounterAdvanced
						max={pagination(serials.serials) > 6 ? 5 : pagination(serials.serials)}
						current={current}
						setCurrent={setCurrent}
						mode={dark}
					/>
				</div>
			</div>
			
		</>
	}
	</div>
	  

	</div>
  )
}
