import './sliderCounter.module.css'
export default function SliderCounterBasic({max=1, current, setCurrent,infinite=false }) {
    const next=()=>{
        setCurrent(x=>++x)
    }

    const empty=()=>{
      if(infinite){

        setCurrent(x=>x===max-1 ? 0 : (x===0 ? max-1 : ''))
      }
    }
    const prev=()=>{
        setCurrent(x=>--x)
    }
    const fake = new Array(max) 
    fake.fill(3)

    return (
        <>
            <div
            onClick={current>=1 ? prev : empty}
            className={`prev ${current===0 && !infinite ? 'minMaxBack':''}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            </div>
            <div className="buttons">
                {
                fake.map((item, key)=> <div
                key={key}
                onClick={()=>{setCurrent(key)}}
                className={`box ${key===current ? 'active' : ''}`}></div>)
                }
            </div>
            <div
            onClick={current<max-1 ? next : empty}
            className={`next ${current===max-1 &&  !infinite ? 'minMaxBack' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </>
    )
}
