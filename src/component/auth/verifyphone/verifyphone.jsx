import Button from '../../elements/button/button'
import st from './verifyphone.module.css'
import goBack from '../../../assets/image/goBack.png'
import VerifyInput from '../../elements/verifyInput/verifyInput'
import { useTheme } from '../../../context/theme'
import { useEffect, useState } from 'react'
import { useLogin } from '../../../context/login'
import firebase from '../../../context/firebase'
import { useApi } from '../../../context/api'
import axios from 'axios'

export default function VerifyPhone() {
    const [dark] = useTheme()
    const [userState] = useLogin()
    const [api] = useApi()
    const [isSendSms] = useState(true)

    const setupReCaptcha =()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              console.log('setupReCaptcha')
              onSignInOnSubmit()
            }
          })
    }

    const onSignInOnSubmit=()=>{
        setupReCaptcha()
        const phoneNumber = userState.user.phone
        const appVerifier = window.recaptchaVerifier
        console.log('onSignInOnSubmit')
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {

                const code = window.prompt("Kodni kirit:")
                confirmationResult.confirm(code).then(async(result) => {

                    const res = await axios.post(`${api}/create-user`, {
                        username:userState.user.username,
                        password:userState.user.password,
                        phoneNumber:userState.user.password
                    })
                    if(res){
                        console.log('res', res)
                    // window.localStorage.setItem('autorization', res.data.accessToken)
                    // window.localStorage.setItem('user', JSON.stringify(res.data.data))
                    // history.push('/')
                    }
                    const user = result.user
                    console.log('user', user)
                }).catch((error) => {
                //not signed in
                })
            window.confirmationResult = confirmationResult
            // ...
            }).catch((error) => {
        //sms sent error
        })
    }
    

    useEffect( ()=>{
        if(!userState.error.isError){
            if(userState.user.username === '' || userState.user.phone === ''){
                // history.push('/sign-up')
            }else
            if(userState.user.password === ''){
                // history.push('/sign-up/password')
            }
        }
    }, [userState])

    return (
        <div>
            <div className={st.navigation}>
                <img src={goBack} alt=""/>
                <div id="recaptcha-container"></div>
            </div>
            {
                isSendSms ? <>
                <div style={{color:dark ? '' : 'black'}} className={st.title}>
                    Введите код отправленный на ваш номер телефона
                </div>
                
                <VerifyInput label="Пароль" />
                <div className={st.buttonLink}>Восстановить пароль</div>
                <div onClick={() => {
                    // onSignInOnSubmit
                    console.log('commentni och onSignInOnSubmit')
                }}>
                    <Button style={{width:'100%' , marginTop:'10px'}}>Подтвердить</Button>
                </div>
                </>
                : <>
                    {userState.user.phone}
                    <div onClick={()=>{
                        // onSignInOnSubmit
                        console.log('commentni och onSignInOnSubmit')
                    }}>
                        <Button style={{width:'100%' , marginTop:'10px'}}>SMS Jo'natish</Button>
                    </div>
                </>

            }
        </div>
    )
}