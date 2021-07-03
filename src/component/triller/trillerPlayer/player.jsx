import PlayPause from "../../elements/playPause/playPause";
import { useEffect, useRef, useState } from "react";
import st from "./player.module.css";
export default function TrailerPlayer({ src, api , isActive}) {
  
  const [isPlay, SetIsPlay] = useState(false);
  const videoRef = useRef()

  const [isLoadedVideo, setIsLoadedVideo] = useState(false)

  useEffect(() => {
    isPlay ? videoRef.current.play() : videoRef.current.pause()
  }, [isPlay]);

  useEffect(()=>{
    if(!isActive)SetIsPlay(false)
    videoRef.current.currentTime=0
  }, [isActive])

  return (
    <div className={st.container}>
    <div style={{display:'flex', width:'100%', height:'100%'}} onClick={isActive ? () => {SetIsPlay((x) => !x);} : ()=>{}} >
    <div  className={st.playerButton}> 
    {isLoadedVideo ? <PlayPause isPlay={isPlay}/> : 'Loading video Please Wait until loading the video...'}
    </div>
    
    {
      src && <video
        style={{width:'100%', height:"100%"}}
        controls={true}
        onLoadStart={()=>{setIsLoadedVideo(false)}}
        onPlay={()=>{SetIsPlay(true)}}
        onPause={()=>{SetIsPlay(false)}}
        onLoadedData={()=>{setIsLoadedVideo(true)}}
        src={`${api}/stream/triller/${src}`}
        ref={videoRef}></video>
    }
    </div>
    </div>
    );
  }
  