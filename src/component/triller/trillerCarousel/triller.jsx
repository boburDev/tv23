import st from './triller.module.css'
import SliderCounterBasic from '../../sliderCounter/sliderCounterBasic'
import TrailerPlayer from '../trillerPlayer/player'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import { useTheme } from '../../../context/theme'

export default function TrailerCarousel({ movies = [] }) {
    const [current, setCurrent] = useState(0)
    const [itemWidth, setItemWidth] = useState()
    const [dark] = useTheme()

    const carouselItemStyle = {
        width:itemWidth, 
        transition:'transform 0.5s ease-in-out'
    }
    const textStyle ={
        background:dark ? ' ': 'white', 
        color:dark ? '': 'black'
    }

    const wayStyle = {
        transition: 'transform .5s ease-in-out',
        transform: `translateX(-${current*itemWidth}px)`
    }
    const setSize = ()=>{
        
        var box = document.querySelector('#box')
        // var item = document.querySelector('#wayRef')
        setItemWidth(window.innerWidth>761 ? box?.offsetWidth/2 :box?.offsetWidth )
        // setItemHeight(item?.offsetHeight)
    };
    useEffect(()=>{
        setSize()
        window.addEventListener("resize",setSize)
          window.addEventListener("load",setSize)
          return ()=>{
            window.removeEventListener("resize",setSize)
            window.removeEventListener("load",setSize)
          }
    } , [])

    return (
        <div className={st.container} style={{marginTop:'30px'}}>
            {/* Carousel */}
            <div className={st.carousel}>
                <div id="box" className={st.slideBox}>
                    <div style={wayStyle} id="wayRef" className={st.carouselWay}>
                        {
                            movies.map((x, key)=>{
                                return <div key={key} style={{...carouselItemStyle, ...{opacity:key===current ? 1 :0.3,  padding:'10px',transform:key===current ? 'scale(1)' :'scale(0.9)', }}} className={st.carouslItem}>
                                    <div style={{height:'100%', display:'flex', alignItems:'center',margin:'auto', justifyContent:'center',borderRadius:'21px', overflow:'hidden'}}>
                                        <TrailerPlayer isActive={current===key }  src={x && x.triller_path}/>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className={st.control}>
                <div className={st.info}>
                    <div style={{color:dark ? ' ': 'black'}}  className={st.name}>{movies && movies[current]?.triller_name}<span>ТРЕЙЛЕР</span></div>
                    <div className={st.subInfo}>
                        <div style={{color:dark ? ' ': 'black'}}  className={st.country}>Страна:{movies && movies[current]?.country_name}</div>
                        <div  className={st.genres}>
                            {movies && movies[current]?.movie_genre.toString().split(',').map((x, key)=>{
                                return <Link key={key} style={textStyle} to="#">{x}</Link>
                            })}
                        </div>
                    </div>
                </div>
                <div className={st.counter}> <SliderCounterBasic infinite={true} max={movies.length} current={current} setCurrent={setCurrent}/></div>
            </div>
        </div>
    )
}
