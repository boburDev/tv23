import { useLang } from '../../../context/lanuage'
import st from './ActorItem.module.css'

export default function ActorItem({ actor, type, api }) {
    const [lang] = useLang()
    return (
        <div className={st.container}>
            <div className={st.item}>
                <div className={st.image}>
                    <img className={st.img} src={`${api}/${ type === 'actor' ? actor.actor_path : actor.director_path}`} alt="" />
                </div>
                <div className={st.name}>{lang.type !== 'uz-UZ' ? (type === 'actor' ?  actor.actor_name : actor.director_name) : (type==='actor' ?  actor.actor_name : actor.director_name)}</div>
                <div className={st.role}>{actor.role}</div>
            </div>
        </div>
    )
}
