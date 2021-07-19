import Button from "../../elements/button/button";
import st from "./verifyphone.module.css";
// import goBack from "../../../assets/image/goBack.png";
import VerifyInput from "../../elements/verifyInput/verifyInput";
import { useTheme } from "../../../context/theme";
import { useEffect, useState } from "react";
import { useLogin } from "../../../context/login";
import firebase from "../../../context/firebase";
import Language from "../../../languages";
import { useLang } from "../../../context/lanuage.jsx";
import { useApi } from "../../../context/api";
import axios from "axios";

export default function VerifyPhone({ recover }) {
  const [dark] = useTheme();
  const [userState] = useLogin();
  const [api] = useApi();
  const [isSendSms] = useState(true);
  const [verifyCode, setVerfyCode] = useState({});
  const [til] = useLang();

  const setupReCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      }
    );
  };

  const onSignInOnSubmit = async () => {
    setupReCaptcha();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = userState.user.phone;
    try {
      const confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      console.log(confirmationResult);
    } catch (err) {
      // sms sent err
      console.log("send sms err", err.message);
    }
  };

  // if (recover) {
  //   checkVerification()
  // } else {
  //   checkVerification()
  // }

  const checkVerification = async () => {
    try {
      await window.confirmationResult.confirm(verifyCode)
      const res = await axios.post(`${api}/create-user`, {
        username: userState.user.username,
        password: userState.user.password,
        age: userState.user.age - 0,
        phoneNumber: userState.user.phone,
      });
      const resData = res.data.accessToken;
      if (resData) {
        localStorage.setItem("Authorization", resData);
        window.location.href = "/ru";
      }
    } catch (err) {
      console.log("create user firebase err", err.message);
    }
  };

  useEffect(() => {
    onSignInOnSubmit();
  });

  return (
    <div>
      <div className={st.navigation}>
        <img src={""} alt="" />
        <div id="recaptcha-container"></div>
      </div>
      {isSendSms ? (
        <>
          <div style={{ color: dark ? "" : "black" }} className={st.title}>
            {Language[til].auth.verifyPhone.sentPassword}
          </div>
          <VerifyInput verifyCode={verifyCode} setVerfyCode={setVerfyCode} />
          <div className={st.buttonLink}>
            {Language[til].auth.verifyPhone.resend}
          </div>
          <div onClick={checkVerification}>
            <Button style={{ width: "100%", marginTop: "10px" }}>
              {Language[til].auth.verifyPhone.confirm}
            </Button>
          </div>
        </>
      ) : (
        <>
          {userState.user.phone}
          <div
            onClick={() => {
              // onSignInOnSubmit
              console.log("commentni och onSignInOnSubmit");
            }}
          >
            <Button style={{ width: "100%", marginTop: "10px" }}>
              {Language[til].auth.verifyPhone.sendSms}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
