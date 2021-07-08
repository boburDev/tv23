import Navbar from '../../../component/navbar/navbar'
import st from '../auth.module.css'
import MaskLogin from '../../../assets/image/MaskLogin.png'
import CreateAccount from '../../../component/auth/createaccaunt/createaccaunt'
import EnterPassword from '../../../component/auth/enterpassword/enterpassword'
import VerifyPhone from '../../../component/auth/verifyphone/verifyphone'

import { useLogin } from '../../../context/login'

export default function SignUp () {
    const [login] = useLogin()
    console.log(login && login.signUp)
    return (
        <>
        <div className={st.container}>
           <Navbar/>
           <div className={st.area}>
               <div className={st.fields}>
                {
                    (login && login.signUp === 'password') ? <EnterPassword /> : (login && login.signUp === 'verify') ? <VerifyPhone /> : <CreateAccount />
                }
               </div>
               <div className={st.mask}> 
                <img src={MaskLogin} alt=""/>
               </div>
           </div>
        </div>
        </>
        
    )
}