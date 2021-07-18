import { useState, useRef, useEffect } from "react";
import st from "./profile.module.css";
import profileImage from "../../../assets/image/profileImage.png";
import InputProfile from "../../../component/elements/inputProfile/inputProfile";
import { useTheme } from "../../../context/theme";
import logout from "../../../assets/image/logoutred.png";
import { useParams } from "react-router-dom";
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'

export default function Profile({ data }) {
  const inputRef = useRef();
  const [dark] = useTheme();
  const [isEdit, setIsEdit] = useState(false);
  const [IsOpenPass, setIsOpenPass] = useState(false);
  const language = useParams();
  const [ til ] = useLang()

  const handleTest = () => {
    console.log(inputRef.current.value);
  };
  useEffect(() => {
    setIsOpenPass(false);
  }, [isEdit]);

  const textStyle = {
    color: dark ? "#fff" : "#000",
  };
  return (
    <div style={{ background: dark ? "#0C0C0D" : "" }} className={st.container}>
      <img src={profileImage} className={st.profileImage} alt="" />
      <div
        className={st.mainContainer}
        style={{ display: isEdit ? "none" : "" }}
      >
        <div className={st.mainInfo}>
          <div style={textStyle} className={st.nickName}>
          {Language[til].user.profile.nickname}: {data && data.userName}
          </div>
          <div className={st.pairs}>
            <div className={st.key}>{Language[til].user.profile.balans}:</div>
            <div style={textStyle} className={st.val}>
              {" "}
              {Language[til].user.profile.price} сум
            </div>
          </div>
        </div>
        <div className={st.addInfo}>
          <div className={`${st.pairs} ${st.pairsBottom}`}>
            <div className={st.key}>{Language[til].user.profile.phoneNumber}: </div>
            <div className={st.val} style={textStyle}>
              {data && data.userTel}
            </div>
          </div>
          <div className={st.pairs}>
            <div className={st.key}>E-mail: </div>
            <div className={st.val} style={textStyle}>
              Waiting...
            </div>
          </div>
        </div>
        <div className={st.actions}>
          <div className={st.pairs}>
            <div className={st.key}>{Language[til].user.profile.idNumber}: </div>
            <div style={{ color: dark ? "#fff" : "#000" }} className={st.val}>
              00101
            </div>
          </div>
          <div>
            <div
              onClick={() => {
                setIsEdit((x) => !x);
              }}
              className={st.buttonLink}
            >
              {Language[til].user.profile.editProfile}
            </div>
            <div
              className={st.logoutBtn}
              onClick={() => {
                localStorage.removeItem("Authorization");
                window.location.href = `/${language.lang || "ru"}/login`;
              }}
            >
              <img src={logout} alt="logout" /> {Language[til].user.profile.exit}
            </div>
          </div>
        </div>
      </div>

      <div
        className={st.editContent}
        style={{ display: isEdit ? " " : "none" }}
      >
        <div className={st.mainInput}>
          {/* reference prop is give access input value - reference attributi inputning attributelariga kirish imkonini beradi */}

          <div style={{ width: "50%", paddingRight: "20px" }}>
            <InputProfile reference={inputRef} label={Language[til].user.profile.nameLabel} />
          </div>
          <div style={{ width: "50%", paddingLeft: "20px" }}>
            <InputProfile label={Language[til].user.profile.numberLabel} />
          </div>
          <div style={{ width: "50%", paddingRight: "20px" }}>
            <InputProfile type="email" label="E-mail" />
          </div>
        </div>
        <div style={{ display: IsOpenPass ? "" : "none" }}>
          <div
            style={{
              ...textStyle,
              ...{ marginTop: "20px", marginBottom: "10px" },
            }}
            className={st.setPass}
          >
            Установить новый пароль
          </div>
          <div className={st.setPass}>
            <div style={{ width: "50%", paddingRight: "20px" }}>
              <InputProfile
                type="password"
                isPass={true}
                label={Language[til].user.profile.setNewPassword}
              />
            </div>
            <div style={{ width: "50%", paddingRight: "20px" }}>
              <InputProfile
                type="password"
                isPass={true}
                label={Language[til].user.profile.retypeNewPassword}
              />
            </div>
          </div>
        </div>
        <div className={st.actions}>
          <div
            onClick={() => {
              setIsOpenPass(true);
            }}
            className={st.buttonLink}
            style={{
              display: IsOpenPass ? "none" : " ",
              marginLeft: 0,
              marginRight: "auto",
            }}
          >
            {Language[til].user.profile.labelPassword}
          </div>
          <div
            onClick={() => {
              setIsEdit((x) => !x);
              handleTest();
            }}
            className={st.buttonLink}
          >
            {Language[til].user.profile.save}
          </div>
        </div>
      </div>
    </div>
  );
}
