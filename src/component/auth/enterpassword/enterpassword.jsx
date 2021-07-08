import st from './enterpassword.module.css'
import goBack from '../../../assets/images/goBack.png'
import InputProfile from '../../elements/inputProfile/inputProfile'
import Button from '../../elements/button/button'
import { useTheme } from '../../../context/theme'
import { useLogin } from '../../../context/login'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router'

export default function EnterPassword() {
    const [dark] = useTheme()
    const history = useHistory()
    const [userState, setUserState] = useLogin()

    useEffect(()=>{
        if(userState.user.username === '' || userState.user.phone === '' ){
            history.push('/sign-up')
        }
    }, [history, userState])

    const pass1Ref = useRef()
    const pass2Ref = useRef()

    const handlePassword =()=>{
        const result = validate(pass1Ref.current.value, pass2Ref.current.value)
        if(result.isValid){
            setUserState(function (state){
                return {
                    ...state,
                    user:{
                        ...state.user,
                        password: pass1Ref.current.value
                    }
                }
            })
            history.push('/sign-up/password/verify')
        }
    }

    const validate=(pass1, pass2)=>{
        var isValid =false;
        var message = null;
        if(pass1 === '' || pass2 === ''){
                message = 'Parol maydoni bo\'sh bo\'lishi mumkin emas!' 
        }else{
            if(pass1 === pass2){
                isValid=true
                message=null
            }else{
                message = 'Parollar bir xil emas'            
            }
        }
        return {
            isValid:isValid,
            message:message
        }
    }

    useEffect(()=>{
        console.log(userState)
    }, [userState])

    const handleChange =()=>{
        const result = validate(pass1Ref.current.value, pass2Ref.current.value)
        if(result.isValid){
            
            setUserState(function(state){
                return {
                    ...state, error:{
                        isError:false,
                        message:result.message
                    }
                }
            })
        }else{
            setUserState(function(state){
                return {
                    ...state, error:{
                        isError:true,
                        message:result.message
                    }
                }
            })
        }
    }

    return (
        <div>
            <div className={st.navigation}>
                <img src={goBack} alt=""/>
            </div>
            <div
            style={{color:dark ? '' : 'black'}}
            className={st.title}> Придумайте пароль</div>
            <div className={st.description}> В целях безопасности ваш пароль должен состоять из 6 или более символов.</div>
            <InputProfile onChange={handleChange} reference={pass1Ref} type='password' isPass={true} label="Пароль"/>
            <InputProfile onChange={handleChange} reference={pass2Ref} type='password' isPass={true} label="Повторите пароль"/>
            
            { userState.error.isError ? userState.error.message : '' }

            <div
            onClick={userState.error.isError ? ()=>{} : handlePassword}>
                <Button
                style={{
                    width:'100%',
                    marginTop:'20px',
                    cursor:userState.error.isError ? 'not-allowed' :'pointer',
                    background:userState.error.isError  ? '#e4888c' : ''
                }}>Зарегистрироваться</Button>
            </div>
        </div>
    )
}
