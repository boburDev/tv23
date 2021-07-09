import LivePlayerContainer from '../livePlayerContainer/livePlayerContainer'
import Comments from '../../comments/comments'
import { useSharing } from '../../../context/shareLink'
import ShareLink from '../../shareMovie/shareMovie'
import { useApi } from '../../../context/api'
import Socket from '../socket/socket'

export default function SignleMovie() {
    const [api] = useApi()
    const [openModal] = useSharing()

    return(
        <>
            <LivePlayerContainer movie={[]} api={api} />
            <Socket />
            <Comments />
            {
                openModal && <ShareLink />
            }
        </>
    )
}