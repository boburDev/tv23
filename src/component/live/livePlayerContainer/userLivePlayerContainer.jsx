import { useCallback, useState } from 'react'
import st from '../../movie/moviePlayerContainer/moviePlayerContainer.module.css'
import stLocal from './livePlayerContainer.module.css'
import Button from '../../elements/button/button'
import VideoPlayer from '../../movie/moviePlayer/moviePlayer'
import { useTheme } from '../../../context/theme'

import cover from '../../../assets/image/cover.png'

export default function UserLivePlayerContainer({ movie, api }) {
    const [dark] = useTheme()
    

    const [playerHeight, setPlayerHeight] = useState('')
    const [isVideo, setIsVideo] = useState(false)
    const [collapseDesc, setCollapseDesc] = useState(false)
    const descStyle = {
        height :(!collapseDesc ? 48+'px' :'auto')
    }
    const setCollapse=()=>setCollapseDesc(!collapseDesc)
    const settingSize =()=>{
        var playerRef = document.getElementById('playerRef')
        setPlayerHeight(playerRef.offsetWidth*480/854)
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

    

    return (
        <div className={st.container} style={{background: dark ? '#0C0C0D' : '#F8F9FC'}}>
            <div className={st.topBar}>
			<div style={{color: dark ? '#fff' : '#000'}} className={`${st.title_films} ${dark ? '': st.black}`}>
				<h3>Сейчас в эфире <b><span style={{color: 'red'}}>&#183;</span></b> </h3>
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
                        </div>
                    </div>
                }
            </div>
            <div className={st.topBar}>
                <div className={`${st.additional_functions} ${dark ? '': st.black}`}>
                  
                </div>
            </div>
			<div style={descStyle} className={stLocal.description}>
                <p style={{color: dark ? '' : 'black'}}>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in ...
                </p>
                <div onClick={setCollapse} style={{color: dark ? '' : 'black'}}>Ochish</div>
            </div>
        </div>
    )
}
