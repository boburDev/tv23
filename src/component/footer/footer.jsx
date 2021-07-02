import './footer.css'
import { Link } from 'react-router-dom'
import telegram from '../../assets/logo/telegram_logo.svg'
import instagram from '../../assets/logo/instagram_logo.svg'
import facebook from '../../assets/logo/facebook_logo.svg'
import googlePlay from '../../assets/logo/play-market.svg'
import appStore from '../../assets/logo/app-store-logo.svg'

function Footer () {
    return (
        <>
        <footer className="footer">
            <div className="footer-main">
                <div className="container">
                    <div className="footer_body">
                        <div className="app_downloading">
                            <p className="download_title">
                                Скачать приложение вы можете через:
                            </p>
                            <Link className="download_link" to="#">
                                <img src={googlePlay} alt="google-play-icon"/>
                            </Link>
                            <Link className="download_link" to="#">
                                <img src={appStore} alt="google-play-icon"/>
                            </Link>
                            <div className="boxBottom">
                                <div className="socialTitle">Мы в соц. сетях: </div>
                                <ul className="social_links">
                                    <li className="link_item">
                                        <a href="https://www.instagram.com/23_tv.uz/" rel="noreferrer" target="_blank">
                                            <img src={instagram} alt="instagram_logo"/>
                                        </a>
                                    </li>
                                    <li className="link_item">
                                        <Link to="#">
                                            <img src={facebook} alt="facebook_logo"/>
                                        </Link>
                                    </li>
                                    <li className="link_item">
                                        <Link to="#">
                                            <img src={telegram} alt="telegram_logo"/>
                                        </Link>
                                    </li>
                                </ul>
                             </div>
                        </div>

                       <div className="wrapper_footer">
                       <ul className="categories">
                            <li className="category_item">
                                <Link to="#">Фильмы</Link>
                            </li>
                            <li className="category_item">
                                <Link to="#">Сериалы</Link>
                            </li>
                            <li className="category_item">
                                <Link to="#">Все категории</Link>
                            </li>
                            <li className="category_item">
                                <Link to="#" className="live">LIVE <b><span style={{color: 'red'}}>&#183;</span></b></Link>
                            </li>
                            <li className="category_item">
                                <Link to="#">Избранные</Link>
                            </li>
                        </ul>

                        <ul className="info_liks">
                            <li className="info_link__item">
                                <Link to="#">О нас</Link>
                            </li>
                            <li className="info_link__item">
                                <Link to="#">О компании</Link>
                            </li>
                            <li className="info_link__item">
                                <Link to="#">Размещение рекламы</Link>
                            </li>
                            <li className="info_link__item">
                                <Link to="#">Партнерам</Link>
                            </li>
                            <li className="info_link__item">
                                <Link to="#">Вакансии</Link>
                            </li>
                        </ul>

                        <ul className="support_links">
                            <p>Техподдержка:</p>

                            <li className="support_link__item">
                                <Link to="#">@Supportnaming.uz</Link>
                            </li>
                            <li className="support_link__item">
                                <Link to="#">+99890 000-23-00</Link>
                            </li>

                            <p className="leave_comment">Оставить отзыв:</p>

                            <li className="support_link__item">
                                <Link to="#">@infonaming.uz</Link>
                            </li>
                        </ul>
                       </div>
                    </div>
                </div>   
            </div>
            <div className="footer_footer">
                <div className="container">
                    <div className="social_links_and_author">
                        <p className="author">© ООО Naming cinema 2021 inc</p>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer