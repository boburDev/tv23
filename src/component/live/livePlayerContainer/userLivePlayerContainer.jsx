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
    
    // const [socket] = useSocket()
    // const socket = IO('http://localhost:4000/live', { path: '/socket.io', transports: ["websocket"], autoConnect: false})


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
        Live()
    })
    
    function Live(){
        // getting dom elements
        const btnJoinViewer = document.getElementById("joinViewer");
        const videoElement = document.querySelector("video");

        // variables
        let user;
        let rtcPeerConnections = {};

        // constants
        const iceServers = {
        iceServers: [
            { urls: "stun:stun.services.mozilla.com" },
            { urls: "stun:stun.l.google.com:19302" },
        ],
        };

        // Let's do this 💪
        // const socket = IO('http://localhost:4000/live', { path: '/socket.io', transports: ["websocket"], autoConnect: false })
        
        const socket = IO('https://tv23.herokuapp.com/live', {
            path: '/socket.io',
            transports: ["websocket"],
            autoConnect: false
        })

        btnJoinViewer.onclick = function () {
            socket.connect()
            user = {
            room: "TV23",
            name: "someone",
            };


            socket.emit("register as viewer", user);
        };

        // create offer
        socket.on("offer", function (broadcaster, sdp) {

        rtcPeerConnections[broadcaster.id] = new RTCPeerConnection(iceServers);

        rtcPeerConnections[broadcaster.id].setRemoteDescription(sdp);

        rtcPeerConnections[broadcaster.id]
            .createAnswer()
            .then((sessionDescription) => {
            rtcPeerConnections[broadcaster.id].setLocalDescription(
                sessionDescription
            );
            socket.emit("answer", {
                type: "answer",
                sdp: sessionDescription,
                room: user.room,
            });
            });

        rtcPeerConnections[broadcaster.id].ontrack = (event) => {
            videoElement.srcObject = event.streams[0];
        };

        rtcPeerConnections[broadcaster.id].onicecandidate = (event) => {
            if (event.candidate) {
            console.log("sending ice candidate");
            socket.emit("candidate", broadcaster.id, {
                type: "candidate",
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate,
            });
            }
        };
        });

        socket.on("answer", function (viewerId, event) {
        rtcPeerConnections[viewerId].setRemoteDescription(
            new RTCSessionDescription(event)
        );
        });
    }





    return (
        <div className={st.container} style={{background: dark ? '#0C0C0D' : '#F8F9FC'}}>
            <div className={st.topBar}>
			<div style={{color: dark ? '#fff' : '#000'}} className={`${st.title_films} ${dark ? '': st.black}`}>
				<h3>Сейчас в эфире <b><span style={{color: 'red'}}>&#183;</span></b> </h3>
			</div>
            </div>
            <div style={{ height: playerHeight }} id="playerRef" className={st.playerArea}>
                <video autoPlay id="video"></video>
            </div>
                <button id='joinViewer'>Live</button>
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
