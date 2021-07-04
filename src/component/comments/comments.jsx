import st from './comments.module.css'
import Button from '../elements/button/button'
import SliderCounterAdvanced from '../sliderCounter/SliderCounterAdvanced'
import { useEffect, useRef, useState } from 'react'
import CommentItem from './CommentItem/CommentItem'
import { useTheme } from '../../Contexts/ThemeProvider'
import axios from 'axios'
import { useApi } from '../../Contexts/api'

export default function Commenting(film_id) {
    const bodyRef = useRef()
    const {dark} = useTheme()
    const [api] = useApi()
    const [comments, setComments] = useState([])
    // useEffect(()=>{
    //     setComments(backendComments)
    // }, [])
    const [current, setCurrent] = useState(0)
    const settingSize =()=>{
        setWidth(window.innerWidth)
    }
    const [width, setWidth] = useState(window.innerWidth)
    useEffect(()=>{
        settingSize()
        window.addEventListener('resize',settingSize)
        return function(){
            window.removeEventListener('resize',settingSize)
        }
    }, [])
    const addComment =async(e)=>{
        e.preventDefault()
        const res = await axios.post(`${api}/add-comment`, {
            movieId:film_id.film_id,
            commentBody:bodyRef.current.value,
            userId:localStorage.getItem('user_id')
        })
        if(res)clearHandle(); else window.alert('Error while commenting!!!')

    }
    const [isValid, setIsValid] = useState(false)
    const changeHandler =(e)=>{
        if(e.target.value === '')setIsValid(false)
        else setIsValid(true)
    }
    const clearHandle =()=>{
        bodyRef.current.value = ''
        setIsValid(false)
    }
    useEffect(()=>{
        ;(async()=>{
            const res = await axios.get(api + '/comments?movieId='+film_id?.film_id)
            // console.log(res.data)
            setComments(res.data.data)
        })()
        // console.log(movie)
    }, [api, film_id])

    return (
        <div className={st.container}> 
            <div className={st.commentContainer}>
            <div className={st.comments}>
                <div style={{color:dark ? '' : 'black'}} className={st.title}>Комментарии:</div>
                <div className={st.description}>Оставьте свой отзыв или комментарий, который поможет другим пользователям 23TV решить, стоит ли смотреть фильм «Хоббит» онлайн или нет.</div>
                <CommentItem comment={comments[current]}/>
                <div className={st.slider}>
                    
                    <SliderCounterAdvanced buttonNextStyle={{transform:width>1025 ?'translate(130%, -100px)' : '',marginLeft:width>1025 ?'' : '20px'}} buttonPrevStyle={{transform:width>1025 ? 'translate(-130%, -100px)' : '',marginRight:width>1025 ?'' : '20px'}} counterStyle={{display:'none'}} max={comments.length} current={current} setCurrent={setCurrent}  />
                </div>
            </div>
            <div className={st.addComment}>
               
                <div style={{color:dark ? '' : 'black'}} className={st.label}>оставить Комментарий</div>
                
                <textarea onChange={changeHandler} ref={bodyRef} style={{color:dark ? '' : 'black'}} cols="30" rows="10"></textarea>
                <div className={st.button}>
                    <div onClick={isValid ? addComment : ()=>{console.log("Error")}}><Button   style={{ backgroundColor: !isValid ? "#de7b80" : '', paddingLeft:'40px',paddingRight:'40px'}}>Добавить</Button></div>
                </div>
                
            </div>
            </div>
        </div>
    )
}
