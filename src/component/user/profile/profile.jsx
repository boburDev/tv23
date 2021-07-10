import  { useState,useRef, useEffect } from 'react'
import st from './profile.module.css'
import profileImage from '../../../assets/image/profileImage.png'
import InputProfile from '../../../component/elements/inputProfile/inputProfile'
import { useTheme } from '../../../context/theme'

export default function Profile({ data }) {
    const inputRef = useRef()
    const [dark] = useTheme()
    const [isEdit, setIsEdit] = useState(false)
    const [IsOpenPass, setIsOpenPass] = useState(false)
    
    const handleTest =()=>{
        console.log(inputRef.current.value)
    }
    useEffect(()=>{
        setIsOpenPass(false)
    }, [isEdit])

    const textStyle = {
        color: dark ? '#fff' : '#000'
    }
    return (
        <div style={{background :dark ?  '#0C0C0D' : ''}} className={st.container}>
            <img src={profileImage} className={st.profileImage} alt=""/>
            <div className={st.mainContainer} style={{display:isEdit ? 'none' : ''}}>
                <div className={st.mainInfo}>
                    <div style={textStyle} className={st.nickName}>Nickname: {data && data.userName}</div>
                    <div className={st.pairs}>
                        <div className={st.key}>Баланс:</div><div style={textStyle} className={st.val}> 0 сум</div>
                    </div>
                </div>
                <div className={st.addInfo}>
                    <div className={`${st.pairs } ${st.pairsBottom}`}>
                        <div className={st.key}>Номер телефон: </div>
                        <div className={st.val} style={textStyle}>{data && data.userTel}</div>
                    </div>
                    <div className={st.pairs}>
                        <div className={st.key}>E-mail: </div><div className={st.val} style={textStyle}>Waiting...</div>
                    </div>
                   
                </div>
                <div className={st.actions}>
                        <div className={st.pairs}>
                            <div className={st.key}>23TV ID number: </div><div
                            style={{color: dark ? '#fff' : '#000'}}
                            className={st.val}> 00101</div>
                        </div>
                        <div onClick={()=>{setIsEdit(x=>!x)}} className={st.buttonLink}>Редактировать профиль</div>
                </div>
            </div>
        
            <div className={st.editContent} style={{display:isEdit ? ' ' : 'none'}}>
                <div className={st.mainInput}>
                {/* reference prop is give access input value - reference attributi inputning attributelariga kirish imkonini beradi */}
                    
                    <div style={{width:'50%', paddingRight:"20px"}}>
                        <InputProfile reference={inputRef} label="Ваше имя" /> 
                    </div>
                    <div style={{width:'50%', paddingLeft:"20px"}}>
                        <InputProfile label="Ваше номер телефона"/>
                    </div>
                    <div style={{width:'50%', paddingRight:"20px"}}>
                        <InputProfile type="email" label="E-mail"/>
                    </div>
                </div>
                <div style={{display:IsOpenPass ? '' : 'none'}}>
                    <div style={{...textStyle,...{marginTop:'20px',marginBottom:'10px'}}}  className={st.setPass}>
                        Установить новый пароль
                    </div>
                    <div className={st.setPass}>
                        <div style={{width:'50%', paddingRight:"20px"}}>
                            <InputProfile type='password' isPass={true} label="Придумайте новый пароль"/>
                        </div>
                        <div  style={{width:'50%', paddingRight:"20px"}}>
                            <InputProfile type='password' isPass={true} label="Повторите новый пароль"/>
                        </div>
                    </div>
                    
                </div>
                <div className={st.actions}>
                            <div onClick={()=>{setIsOpenPass(true)}}  className={st.buttonLink} style={{display:IsOpenPass ? 'none': ' ', marginLeft:0, marginRight:'auto'}}>Установить новый пароль</div>
                            <div onClick={()=>{setIsEdit(x=>!x); handleTest()}} className={st.buttonLink}>Сохранить</div>
                    </div>
            </div>
        </div>
    )
}
