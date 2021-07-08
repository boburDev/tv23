import goBack from '../../../assets/image/goBack.png'
import st from './createaccaunt.module.css'
import InputProfile from '../../elements/inputProfile/inputProfile'
import Button from '../../elements/button/button'
import { useRef } from 'react'
import { useLogin } from '../../../context/login'

import { Link, useParams } from 'react-router-dom'
export default function CreateAccount() {
    const [setLoginInfo] = useLogin(true)
    const phoneRef = useRef()
    const usernameRef = useRef()
    const ageRef = useRef()
    const language = useParams()
    const handleInfo=()=>{
        if (phoneRef.current.value && usernameRef.current.value && ageRef.current.value) {
            setLoginInfo((state)=>{
                return {
                    ...state, 
                    user:{
                        phone: phoneRef.current.value,
                        username: usernameRef.current.value,
                        age: ageRef.current.value
                    },
                    signUp: 'password'
                }
            })
        }
    }

    return (
        <div>
            <div className={st.navigation}>
                <img src={goBack} alt=""/>
            </div>
            <div className={st.title}>
                <div >Создать аккаунт</div>
                <Link to={`/${language.lang || 'ru'}/login`} className={st.regLink}>Вход</Link>
            </div>
                <InputProfile reference={phoneRef} label="Тел.номер" />
                <InputProfile reference={usernameRef} label="Имя пользователя"/>
                <InputProfile reference={ageRef} label="Возраст"/>
                <div onClick={handleInfo}>
                    <Button style={{width:'100%', marginTop:'30px'}} >Перейти дальше</Button>
                </div>
        </div>
    )
}
