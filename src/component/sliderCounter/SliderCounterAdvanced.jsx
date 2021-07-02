import { useTheme } from '../../context/theme'
import './sliderCounter.css'

export default function SliderCounterAdvanced({max, current, setCurrent, buttonNextStyle,counterStyle, buttonPrevStyle}) {

    const next=()=>{
        setCurrent(x=>++x)
    }

    const empty=()=>{}
    const prev=()=>{
        setCurrent(x=>--x)
    }

    const fake = new Array(max) 
    const {dark} = useTheme()
    fake.fill(3)

    return (
        <>
                <div
                onClick={current>=1 ? prev : empty}
                style={buttonPrevStyle}
                className={`advTopPrev prev ${current===0 ? 'minMaxBack' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <div
                style={{...counterStyle, ...{background:dark ? '' : 'rgba(17, 17, 18, 0.05)'}}}
                className="buttons">
                    {
                    fake.map((item, key)=> <div
                    key={key}
                    onClick={()=>{setCurrent(key)}}
                    className={`box ${key===current ? 'active' : ''}`}></div>)
                    }

                </div>
                <div
                onClick={current<max-1 ? next : empty}
                style={buttonNextStyle}
                className={`advTopNext next ${current===max-1 ? 'minMaxBack' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
        </>
    )
}
