import { NavLink } from 'react-router-dom'
import logout from '../../assets/image/logout.png'
import { useTheme } from '../../context/theme'
import st from './profileSideBar.module.css'

export default function ProfileSideBar() {
    const [dark] = useTheme()
    return (
        <div style={{background:dark ? 'black':'white'}} className={st.container}>
            <ul className={st.sidebarLinks}>
                <li>
                    <NavLink
                    activeClassName={dark ? st.sideLinkActive:st.sideLinkActiveDark}
                    className={ dark ? st.sideLink : st.sideLinkLight}
                    to="/settings/profile"
                    >
                    Аккаунт
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    activeClassName={dark ? st.sideLinkActive:st.sideLinkActiveDark}

                    className={st.sideLink}
                    to="/settings/follow"
                    >
                    Подписки
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    activeClassName={dark ? st.sideLinkActive:st.sideLinkActiveDark}
                    className={st.sideLink}
                    to="/settings/payment"
                    >
                    Оплата
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    activeClassName={dark ? st.sideLinkActive:st.sideLinkActiveDark}
                    className={st.sideLink}
                    to="/settings/history"
                    >
                    История
                    </NavLink>
                </li>
            </ul>
            <div className={st.exitbtn}>
                <img src={logout} alt="/"/> Выход
            </div>
        </div>
    )
}
