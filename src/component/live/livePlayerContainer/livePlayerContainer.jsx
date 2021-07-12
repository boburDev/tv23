import { useCallback, useEffect, useState } from 'react'
import st from '../../movie/moviePlayerContainer/moviePlayerContainer.module.css'
import stLocal from './livePlayerContainer.module.css'
import { useTheme } from '../../../context/theme'
// import Socket from '../socket/socket'
// import { useSocket } from '../../../context/socket'
import IO from 'socket.io-client'

export default function LivePlayerContainer({ api }) {
    const [dark] = useTheme()
    // const [socket] = useSocket()
    
    const socket = IO('http://localhost:4000/live', { path: '/socket.io', transports: ["websocket"],  }) // autoConnect: false

    const [connect, setConnect] = useState(false)
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
            setConnect(!connect)
            initLive(socket)
        }
    },[connect, socket])
    
    
    // useEffect(()=>{
        
    //     if (connect) {
    //         // socket.connect()
    //         initLive(socket)
    //     } else {
    //         // if (socket) socket.disconnect()
    //     }
    // }, [connect, api])
    
    
    async function initLive(socket) {
       

        // const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        const videoElement = document.getElementById("video")


        const servers = {
            iceServers: [{ urls: 'stun:stun.l.google.com:19302', }],
        }
        
        // yangi aloqa yaratish
        const connection = new RTCPeerConnection(servers)
        
        connection.onicecandidate = e => {
            
            if (!e.candidate) {
                
                // preElement.textContent = JSON.stringify(connection.localDescription)
                console.log(JSON.stringify(connection.localDescription))
            }
        }


        ;(async ()=>{
            
            // stream uchun cheklov va imkoniyatlar
            const constraints = { video: true }

            // stream ni boshlash
		    const stream = await navigator.mediaDevices.getUserMedia(constraints)

            // video streamni video elementga yo'naltirish
		    videoElement.srcObject = stream

            // video stream track larini connectionga joylash
		    stream.getTracks().forEach(track => connection.addTrack(track, stream))
		
            // aloqa uchun offer yaratish
		    const offer = await connection.createOffer()

            // aloqa uchun lokal offerni o'rnatish
		    await connection.setLocalDescription(new RTCSessionDescription(offer))
        })()
        
       
    }


    // socket.emit("broadcaster")

    // socket.on("watcher", id => {
    //     const peerConnection = new RTCPeerConnection(config)
    //     peerConnections[id] = peerConnection
    //     console.log(peerConnection)
    //     let stream = video.srcObject
    //     stream.getTracks().forEach(track => peerConnection.addTrack(track, stream))
        
    //     peerConnection.onicecandidate = event => {
    //         if (event.candidate) {
    //             socket.on("candidate", id, event.candidate)
    //         }
    //     }
        
    //     peerConnection
    //     .createOffer()
    //     .then(sdp => peerConnection.setLocalDescription(sdp))
    //     .then(() => {
    //         socket.on("offer", id, peerConnection.localDescription)
    //     })
    // })
    
    // socket.on("answer", (id, description) => {
    //     peerConnections[id].setRemoteDescription(description)
    // })
    
    // socket.on("candidate", (id, candidate) => {
    //     peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate))
    // })
    
    // socket.on("disconnectPeer", id => {
    //     peerConnections[id].close()
    //     delete peerConnections[id]
    // })
    

    return (
        <div className={st.container} style={{background: dark ? '#0C0C0D' : '#F8F9FC'}}>
        <div className={st.topBar}>
        <div style={{color: dark ? '#fff' : '#000'}} className={`${st.title_films} ${dark ? '': st.black}`}>
        <h3>Сейчас в эфире <b><span style={{color: 'red'}}>&#183;</span></b> </h3>
        </div>
        </div>
        <div style={{ height: playerHeight }} id="playerRef" className={st.playerArea}>
        {
            // <video id="livePlayer" className={st.livePlayer} playsInline autoPlay></video>
        }
        </div>
        <video autoPlay id="video"></video>
        <button id='my-button'>Start Stream</button>
        <div className={st.topBar}>
        <div className={`${st.additional_functions} ${dark ? '': st.black}`}>
        <div className={st.favourite}>
        
        <button onClick={() => setConnect(!connect)}>
        { connect ? 'Stop LIVE' : 'Start LIVE' }
        </button>
        
        
        </div>
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
    