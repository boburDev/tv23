import st from './actor.module.css'
import { useState } from 'react'
import SliderCounterAdvanced from '../sliderCounter/SliderCounterAdvanced'
import ActorItem from './actorItem/actorItem'
import Button from '../elements/button/button'
import { useTheme } from '../../context/theme'

import q0 from '../../assets/people/John Cena.jpeg'
import q1 from '../../assets/people/Justin Lin.jpeg'
import q2 from '../../assets/people/Vin Diesel.jpeg'

export default function Actors({ visibled = 12}) {

    const actors = [
        {
            "actor_name": '1',
            "role": 'Actor',
            "actor_path": q0
        }
    ]

    const creator = [
        {
            "director_name": '3',
            "role": 'Creator',
            "director_path": q2
        },
        {
            "director_name": '3',
            "role": 'Creator',
            "director_path": q1
        }
    ]
    const types ={
        creator:'creator',
        actor:'actor'
    }
    const [activeType, setActiveType] = useState(types.actor) //creator
    const [dark] = useTheme()
    const counts = Math.ceil(activeType === 'actor' ?
        (actors.length/visibled > 10 ? 5 : actors.length/visibled) :
        (creator.length/visibled > 10 ? 5 : creator.length/visibled))
        

    const changeType =(val)=>setActiveType(val)
    
    const [current, setCurrent] = useState(0)
    return (
        <div className={st.container} style={{background: dark ? '#0C0C0D' : '#F8F9FC'}}>
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
                       actors.length===0 ? 'No found' : actors.map((item, key)=>
                       (current*visibled<=key && (current+1)*visibled>key) && <ActorItem key={key} movieUsers={item} type='actor' />)
                   )
                }

                {
                   activeType===types.creator && 
                   creator && 
                   (
                    creator.length===0 ? <div style={{width:'100%', height:'200px', display:'flex', justifyContent:'center', alignItems:'center', color:'white'}}> No found</div> : creator.map((item, key)=>
                    (current*visibled<=key && (current+1)*visibled>key) && <ActorItem key={key} movieUsers={item} type='creator'/>)
                   )
                }
                
            </div>
            <div className={st.sliderContainer}>
                <SliderCounterAdvanced  buttonNextStyle={{ transform: 'translate(130%, -90px)' }} setCurrent={setCurrent} buttonPrevStyle={{ transform: 'translate(-130%, -90px)' }} max={counts} current={current} />
            </div>
        </div>
    )
}
