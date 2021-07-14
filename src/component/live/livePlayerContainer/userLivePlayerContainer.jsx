import { useCallback, useState, useEffect } from 'react'
import st from '../../movie/moviePlayerContainer/moviePlayerContainer.module.css'
import stLocal from './livePlayerContainer.module.css'
// import Button from '../../elements/button/button'
// import VideoPlayer from '../../movie/moviePlayer/moviePlayer'
import { useTheme } from '../../../context/theme'
// import { useSocket } from '../../../context/socket'
// import cover from '../../../assets/image/cover.png'
import IO from 'socket.io-client'

export default function UserLivePlayerContainer({ movie, api }) {
    const [dark] = useTheme()
    const socket = IO('http://localhost:4000/live', { path: '/socket.io', transports: ["websocket"], autoConnect: false})

    // const [socket] = useSocket()


    const [playerHeight, setPlayerHeight] = useState('')
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



    useEffect(()=>{
        document.getElementById('my-button').onclick = () => {
            initLive(socket)
        }
    },[socket])

    async function initLive(socket) {
        // let peerConnection
        // const config = {
        // iceServers: [
        //     {
        //     urls: ["stun:stun.l.google.com:19302"]
        //     }
        // ]
        // }
        // const video = document.getElementById("video")


            
    }




    // console.log('waiting...')
    //     console.log(socket)
        
    //     socket.emit("offer", (id, description) => {
    //         console.log('working...')
    //         peerConnection = new RTCPeerConnection(config)
    //         peerConnection
    //         .setRemoteDescription(description)
    //         .then(() => peerConnection.createAnswer())
    //         .then(sdp => peerConnection.setLocalDescription(sdp))
    //         .then(() => {
    //         socket.emit("answer", id, peerConnection.localDescription)
    //         })
    //         peerConnection.ontrack = event => {
    //         video.srcObject = event.streams[0]
    //         }
    //         peerConnection.onicecandidate = event => {
    //         if (event.candidate) {
    //             socket.emit("candidate", id, event.candidate)
    //         }
    //         }
    //     })
    //     console.log('outside...')
        
        
    //     socket.on("candidate", (id, candidate) => {
    //         peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
    //         .catch(e => console.error(e))
    //     })
        
    //     socket.on("connect", () => {
    //         socket.emit("watcher")
    //     })
        
    //     socket.on("broadcaster", () => {
    //         socket.emit("watcher")
    //     })
        
    //     window.onunload = window.onbeforeunload = () => {
    //         socket.close()
    //         peerConnection.close()
    //     }



    return (
        <div className={st.container} style={{background: dark ? '#0C0C0D' : '#F8F9FC'}}>
            <div className={st.topBar}>
			<div style={{color: dark ? '#fff' : '#000'}} className={`${st.title_films} ${dark ? '': st.black}`}>
				<h3>Сейчас в эфире <b><span style={{color: 'red'}}>&#183;</span></b> </h3>
			</div>
            </div>
            <div style={{ height: playerHeight }} id="playerRef" className={st.playerArea}>
                <video autoPlay id="video"></video>
                {/* {
                    isVideo ? <VideoPlayer api={api} movie={movie}/> :
                    <div className={st.cover}>
                    <img src={cover} alt="video_cover" />
                    <div className={st.controlBtn}>
                    <div onClick={() => setIsVideo(true)}>
                    <Button style={coverBtnStyle}>Смотреть по подписке</Button>
                    </div>
                    </div>
                    </div>
                } */}
            </div>
                <button id='my-button'>Live</button>
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
