import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"
import Navbar from "../../component/navbar/navbar"
import LiveContainer from '../../component/live/liveContainer/liveContainer'

export default function Live() {
    return (
        <>
        <Navbar />
        <LiveContainer />
        <Ads />
        <Footer />
        </>
    )
}