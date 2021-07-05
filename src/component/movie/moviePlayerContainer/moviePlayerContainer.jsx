import { useCallback, useEffect, useState } from 'react'
import st from './moviePlayerContainer.module.css'
import Button from '../../elements/button/button'
import DropDown from '../../elements/dropDown/dropDown'
import DropDownItem from '../../elements/dropDown/dropDownItem/dropDownItem'
import unSelectedStart from '../../../assets/logo/unselected_start.svg'
import favourStart from '../../../assets/logo/rate_and_favour.svg'
import sendIcon from '../../../assets/logo/send_icon.svg'
import sendSelectedIcon from '../../../assets/logo/send_icon_selected.svg'
import sendSelectedBlackIcon from '../../../assets/logo/send_icon_selected_black.svg'
import cover from '../../../assets/image/cover.png'
import VideoPlayer from '../moviePlayer/moviePlayer'
import { useResolution } from '../../../context/resolution'
import { useTheme } from '../../../context/theme'
import { useSharing } from '../../../context/shareLink'

export default function MoviePlayerContainer({ movie, api }) {
    const [resolution, setResolution] = useResolution()
    const [playerType, setPlayerType] = useState(localStorage.getItem('player_type') || 'Триллеры')
    const [dark] = useTheme()

    const [playerHeight, setPlayerHeight] = useState('')
    const [isVideo, setIsVideo] = useState(false)
    const [isFavourite, setIsFavourite] = useState(false)
    const [sendLink, setSendLink] = useState(false)
    const [openModal, setOpenModal] = useSharing()
    
    const settingSize =()=>{
        var playerRef = document.getElementById('playerRef')
        setPlayerHeight(playerRef.offsetWidth*480/854)
    }

    const changeResolution=(resolution)=>{
        window.localStorage.setItem('video_resolution', resolution)
        setResolution(resolution)
        window.location.reload()
    }

    useCallback(()=>{
        window.addEventListener('load',settingSize)
        window.addEventListener('resize', settingSize)
        return ()=>{
            window.addEventListener('load',settingSize)
            window.addEventListener('resize', settingSize)
        }
    }, [])

    const coverBtnStyle ={
        marginBottom:'20px',
        width:'200px'
    }

    const ligthMode = {
        background: dark ? 'rgb(35 35 39)' : '#fff',
        color: dark ? '#fff' : '#777'
    }

    useEffect(()=>{
        if (movie && !movie.triller_id) {
            localStorage.setItem('player_type', 'Фильмы')
        }
    },[movie])

    return (
        <div className={st.container} style={{background: dark ? '#0C0C0D' : '#F8F9FC'}}>
            <div className={st.topBar}>
                <div className={st.configures}>
                    <div className={st.dropdown} style={ligthMode}>
                        <DropDown activeText = {`Плеер ${playerType && playerType}`} style={ligthMode}>
                        {
                            movie && !movie.triller_id && <>
                            <DropDownItem style={{borderBottom: 'none'}} onClick={()=>{
                                localStorage.setItem('player_type', 'Фильмы')
                                setPlayerType('Фильмы')
                            }}>Фильмы</DropDownItem>
                            </>
                        }
                        
                            
                            {
                                movie && movie.triller_id && 
                                <>
                                <DropDownItem onClick={()=>{
                                    localStorage.setItem('player_type', 'Фильмы')
                                    setPlayerType('Фильмы')
                                }}>Фильмы</DropDownItem>
                                <DropDownItem style={{borderBottom: 'none'}} onClick={()=>{
                                    localStorage.setItem('player_type', 'Триллеры')
                                    setPlayerType('Триллеры')
                                }}>Триллеры</DropDownItem>
                                </>
                            }
                        </DropDown>
                    </div>
                    <div className={st.dropdown} style={ligthMode}>
                        <DropDown activeText = {resolution} style={ligthMode}>
                            <DropDownItem onClick={()=>{changeResolution('360p')}}>360p</DropDownItem>
                            <DropDownItem  onClick={()=>{changeResolution('720p')}}>720p</DropDownItem>
                            {
                                movie && !movie.movie_4k_is && <DropDownItem style={{borderBottom: 'none'}}  onClick={()=>{changeResolution('HD')}}>HD(1080)</DropDownItem>
                            }
                            
                            {
                                movie && movie.movie_4k_is && <>
                                <DropDownItem
                                onClick={()=>{changeResolution('HD')}}>HD(1080)</DropDownItem>
                                <DropDownItem
                                style={{borderBottom: 'none'}}
                                onClick={()=>{changeResolution('HD')}}>4K</DropDownItem></>
                            }
                        </DropDown>
                    </div>
                </div>
            </div>
            <div style={{ height: playerHeight }} id="playerRef" className={st.playerArea}>
                {
                    isVideo ? <VideoPlayer api={api} movie={movie}/> :
                    <div className={st.cover}>
                    <img src={cover} alt="video_cover" />
                    <div className={st.controlBtn}>
                        <div onClick={() => setIsVideo(true)}>
                            <Button style={coverBtnStyle}>Смотреть по подписке</Button>
                        </div>
                        <div>
                            <Button style={{background:'#111112',...coverBtnStyle}}>Смотреть трейлер</Button>
                        </div>
                        </div>
                    </div>
                }
            </div>
            <div className={st.topBar}>
                <div
                style={{color: dark ? '#fff' : '#000'}}
                className={`${st.title_films} ${dark ? '': st.black}`}>
                    <p>Название: </p><h3>Гоблин</h3>
                </div>
                <div className={`${st.additional_functions} ${dark ? '': st.black}`}>
                    <div onClick={()=>{setIsFavourite(!isFavourite)}} className={st.favourite}>
                        <Button
                        className={st.btn}
                        style={{
                            background: dark ? 'rgb(35 35 39)' : '#fff',
                            color: dark ? (isFavourite && '#fff') : (isFavourite ? '#000': '')
                        }}>
                            <img width="20px" className={st.icon} src={isFavourite ? favourStart: unSelectedStart} alt="favourite"/>В избранное
                        </Button>
                    </div>
                    <div onClick={()=>{
                        setSendLink(!sendLink)
                        setOpenModal(!openModal)
                        }} className={st.favourite}>
                        <Button
                        className={st.btn}
                        style={{
                            background: dark ? 'rgb(35 35 39)' : '#fff',
                            color: dark ? (openModal && '#fff') : (sendLink ? '#000': '')
                        }}>
                            <img width="20px" className={st.icon} src={
                                dark ? (openModal ? sendSelectedIcon : sendIcon) : (openModal ? sendSelectedBlackIcon : sendIcon)
                                } alt="favourite"/>Отправить
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
