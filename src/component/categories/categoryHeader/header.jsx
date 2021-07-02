import './header.css'
import filterIcon from '../../../assets/logo/filer-icon.svg'
import filterIconDark from '../../../assets/logo/filter-icon-light.svg'
import { useTheme } from '../../../context/theme'

export default function Header() {
  const [dark] = useTheme()
  return (
    <div
    style={{ background: dark ? '#0C0C0D':"#fff" }}
    className="container">
      <div className="row-container" style={{borderBottom: dark  ? '' : '1px solid rgba(17, 17, 17, 0.247)'}}>
		<div style={{color: dark ? '#fff':"#111112"}} className="title-category">
			Категории
		</div>
		<div onClick={()=>{}} className="favourites">
			<img
			src={dark ? filterIcon : filterIconDark}
			alt="" />
		</div>
	  </div>
    </div>
  )
}
