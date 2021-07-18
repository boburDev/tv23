import PlayPause from "../../elements/playPause/playPause"
import { useEffect, useRef, useState } from "react"
import st from "./player.module.css"
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'

export default function TrailerPlayer({ src, api , isActive}) {
  
  const [isPlay, SetIsPlay] = useState(false)
  const videoRef = useRef()
  const [ til ] = useLang()

  const [isLoadedVideo, setIsLoadedVideo] = useState(false)

  useEffect(() => {
    (isPlay && isActive) ? videoRef.current.play() : videoRef.current.pause()
  }, [isPlay,isActive])

  useEffect(()=>{
    if(!isActive)SetIsPlay(false)
    videoRef.current.currentTime=0
  }, [isActive])

  return (
    <div className={st.container}>
    <div style={{display:'flex', width:'100%', height:'100%'}} onClick={()=> {
      isActive ? SetIsPlay(isPlay) : SetIsPlay(false)
    }} >
    <div  className={st.playerButton}> 
    {isLoadedVideo ? <div onClick={()=>{
      videoRef.current.play()
    }}><PlayPause isPlay={isPlay} /></div> : Language[til].triller.trillerPlayer.loading}
    </div>
    
    {
      src && <video
        style={{width:'100%', height:"100%"}}
        controls={false}
        onLoadStart={()=>{setIsLoadedVideo(false)}}
        onPlay={()=>{SetIsPlay(true)}}
        onPause={()=>{SetIsPlay(false)}}
        onLoadedData={()=>{setIsLoadedVideo(true)}}
        ref={videoRef}
        className={st.trller_video}
        controlsList="nodownload">
			<source src={`${api}/stream/triller/${src}/`} type="video/mp4" />
		</video>
    }
    </div>
    </div>
    )
  }
  
