import './ads.css'
import AdsBanner from '../../assets/image/ads_banner.svg'
import { useTheme } from '../../context/theme'

export default function Ads() {
    const [dark] = useTheme()    
    return (
        <div className="ads" style={{background: dark ? '#000000' : '#FFFFFF',}}>
            <div className="container">
                    <a href="/">
                        <img style={{width: "100%"}} src={AdsBanner} alt="" height="90" />
                    </a>
            </div>
        </div>
    )
}
