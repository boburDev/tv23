import st from './footer.module.css'
import { Link } from 'react-router-dom'
import telegram from '../../assets/logo/telegram_logo.svg'
import instagram from '../../assets/logo/instagram_logo.svg'
import facebook from '../../assets/logo/facebook_logo.svg'
import googlePlay from '../../assets/logo/play-market.svg'
import appStore from '../../assets/logo/app-store-logo.svg'
import { useTheme } from '../../context/theme'
function Footer () {
    const [dark] = useTheme()
    return (
        <>
        <footer className={st.footer}>
            <div className={st.footer_main} style={{background: dark ? '#121213' : '#F0F2F5'}}>
                <div className={st.container}>
                    <div className={st.footer_body}>
                        <div className={st.app_downloading}>
                            <p className={st.download_title}>
                                Скачать приложение вы можете через:
                            </p>
                            <Link className={st.download_link} to="#">
                                <img src={googlePlay} alt="google-play-icon"/>
                            </Link>
                            <Link className={st.download_link} to="#">
                                <img src={appStore} alt="google-play-icon"/>
                            </Link>
                            <div className={st.boxBottom} >
                                <div style={{color: dark ? '#fff' : '#000'}}
                                className={st.socialTitle}>Мы в соц. сетях: </div>
                                <ul className={st.social_links}>
                                    <li className={st.link_item}>
                                        <a href="https://www.instagram.com/23_tv.uz/" rel="noreferrer" target="_blank">
                                            <img src={instagram} alt="instagram_logo" />
                                        </a>
                                    </li>
                                    <li className={st.link_item}>
                                        <Link to="#">
                                            <img src={facebook} alt="facebook_logo"/>
                                        </Link>
                                    </li>
                                    <li className={st.link_item}>
                                        <Link to="#">
                                            <img src={telegram} alt="telegram_logo"/>
                                        </Link>
                                    </li>
                                </ul>
                             </div>
                        </div>

                       <div className={st.wrapper_footer}>
                       <ul className={`${st.categories} ${!dark ? st.dark : ''}`}>
                            <li className={st.category_item}>
                                <Link to="#">Фильмы</Link>
                            </li>
                            <li className={st.category_item}>
                                <Link to="#">Сериалы</Link>
                            </li>
                            <li className={st.category_item}>
                                <Link to="#">Все категории</Link>
                            </li>
                            <li className={st.category_item}>
                                <Link to="#" className={st.live}>LIVE <b><span style={{color: 'red'}}>&#183;</span></b></Link>
                            </li>
                            <li className={st.category_item}>
                                <Link to="#">Избранные</Link>
                            </li>
                        </ul>

                        <ul className={`${st.info_liks} ${!dark ? st.dark : ''}`}>
                            <li className={st.info_link__item}>
                                <Link to="#">О нас</Link>
                            </li>
                            <li className={st.info_link__item}>
                                <Link to="#">О компании</Link>
                            </li>
                            <li className={st.info_link__item}>
                                <Link to="#">Размещение рекламы</Link>
                            </li>
                            <li className={st.info_link__item}>
                                <Link to="#">Партнерам</Link>
                            </li>
                            <li className={st.info_link__item}>
                                <Link to="#">Вакансии</Link>
                            </li>
                        </ul>

                        <ul className={`${st.support_links} ${!dark ? st.dark : ''}`}>
                            <p>Техподдержка:</p>

                            <li className={st.support_link__item}>
                                <Link to="#">@Supportnaming.uz</Link>
                            </li>
                            <li className={st.support_link__item}>
                                <Link to="#">+99890 000-23-00</Link>
                            </li>

                            <p className={st.leave_comment}>Оставить отзыв:</p>

                            <li className={st.support_link__item}>
                                <Link to="#">@infonaming.uz</Link>
                            </li>
                        </ul>
                       </div>
                    </div>
                </div>   
            </div>
            <div className={st.footer_footer} style={{background: dark ? '#000' : '#EAEDF0'}}>
                <div className={st.container}>
                    <div className={st.social_links_and_author}>
                        <p className={`${st.author} ${!dark ? st.dark : ''}`}>© ООО Naming cinema 2021 inc</p>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer