import { useTheme } from '../../context/theme'
import './notFound.css'

export default function NoFoundVideos() {
    const [dark] = useTheme()

    return (
        <div className="container">
            <div className="text" style={{color:dark? ' ': 'black'}}>NO Found Videos</div>
        </div>
    )
}
