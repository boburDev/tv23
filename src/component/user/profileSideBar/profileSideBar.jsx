import { NavLink, useParams } from "react-router-dom";
import logout from "../../../assets/image/logout.png";
import { useTheme } from "../../../context/theme";
import st from "./profileSideBar.module.css";
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'

export default function ProfileSideBar() {
  const [dark] = useTheme();
  const [ til ] = useLang()
  const language = useParams();
  return (
    <div
      style={{ background: dark ? "black" : "white" }}
      className={st.container}
    >
      <ul className={st.sidebarLinks}>
        <li>
          <NavLink
            activeClassName={dark ? st.sideLinkActive : st.sideLinkActiveDark}
            className={dark ? st.sideLink : st.sideLinkLight}
            to={`/${language.lang || "ru"}/settings/profile`}
          >
            {Language[til].user.profileSidebar.accaunt}
          </NavLink>
        </li>
        <li style={{pointerEvents: 'none'}}>
          <NavLink
		  	
            activeClassName={dark ? st.sideLinkActive : st.sideLinkActiveDark}
            className={st.sideLink}
            to={`/${language.lang || "ru"}/settings/follow`}
          >
            {Language[til].user.profileSidebar.follow}
          </NavLink>
        </li>
        <li style={{pointerEvents: 'none'}}>
          <NavLink
            
            activeClassName={dark ? st.sideLinkActive : st.sideLinkActiveDark}
            className={st.sideLink}
            to={`/${language.lang || "ru"}/settings/payment`}
          >
            {Language[til].user.profileSidebar.payment}
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={dark ? st.sideLinkActive : st.sideLinkActiveDark}
            className={st.sideLink}
            to={`/${language.lang || "ru"}/settings/history`}
          >
            {Language[til].user.profileSidebar.history}
          </NavLink>
        </li>
      </ul>
      <div
        style={{ cursor: "pointer" }}
        className={st.exitbtn}
        onClick={() => {
          localStorage.removeItem("Authorization");
          window.location.href = `/${language.lang || "ru"}/login`;
        }}
      >
        <img src={logout} alt="logout" /> {Language[til].user.profileSidebar.exit}
      </div>
    </div>
  );
}
