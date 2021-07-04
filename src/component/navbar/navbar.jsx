import st from './navbar.module.css'
import logo from '../../assets/logo/23tv_logo.svg'
import xIcon from '../../assets/logo/close_icon.svg'
import xIconDark from '../../assets/logo/close_icon_light.svg'
import fontIcon from '../../assets/logo/font_icon.svg'
import sunIconForLight from '../../assets/logo/sun_light_icon.svg'
import sunIcon from '../../assets/logo/sun_icon.svg'
import userIcon from '../../assets/logo/user_icon.svg'
import searchIconBlack from '../../assets/logo/search_icon_white.svg'
import searchIcon from '../../assets/logo/search_icon.svg'
import menuOpen from '../../assets/logo/menu_icon.svg'
import menuOpenLight from '../../assets/logo/menu_icon_light.svg'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useTheme } from '../../context/theme'
import { useLang } from '../../context/lanuage'
function Navbar({ login }) {
	const [isOpenSearch, setIsOpenSearch] = useState(false)
	const [isOpen, setIsOpen] = useState()
	const componentRef = useRef()
	const [dark, setDark] = useTheme()
	const [lang, setLang] = useLang()
	const [fontType, setFontType] = useState('MEDIUM')
	const [reload, setReload] = useState(false)
	const language = useParams()
	//toggle dark or light mode  and write localstorage

	const toggleDark = () => {
		setDark(x => {
			window.localStorage.setItem('dark_mode', !x ? 1 : 0)
			return !x
		})
	}

	useEffect(()=>{
		if (reload) {
			window.location.reload()
			setReload(false)
		}
	},[reload])

	const miniMenuStyle = {
		transition: ' all .3s ease',
		transform: isOpen ? 'translate(0, 0 )' : 'translate(-20px, 0) ',
		visibility: isOpen ? 'visible' : 'hidden',
		opacity: isOpen ? 1 : 0,
		userSelect: 'none'
	}

	useEffect(() => {
		function handleClickOutside(event) {
			if (componentRef.current && !componentRef.current.contains(event.target) && isOpen) {
				setIsOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [componentRef, isOpen, setIsOpen])

	const searchStyle = {
		transition: 'opacity .3s ease-in-out',
		position: isOpenSearch ? 'fixed' : '',
		top: isOpenSearch ? '0' : 'initial',
		left: isOpenSearch ? '0' : 'initial',
		zIndex: isOpenSearch ? 9999 : '',
		height: isOpenSearch ? '100vh' : '',
		width: isOpenSearch ? '100%' : '',
		opacity: isOpenSearch ? '.9' : '',
		background: dark ? '#0C0C0D' : '#F8F9FC',
	}


	const handleSearch = () => {

		setIsOpenSearch(x => !x)
	}
	useEffect(() => {
		if (isOpenSearch) window.onscroll = function () { window.scrollTo(null, null)}
		else window.onscroll = function () { }
	}, [isOpenSearch])

	

	const fontChange = (size) => {
		var domElements = document.querySelectorAll('a, p, div, h1, h2, h3, h4, h5, h6')
		for (let i = 0; i < domElements.length; i++) {
			switch(size){
				case 'SMALL' : domElements[i].style.fontSize = '12px'; break;
				case 'LARGE' : domElements[i].style.fontSize = '18px'; break;
				default: domElements[i].style.fontSize = ''
			}
		}
		setFontType(size)
	}

	return (
		<section style={searchStyle}>
			<div className={st.container}>
				<nav className={st.nav}>
					<Link className={st.logo_link} to={`/${language.lang || 'ru'}`}><img src={logo} alt="logo" /></Link>
					<ul style={{ display: isOpenSearch ? 'none' : '' }} className={st.navbar}>
						<li className={st.navbar_link_item}>
							<Link to={`/${language.lang || 'ru'}/categories/фильмы`}>Фильмы</Link>
						</li>
						<li className={st.navbar_link_item}>
							<Link to={`/${language.lang || 'ru'}/categories/сериалы`}>Сериалы</Link>
						</li>
						<li className={st.navbar_link_item}>
							<Link to={`/${language.lang || 'ru'}/categories`}>Все категории</Link>
						</li>
						<li className={st.navbar_link_item}>
							<Link style={{ color: "red" }} to={`/${language.lang || 'ru'}/live`} >LIVE</Link>
						</li>
						<li className={st.navbar_link_item}>
							<Link to={`/${language.lang || 'ru'}/favourites`}>Избранные</Link>
						</li>
					</ul>
					<div className={st.user_tools} style={{ width: isOpenSearch ? '100%' : '100%' }}  >
						<div className={st.search_tool} htmlFor="search_tool" style={{
							width: isOpenSearch ? ' 100%' : '',
							marginLeft: 'auto',
							backgroundColor: dark ? '' : '#F6F6F6'
						}}>

							<input
								style={{ color: dark ? '' : '#888888' }}
								onFocus={() => { setIsOpenSearch(true) }}
								id="search_tool"
								type="text"
								placeholder=""
							/>

							<div
								onClick={handleSearch}
								className={st.search_icon}
							>
								<img src={isOpenSearch ? (dark ? xIcon : xIconDark) : (dark ? searchIcon : searchIconBlack)} alt="search-icon" />
							</div>

						</div>

					</div>
					<div className={`${st.language} ${dark ? st.dark : ''}`}>
						<Link to="/ru" style={{fontWeight: lang === 'ru' ? 900 : 400}}
						onClick={() => {
							setLang('ru')
							setReload(true)
						}}>RU</Link>
						<span style={{ color: !dark ? "black" : 'white' }}>|</span>
						<Link to="/uz" style={{fontWeight: lang === 'uz' ? 900 : 400}}
						onClick={() => {
							setLang('uz')
							setReload(true)
						}}>UZ</Link>
					</div>

					{/* Mini menu for mobile devices */}

					<div ref={componentRef}>
						<div style={miniMenuStyle} className={st.miniMenu}>
							<div>
								<ul className={st.navbar} style={{ display: login ? 'none' : '' }}>
									<li className={st.navbar_link_item}>
										<Link to={`/${language.lang || 'ru'}/categories/films`}>Фильмы</Link>
									</li>
									<li className={st.navbar_link_item}>
										<Link to={`/${language.lang || 'ru'}/categories/serials`}>Сериалы</Link>
									</li>
									<li className={st.navbar_link_item}>
										<Link to={`/${language.lang || 'ru'}/categories`}>Все категории</Link>
									</li>
									<li className={st.navbar_link_item}>
										<Link to={`/${language.lang || 'ru'}/live`} style={{ color: "red" }}>LIVE</Link>
									</li>
									<li className={st.navbar_link_item}>
										<Link to={`/${language.lang || 'ru'}/favourites`}>Избранные</Link>
									</li>
								</ul>

								<Link to={`/${language.lang || 'ru'}/settings/profile`} className={st.menuItem}>
									<img src={userIcon} alt="" /><div className={st.itemName}>Настройки аккаунта</div>
								</Link>
								<div onClick={toggleDark} className={st.menuItem}>
									<img src={dark ? sunIcon : sunIconForLight} alt="" /><div className={st.itemName}>{dark ? `Темный режим` : `Светлый режим`}</div>
								</div>
								<div className={st.menuItem}>
									<img src={fontIcon} alt="" /><div className={st.itemName}>Размеры шрифта</div>
									<div className={st.itemChild}>
										<div className={`${st.childItem} ${fontType === 'SMALL' ? "active": ''}`} onClick={() => { fontChange('SMALL') }}>Маленькие</div>
										<div className={`${st.childItem} ${fontType === 'MEDIUM' ? "active": ''}`} onClick={() => { fontChange('MEDIUM') }} >Средние</div>
										<div className={`${st.childItem} ${fontType === 'LARGE' ? "active": ''}`} onClick={() => { fontChange('LARGE') }}>Крупные</div>
									</div>
								</div>
							</div>
						</div>
						<div className={st.toggleIcon}>
							<div onClick={()=>setIsOpen(!isOpen)} style={{display:'flex'}}>
								<img style={{cursor:'pointer'}} src={
									isOpen ? (dark ? xIcon : xIconDark) : (dark ? menuOpen : menuOpenLight)
								} alt="close_icon" />
							</div>
						</div>
					</div>
				</nav>
			</div>
			{/* {isOpenSearch ? (movies.length > 0 ?
				<div className={st.containerItems}>
					{
						movies.map((x, key) => {
							return <MovieItem key={key} movie={x} />
						})
					}


				</div>
				:  <SearchNotFound loading={loading} />)  : ''} */}
		</section>
	)
}

export default Navbar