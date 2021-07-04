import { useLang } from '../../../context/lanuage'
import st from './actorItem.module.css'

export default function ActorItem({ movieUsers, type }) {
    const [lang] = useLang()
    return (
        <div className={st.container}>
            <div className={st.item}>
                <div className={st.image}>
                    <img
                    className={st.img}
                    src={type === 'actor' ? movieUsers.actor_path : movieUsers.director_path}
                    alt="" />
                </div>
                <div className={st.name}>
                    {lang.type !== 'uz' ? (type === 'actor' ?  movieUsers.actor_name : movieUsers.director_name) :
                    (type==='actor' ?  movieUsers.actor_name : movieUsers.director_name)}
                </div>
                <div className={st.role}>{movieUsers.role}</div>
            </div>
        </div>
    )
}
