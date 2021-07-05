import st from './commentItem.module.css'
import { useTheme } from '../../../context/theme'
import avatar from '../../../assets/image/avatar.png'

export default function CommentItem({ comment, api }) {
    const [dark] = useTheme()
    return (
        <div  className={st.container} style={{color: dark ? '' : '#666'}}>
            {
            comment ? <>
            <div style={{color: dark ? '' : '#000'}} className={st.author}>
                <div className={st.avatar}>
                    <img src={avatar || `${api}/${comment.user_path}`} alt="avatar" />
                </div>
                
                <div className={st.username}>
                    {comment.user_username}
                </div>
            </div>
            <div className={st.divider}></div>
            <div className={st.comment}>{comment.comment_body}</div>
            </> : <div className="">Nothing  commented</div>
            }
        </div> 
    )
}
