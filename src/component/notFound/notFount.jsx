import { useTheme } from '../../context/theme'
import st from './notFound.module.css'

export default function NoFoundVideos() {
    const [dark] = useTheme()

    return (
        <div className={st.container}>
            <div className={st.text} style={{color:dark? ' ': 'black'}}>NO Found Videos</div>
        </div>
    )
}
