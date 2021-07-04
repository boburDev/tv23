import  { useRef } from 'react'
import st from './seekbar.module.css'
export default function Seekbar({ currentSecond, setCurrentSecond }) {
    const filledRef = useRef()
    const changeRange=(e)=>{
        console.log(e.target.value)
        const goSecond = (e.target.value*currentSecond.duration)/100
        console.log(goSecond, currentSecond.duration)
        setCurrentSecond(goSecond)
      }
    const filledStyle = {
        width:`${(currentSecond.currentTime/currentSecond.duration)*100}%`
    }
    return (
        <div className={st.seekbar}>
            <div className={st.seek}></div>
            <div style={filledStyle} ref={filledRef} className={st.filled}></div>
            <input onChange ={changeRange} type="range" />
        </div>
    )
}
