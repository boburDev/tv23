import st from './account.module.css'
import { Redirect, Route } from 'react-router'
import Footer from '../../component/footer/footer'
import Navbar from '../../component/navbar/navbar'
import Profile from '../../component/user/profile/profile'
import profileImage from '../../assets/image/profileImage.png'
import maskProfile from '../../assets/image/maskProfile.png'
import Following from '../../component/user/following/following'
import ProfileSideBar from '../../component/profileSideBar/profileSideBar'

export default function Settings() {
    return (
        <>
            <Navbar />
            <div className={st.mask}>
                <img src={maskProfile} alt="" />
                <div className={st.imageAvatar}>
                    <div className={st.usernameBox}>USERNAME</div><img src={profileImage} alt="" />
                </div>
            </div>
            <div className={st.balance}> 
                    <div className={st.pairs}>
                        <div className={st.key}>Баланс:</div><div className={st.val}> 0 сум</div>
                    </div>
                    <div className={st.pairs}>
                        <div className={st.key}> ID number: </div><div className={st.val}> 00101</div>
                    </div>
            </div>
            <div className={st.contentContainer}>
                <div className={st.content}>
                    <Route path='/'><Redirect to='/settings/profile'/></Route>
                    <Route path='/settings/profile' component={Profile} />
                    <Route path='/settings/follow' component={Following} />
                    
                </div>
                <div className={st.sidebar}>
                    <ProfileSideBar />
                </div>
            </div>
            <Footer />
        </>
    )
}
