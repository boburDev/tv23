import { useState, useRef, useEffect } from 'react'
import goBack from '../../../assets/image/goBack.png'
import st from './login.module.css'
import InputProfile from '../../elements/inputProfile/inputProfile'
import Button from '../../elements/button/button'
import { useTheme } from '../../../context/theme'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { useApi } from '../../../context/api'

export default function SignIn() {
    const [dark] = useTheme()
    const [api] = useApi()
    const history = useHistory()
    const language = useParams()
    const phoneRef = useRef()
    const passRef = useRef()
    const [error, setError] = useState({
        isError:false,
        message:null
    })
    
    const checkUser = true
    
    useEffect(()=>{
        //agar token haqiqiy bo'lsa check user true qaytaradi agar haqiqiy bo'lmasa uni 
        // localstoragedan o'chirib tashlaydi
        if(!window.localStorage.getItem('Authorization') && !checkUser){
            history.goBack()
        }
    }, [history,checkUser])

    const handleSignIn=async()=>{
        try {
            const res =await axios.post(`${api}/login-user`, {
                phoneNumber:phoneRef.current.value,
                password:passRef.current.value
            })

            if(res.data.accessToken){
                console.log(res.data)
                window.localStorage.setItem('Authorization', res.data.accessToken)
                history.push('/')
                setError({isError:false, message:null})
            }
        } catch (error) {
            console.log(error)
            setError({isError:true, message:'Login yoki parol xato'})
        }
    }

    const handleOnChange=()=>{
        setError({isError:false, message:null})
    }

    return (
        <div>
            <div className={st.navigation}>
                <img src={goBack} alt=""/>
            </div>
            <div className={st.title}>
                <div  style={{color:dark ? '' : 'black'}}>Войти</div>
                <Link to={`/${language.lang || 'ru'}/sign-up`} className={st.regLink}>Регистрация</Link>
            </div>
            <InputProfile onChange={handleOnChange} isCorrect={!error.isError} reference={phoneRef}  label='Телефон номер'/>
            <InputProfile  onChange={handleOnChange}  isCorrect={!error.isError} reference={passRef} label='Пароль' isPass={true} type='password'/>
            <div style={{color:'red'}}>{error.isError ? error.message  :' '} </div>
            
            <div onClick={handleSignIn}>
                <Button style={{width:'100%', marginTop:'30px'}}>Войти</Button>
            </div>
            <div className={st.buttonLink}>Восстановить пароль</div>
        </div>
    )
}
