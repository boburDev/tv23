import st from "./ads.module.css"
import { useTheme } from "../../context/theme"
import { useEffect, useState } from "react"
import { useApi } from '../../context/api'
import axios from "axios"

export default function Ads() {
	const [dark] = useTheme()
	const [api] = useApi()
	const [ads, setAds] = useState({})
	
	async function ADS(api) {
		try {
      const res = await axios.get(api + '/ads/')
		  setAds(res.data.data)
    } catch (error) {
      
    }
	}


	useEffect(() => {
		if (api) {
			ADS(api)
		}
	},[api])

  return (
    <div
      className={st.ads}
      style={{ background: dark ? "#0C0C0D" : "#F8F9FC" }}
    >
      <div className={st.container}>
        <a href={`${ads.ads_link}`}>
          <img src={`${api}/${ads.ads_path}`} alt="" height="20" />
        </a>
      </div>
    </div>
  )
}
