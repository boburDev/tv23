import st from './notFound.module.css'
import NotFoundSearchImg from '../../../assets/logo/notFound.svg'
export default function SearchNotFound({loading}) {
    return (
        <div className={st.container}>
            <div className={st.box}>
                {
                    loading ? <div className="loader"></div> :
                    <>
                        <img src={NotFoundSearchImg} alt="" />
                        <div className={st.text}>К сожалению мы ничего не нашли</div>
                    </>
                }
            </div>
        </div>
    )
}
