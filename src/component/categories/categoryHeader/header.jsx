import st from './header.module.css'
import filterIcon from '../../../assets/logo/filer-icon.svg'
import filterIconDark from '../../../assets/logo/filter-icon-light.svg'
import { useTheme } from '../../../context/theme'

export default function Header({ allCategory }) {
  const [dark] = useTheme()
  return (
    <div
    style={{ background: dark ? '#0C0C0D':"#F8F9FC" }}
    className={st.container}>
      <div className={st.row_container} style={{borderBottom: dark  ? '1px solid #777777' : '1px solid #1111113f'}}>
		<div style={{color: dark ? '#fff':"#111112"}} className={st.title_category}>
			{
				(allCategory === 'all') ? "Категории" : "Категории"
			}
		</div>
		<div onClick={()=>{}} className={st.favourites}>
			<img
			src={dark ? filterIcon : filterIconDark}
			alt="" />
		</div>
	  </div>
    </div>
  )
}
