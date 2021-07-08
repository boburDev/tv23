import st from './login.module.css'
import Navbar from "../../../component/categories/categoryNavbar/navbar"
import MaskLogin from '../../../assets/image/MaskLogin.png'
import SignIn from '../../../component/auth/login/login'
export default function Login () {
    return (
        <>
        <div className={st.container}>
            <Navbar />
            <div className={st.area}>
               <div className={st.fields}>
                    <SignIn />
               </div>
               <div className={st.mask}> 
                  <img src={MaskLogin} alt=""/>
               </div>
           </div>
        </div>
        </>
    )
}