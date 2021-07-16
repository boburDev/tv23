import { useCallback, useEffect, useState } from "react";
import st from "../../movie/moviePlayerContainer/moviePlayerContainer.module.css";
import stLocal from "./livePlayerContainer.module.css";
import { useTheme } from "../../../context/theme";
import IO from "socket.io-client";
import cover from "../../../assets/bg/IMG_3873.JPG";
// import Button from "../../elements/button/button"

export default function LivePlayerContainer({ api }) {
  const [dark] = useTheme();
  const [playerHeight, setPlayerHeight] = useState("");
  const [collapseDesc, setCollapseDesc] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const descStyle = {
    height: !collapseDesc ? 48 + "px" : "auto",
  };
  const setCollapse = () => setCollapseDesc(!collapseDesc);
  const settingSize = () => {
    var playerRef = document.getElementById("playerRef");
    setPlayerHeight((playerRef.offsetWidth * 480) / 854);
  };

  useCallback(() => {
    window.addEventListener("load", settingSize);
    window.addEventListener("resize", settingSize);
    return () => {
      window.addEventListener("load", settingSize);
      window.addEventListener("resize", settingSize);
    };
  }, []);

  function wrtc() {
    // getting dom elements
    const divConsultingRoom = document.getElementById("consultingRoom");
    const btnJoinBroadcaster = document.getElementById("joinBroadcaster");
    const videoElement = document.getElementById("livePlayer");

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
    const streamConstraints = { audio: false, video: true };

    // Let's do this 💪
    // const socket = IO('http://localhost:4000/live', { path: '/socket.io', transports: ["websocket"], autoConnect: false })
    const socket = IO("https://tv23.herokuapp.com/live", {
      path: "/socket.io",
      transports: ["websocket"],
      autoConnect: false,
    });

    btnJoinBroadcaster.onclick = function () {
      console.log("o");
      socket.connect();
      user = {
        room: "TV23",
        name: "boburmirzo",
      };

      divConsultingRoom.style = "display: block";

      navigator.mediaDevices
        .getUserMedia(streamConstraints)
        .then(function (stream) {
          videoElement.srcObject = stream;
          socket.emit("register as broadcaster", user.room);
        })
        .catch(function (err) {
          console.log("An error ocurred when accessing media devices", err);
        });
    };

    // message handlers
    socket.on("new viewer", function (viewer) {
      rtcPeerConnections[viewer.id] = new RTCPeerConnection(iceServers);

      const stream = videoElement.srcObject;
      stream
        .getTracks()
        .forEach((track) =>
          rtcPeerConnections[viewer.id].addTrack(track, stream)
        );

      rtcPeerConnections[viewer.id].onicecandidate = (event) => {
        if (event.candidate) {
          console.log("sending ice candidate");
          socket.emit("candidate", viewer.id, {
            type: "candidate",
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          });
        }
      };

      rtcPeerConnections[viewer.id]
        .createOffer()
        .then((sessionDescription) => {
          rtcPeerConnections[viewer.id].setLocalDescription(sessionDescription);
          socket.emit("offer", viewer.id, {
            type: "offer",
            sdp: sessionDescription,
            broadcaster: user,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });

    socket.on("candidate", function (id, event) {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      });
      rtcPeerConnections[id].addIceCandidate(candidate);
    });

    socket.on("answer", function (viewerId, event) {
      rtcPeerConnections[viewerId].setRemoteDescription(
        new RTCSessionDescription(event)
      );
    });
  }

  useEffect(() => {
    wrtc();
  });

  // const coverBtnStyle = {
  //     marginBottom: "20px",
  //     width: "200px",
  // }

  return (
    <div
      className={st.container}
      style={{ background: dark ? "#0C0C0D" : "#F8F9FC" }}
    >
      <div className={st.topBar}>
        <div
          style={{ color: dark ? "#fff" : "#000" }}
          className={`${st.title_films} ${dark ? "" : st.black}`}
        >
          <h3>
            Сейчас в эфире
            <b>
              <span style={{ color: "red" }}>&#183;</span>
            </b>{" "}
          </h3>
        </div>
      </div>
      <div
        style={{ height: playerHeight }}
        id="playerRef"
        className={st.playerArea}
      >
        <div
          id="consultingRoom"
          style={{ display: isVideo ? "flex" : "none", width: "100%" }}
        >
          <video id="livePlayer" width="100%" height="100%" autoPlay></video>
        </div>

        <div
          className={st.cover}
          style={{ display: isVideo ? "none" : "flex" }}
        >
          <img src={cover} alt="video_cover" />
          <div className={st.controlBtn}>
            <div onClick={() => setIsVideo(true)}>
              {/* <Button style={coverBtnStyle} ref={}>Start LIVE</Button> */}
              <button id="joinBroadcaster">Start Stream</button>
            </div>
          </div>
        </div>
      </div>

      <video
        id="livePlayer"
        className={st.livePlayer}
        playsInline
        autoPlay
      ></video>
      <div className={st.topBar}></div>
      <div style={descStyle} className={stLocal.description}>
        <p style={{ color: dark ? "" : "black" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in ...
        </p>
        <div onClick={setCollapse} style={{ color: dark ? "" : "black" }}>
          Ochish
        </div>
      </div>
    </div>
  );
}
