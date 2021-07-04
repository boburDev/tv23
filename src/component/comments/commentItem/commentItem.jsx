import st from './commentItem.module.css'
import { useTheme } from '../../../context/theme'
import avatar from '../../../assets/image/avatar.png'

export default function CommentItem({ comment, api }) {
    const [dark] = useTheme()
    return (
        <div  className={st.container}>
            {
            comment ? <>
            <div style={{color: dark ? '' : 'black'}} className={st.author}>
                <div className={st.avatar}>
                    <img src={avatar || `${api}/${comment.user_path}`} alt="avatar" />
                </div>
                
                <div className={st.username}>
                    {comment.user_username}
                </div>
            </div>
            <div className={st.divider}></div>
            <div style={{color: dark ? '' : '#777777'}} className={st.comment}>{comment.comment_body}</div></> : 'Nothing  commented'}
        </div> 
    )
}
