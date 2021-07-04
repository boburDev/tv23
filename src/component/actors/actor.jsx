import st from './actor.module.css'
import React, { useState } from 'react'
import SliderCounterAdvanced from '../sliderCounter/SliderCounterAdvanced'
import ActorItem from './ActorItem/ActorItem'
import Button from '../elements/button/button'
export default function Actors({ actors =[], creator= [] }) {
    const types ={
        creator:'creator',
        actor:'actor'
    }
    const [activeType, setActiveType] = useState(types.actor) //creator
    

    const changeType =(x)=>{
        setActiveType(x)
    }
    
    const [current, setCurrent] = useState(0)
    return (
        <div className={st.container}>
            <div className={st.typeButton}>
                <div onClick={()=>{changeType(types.actor)}}>
                    <Button style={{background:activeType===types.actor ? '' : '#111112'}}>Актеры</Button>
                </div>
                <div style={{marginLeft:'10px'}} onClick={()=>{changeType(types.creator)}}><Button style={{background:activeType===types.creator ? '' : '#111112'}}>Создатели</Button></div>
            </div>
            <div className={st.actors}>
                {
                   activeType===types.actor && 
                   actors && 
                   (
                       actors.length===0 ? 'No found' : actors.map((item, key)=>{
                        return <ActorItem key={key} actor={item} type='actor' />
                    })
                   )
                }

                {
                   activeType===types.creator && 
                   creator && 
                   (
                    creator.length===0 ? <div style={{width:'100%', height:'200px', display:'flex', justifyContent:'center', alignItems:'center', color:'white'}}> No found</div> : creator.map((item, key)=>{
                        return <ActorItem key={key} actor={item} type='creator'  />
                    })
                   )
                }
                
            </div>
            <div className={st.sliderContainer}>
                <SliderCounterAdvanced  buttonNextStyle={{ transform: 'translate(130%, -90px)' }} setCurrent={setCurrent} buttonPrevStyle={{ transform: 'translate(-130%, -90px)' }} max={3} current={current} />
            </div>
        </div>
    )
}
