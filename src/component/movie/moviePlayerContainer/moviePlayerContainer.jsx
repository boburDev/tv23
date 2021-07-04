import { useCallback, useState } from 'react'
import st from './moviePlayerContainer.module.css'
import Button from '../../elements/button/button'
import DropDown from '../../elements/dropDown/dropDown'
import DropDownItem from '../../elements/dropDown/dropDownItem/dropDownItem'
import star2 from '../../../assets/image/star2.png'
import cover from '../../../assets/image/cover.png'
import VideoPlayer from '../moviePlayer/moviePlayer'
import { useResolution } from '../../../context/resolution'

export default function moviePlayerContainer({ movie }) {
    
    const [resolution, setResolution] = useResolution()
    
    const [playerHeight, setPlayerHeight] = useState('')
    const [isVideo, setIsVideo] = useState(false)
    const [isFavourite, setIsFavourite] = useState(true)

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
    return (
        <div className={st.container}>
            <div className={st.topBar}>
                <div className={st.configures}>
                    <div className={st.dropdown}>
                        <DropDown activeText = {'РУСС'}>
                            <DropDownItem >РУСС</DropDownItem>
                            <DropDownItem>УЗБ</DropDownItem>
                            <DropDownItem>АНГЛ</DropDownItem>
                        </DropDown>
                    </div>
                    <div className={st.dropdown}>
                        <DropDown activeText = {resolution}>
                            <DropDownItem onClick={()=>{changeResolution('360p')}}>360p</DropDownItem>
                            <DropDownItem  onClick={()=>{changeResolution('720p')}}>720p</DropDownItem>
                            <DropDownItem  onClick={()=>{changeResolution('HD')}}>HD(1080)</DropDownItem>
                        </DropDown>
                    </div>
                </div>
                <div onClick={()=>{setIsFavourite(!isFavourite)}} className={st.favourite}>
                    <Button
                    className={st.btn}
                    style={{
                        background: isFavourite ? '#D7141D' : 'rgb(35 35 39)',
                        color:isFavourite ? 'white': ''
                    }}>
                        <img className={st.icon} src={star2} alt="favourite"/>В избранное
                    </Button>
                </div>
            </div>
            <div style={{ height: playerHeight }} id="playerRef" className={st.playerArea}>
                {
                    isVideo ? <VideoPlayer movie={movie}/> :
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
        </div>
    )
}
