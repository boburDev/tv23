import { NavLink, useParams } from "react-router-dom";
import logout from "../../../assets/image/logout.png";
import { useTheme } from "../../../context/theme";
import st from "./profileSideBar.module.css";

export default function ProfileSideBar() {
  const [dark] = useTheme();
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
            Аккаунт
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={dark ? st.sideLinkActive : st.sideLinkActiveDark}
            className={st.sideLink}
            to={`/${language.lang || "ru"}/settings/follow`}
          >
            Подписки
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={dark ? st.sideLinkActive : st.sideLinkActiveDark}
            className={st.sideLink}
            to={`/${language.lang || "ru"}/settings/payment`}
          >
            Оплата
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={dark ? st.sideLinkActive : st.sideLinkActiveDark}
            className={st.sideLink}
            to={`/${language.lang || "ru"}/settings/history`}
          >
            История
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
        <img src={logout} alt="logout" /> Выход
      </div>
    </div>
  );
}
