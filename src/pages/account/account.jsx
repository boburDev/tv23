import st from './account.module.css'
import { Redirect, Route } from 'react-router'
import Footer from '../../component/footer/footer'
import Navbar from '../../component/navbar/navbar'
import Profile from '../../component/user/profile/profile'
import profileImage from '../../assets/image/profileImage.png'
import maskProfile from '../../assets/image/maskProfile.png'
import Following from '../../component/user/following/following'
import ProfileSideBar from '../../component/user/profileSideBar/profileSideBar'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/user'
import { useEffect, useState } from 'react'
export default function Settings() {
    const language = useParams()
    const [auth] = useAuth()
    const [response, setResponse] = useState({})

    useEffect(()=>{
        if (auth === 400) {
            localStorage.removeItem('Authorization')
            window.location.href = `/${language.lang || 'ru'}/login`
        } else {
            setResponse(auth)
        }
    },[auth,language])

    return (
        <>
            <Navbar />
            <div className={st.mask}>
                <img src={maskProfile} alt="" />
                <div className={st.imageAvatar}>
                    <div className={st.usernameBox}>USERNAME</div><img src={profileImage} alt="" />
                </div>
            </div>
            {/* <div className={st.balance}> 
                    <div className={st.pairs}>
                        <div className={st.key}>Баланс:</div><div className={st.val}> 0 сум</div>
                    </div>
                    <div className={st.pairs}>
                        <div className={st.key}> ID number: </div><div
                        className={st.val}> 00101</div>
                    </div>
            </div> */}
            <div className={st.contentContainer}>
                <div className={st.content}>
                    <Route path='/'><Redirect to={`/${language.lang || 'ru'}/settings/profile`}/></Route>
                    <Route path={`/${language.lang || 'ru'}/settings/profile`}>
                        <Profile data={response} />
                    </Route>
                    <Route path={`/${language.lang || 'ru'}/settings/follow`} component={Following} />
                </div>
                <div className={st.sidebar}>
                    <ProfileSideBar />
                </div>
            </div>
            <Footer />
        </>
    )
}
