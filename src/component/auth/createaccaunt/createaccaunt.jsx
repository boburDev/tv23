import goBack from '../../../assets/images/goBack.png'
import st from './createaccaunt.module.css'
import InputProfile from '../../elements/inputProfile/inputProfile'
import Button from '../../elements/button/button'
import { useEffect, useRef } from 'react'
import { useLogin } from '../../../context/login'

import { Link, useHistory } from 'react-router-dom'
export default function CreateAccount() {
    const [setUserState] = useLogin(true)
    const phoneRef = useRef()
    const history = useHistory()
    const usernameRef = useRef()

    const handleInfo=()=>{
        setUserState((state)=>{
            return {
                ...state, 
                    user:{
                        phone:phoneRef.current.value,
                        username:usernameRef.current.value
                    }
            }
        })
        history.push('/sign-up/password')
    }

    return (
        <div>
            <div className={st.navigation}>
                <img src={goBack} alt=""/>
            </div>
            <div className={st.title}>
                <div >Создать аккаунт</div>
                <Link to="/login" style={{color: 'red', textDecoration: 'none'}}>Вход</Link>
            </div>
                <InputProfile reference={phoneRef} label="Тел.номер" />
                <InputProfile reference={usernameRef} label="Имя пользователя"/>
                <div  onClick={ handleInfo }>
                    <Button style={{width:'100%', marginTop:'30px'}} >Перейти дальше</Button>
                </div>
        </div>
    )
}
