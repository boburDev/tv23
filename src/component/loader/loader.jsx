import loader from '../../assets/img/loader.png'
import st from './loader.module.css'

export default function Loader() {
    return (
        <>
            <div className={st.loadercover}>
                <div className={st.loaderbody}>
                    <img src={loader} alt="loader" />
                </div>
            </div>
        </>
    )
}