import st from "./ads.module.css";
import AdsBanner from "../../assets/image/ads_banner.svg";
import { useTheme } from "../../context/theme";

export default function Ads() {
  const [dark] = useTheme();

  return (
    <div
      className={st.ads}
      style={{ background: dark ? "#0C0C0D" : "#F8F9FC" }}
    >
      <div className={st.container}>
        <a href="/">
          <img style={{ width: "100%" }} src={AdsBanner} alt="" height="90" />
        </a>
      </div>
    </div>
  );
}
