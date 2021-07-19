import { useState, useRef } from 'react'
import goBack from '../../../assets/image/goBack.png'
import st from './login.module.css'
import InputProfile from '../../elements/inputProfile/inputProfile'
import Button from '../../elements/button/button'
import { useTheme } from '../../../context/theme'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useApi } from '../../../context/api'
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage.jsx'

export default function SignIn() {
    const [dark] = useTheme()
    const [api] = useApi()
    const language = useParams()
    const phoneRef = useRef()
    const passRef = useRef()
    const [error, setError] = useState({
        isError:false,
        message:null
    })
    const [ til ] = useLang()

    async function handleSignIn() {
        try {
            const res = await axios.post(`${api}/login-user`, {
                phoneNumber: phoneRef.current.value || '+998902121212',
                password: passRef.current.value || '1'
            })
            console.log(res.data)
            if(res.data && res.data.accessToken) {
                localStorage.setItem('Authorization', res.data.accessToken)
                setError({isError:false, message:null})
                window.location.href = `/${language.lang || 'ru'}`
            }
        } catch (error) {
            setError({isError:true, message:'Login yoki parol xato'})
        }
    }

    const handleOnChange = () => setError({isError:false, message:null})

    return (
        <div>
            <div className={st.navigation}>
                <img src={goBack} alt=""/>
            </div>
            <div className={st.title}>
                <div  style={{color:dark ? '' : 'black'}}>{Language[til].auth.login.enter}</div>
                <Link to={`/${language.lang || 'ru'}/sign-up`} className={st.regLink}>{Language[til].auth.login.register}</Link>
            </div>
                <InputProfile onChange={handleOnChange} isCorrect={!error.isError} reference={phoneRef}  label={Language[til].auth.login.labelPhone}/>
                <InputProfile  onChange={handleOnChange}  isCorrect={!error.isError} reference={passRef} label={Language[til].auth.login.labelPassword} isPass={true} type='password'/>
            <div style={{color:'red'}}>{error.isError ? error.message  :' '}</div>
            <div onClick={handleSignIn}>
                <Button style={{width:'100%', marginTop:'30px'}}>{Language[til].auth.login.enter}</Button>
            </div>
            <div className={st.buttonLink}>{Language[til].auth.login.restorePassword}</div>
        </div>
    )
}
