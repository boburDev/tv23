import st from "./following.module.css";
import checkMark from "../../../assets/image/check-mark.png";
import { useTheme } from "../../../context/theme";
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'

export default function Following() {
  const [dark] = useTheme();
  const [ til ] = useLang()

  return (
    <div className={st.container}>
      <div
        className={st.box}
        style={{ background: dark ? "#111112" : "white" }}
      >
        <div style={{ color: dark ? "" : "black" }} className={st.title}>
          <div>Lorem1</div>
          <div>({Language[til].user.following.actual})</div>
        </div>
        <div style={{ display: "flex" }}>
          <div className={st.description}>
          {Language[til].user.profile.accessTv}
          </div>
          <div className={st.costSection}>
            <div className={st.cost}>
              <img src={checkMark} alt="" />
              <div className={st.spell}>{Language[til].user.following.chargeDays}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
