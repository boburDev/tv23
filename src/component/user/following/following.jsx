import st from './following.module.css'
import checkMark from '../../../assets/image/check-mark.png'
import { useTheme } from '../../../context/theme'
export default function Following() {
    const [dark] = useTheme()
    return (
        <div className={st.container}>
            <div className={st.box} style={{ background:dark ?'#111112' : 'white'}}>
                <div style={{color:dark ? '' : 'black'}} className={st.title}>
                    <div>Lorem1</div>
                    <div>(актуальное)</div>
                </div>
                <div style={{display:'flex'}}>
                    <div className={st.description}>
                    Получите доступ к более 60 телеканалам, таких как Тв-3, NTV, Муз-тв, Animal Planet, Zo'r TV, Yoshlar и многим другим разным тематическим каналам.
                    </div>
                    <div className={st.costSection}>  
                        <div className={st.cost}>
                            <img src={checkMark} alt=""/><div className={st.spell}>3 дня - 1500 сум</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
