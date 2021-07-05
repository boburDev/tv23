import st from './shareMovie.module.css'
import { useTheme } from '../../context/theme'
import { useSharing } from '../../context/shareLink'

import {
    FacebookMessengerShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TwitterShareButton,
    VKShareButton,
    WhatsappShareButton,
    EmailShareButton,
    MailruShareButton,
    TelegramShareButton
  } from "react-share";

  import {
      FacebookIcon,
      FacebookMessengerIcon,
      LinkedinIcon,
      PinterestIcon,
      RedditIcon,
      TwitterIcon,
      VKIcon,
      WhatsappIcon,
      EmailIcon,
      MailruIcon,
      TelegramIcon,
  } from "react-share";

export default function ShareLink() {
    const [dark] = useTheme()
    const [setSharing] = useSharing(true)

    function copyLink() {
        var copyText = document.getElementById("movie_link_read");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
      
      }

    return (
        <>
            <div className={st.modal}>
                <div className={st.modal_container} style={{ background: dark ? '#0C0C0D' : '#F8F9FC' }}>
                    <div className={st.modal_body}>
                        <div className={st.modal_header}>
                            <p style={{color: dark ? '#fff' : '#000'}}>Share</p>
                            <button className={st.close_button} onClick={()=>setSharing(false)}>
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
                                focusable="false" className="style-scope yt-icon"
                                style={{ pointerEvents: 'none', display: 'block', 
                                color: dark ? '#F8F9FC' : '#0C0C0D'
                                }}>
                                    <g class="style-scope yt-icon">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" className="style-scope yt-icon">
                                        </path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <div className={`${st.sharing_container}`} style={{color: dark ? '#fff' : '#000'}}>
                            <div className={st.share_item}>
                                <FacebookShareButton url="https://23tv.uz" quote="" title="Facebook">
                                    <FacebookIcon logoFillColor="white" size={50} round={true}>

                                    </FacebookIcon>
                                </FacebookShareButton>
                                <p>Facebook</p>
                            </div>
                            <div className={st.share_item}>
                                <WhatsappShareButton url="https://23tv.uz" quote="" title="WhatApp">
                                    <WhatsappIcon logoFillColor="white" size={50} round={true}>

                                    </WhatsappIcon>
                                </WhatsappShareButton>
                                <p>WhatsApp</p>
                            </div>
                            <div className={st.share_item}>
                                <TwitterShareButton url="https://23tv.uz" quote="" title="WhatApp">
                                    <TwitterIcon logoFillColor="white" size={50} round={true}>

                                    </TwitterIcon>
                                </TwitterShareButton>
                                <p>Twitter</p>
                            </div>
                            <div className={st.share_item}>
                                <TelegramShareButton url="https://23tv.uz" quote="" title="WhatApp">
                                    <TelegramIcon logoFillColor="white" size={50} round={true}>

                                    </TelegramIcon>
                                </TelegramShareButton>
                                <p>Telegram</p>
                            </div>
                            <div className={st.share_item}>
                                <EmailShareButton url="https://23tv.uz" quote="" title="WhatApp">
                                    <EmailIcon logoFillColor="white" size={50} round={true}>

                                    </EmailIcon>
                                </EmailShareButton>
                                <p>Email</p>
                            </div>
                            <div className={st.share_item}>
                                <MailruShareButton url="https://23tv.uz" quote="" title="WhatApp">
                                    <MailruIcon logoFillColor="white" size={50} round={true}>

                                    </MailruIcon>
                                </MailruShareButton>
                                <p>MailRu</p>
                            </div>
                            <div className={st.share_item}>
                                <RedditShareButton url="https://23tv.uz" quote="" title="WhatApp">
                                    <RedditIcon logoFillColor="white" size={50} round={true}>

                                    </RedditIcon>
                                </RedditShareButton>
                                <p>reddit</p>
                            </div>
                            <div className={st.share_item}>
                                <VKShareButton url="https://23tv.uz" quote="" title="WhatApp">
                                    <VKIcon logoFillColor="white" size={50} round={true}>

                                    </VKIcon>
                                </VKShareButton>
                                <p>ВКонтакте</p>
                            </div>
                            <div className={st.share_item}>
                                <FacebookMessengerShareButton url="https://23tv.uz" quote="" title="WhatApp">
                                    <FacebookMessengerIcon logoFillColor="white" size={50} round={true}>

                                    </FacebookMessengerIcon>
                                </FacebookMessengerShareButton>
                                <p>Messager</p>
                            </div>
                            <div className={st.share_item}>
                                <PinterestShareButton url="https://23tv.uz" quote="" title="WhatApp">
                                    <PinterestIcon logoFillColor="white" size={50} round={true}>

                                    </PinterestIcon>
                                </PinterestShareButton>
                                <p>Pinterest</p>
                            </div>
                            <div className={st.share_item}>
                                <LinkedinShareButton url="https://23tv.uz" quote="" title="WhatApp">
                                    <LinkedinIcon logoFillColor="white" size={50} round={true}>

                                    </LinkedinIcon>
                                </LinkedinShareButton>
                                <p>LinkedIn</p>
                            </div>
                        </div>
                        <div className={st.link_copy}>
                            <input
                            id="movie_link_read"
                            value="chsdbcks"
                            type="text"
                            style={{ background: dark ? '#0C0C0D' : '#F8F9FC', color: dark ? '#fff' : '#000' }}
                            className={st.share_link_input} readOnly />
                            <button
                            onClick={copyLink}
                            style={{color: dark ? '#fff' : '#000'}}
                            className={st.copy_button}>COPY</button>
                        </div>

                        <div className={st.start_at}>
                                <input type="checkbox" id="startAt" />
                                <label className={st.input_start_at} htmlFor="startAt" style={{color: dark ? '#fff' : '#000'}}>
                                    Start at
                                    <input type="text" maxLength="5" placeholder="0:00" style={{
                                        background: dark ? '#0C0C0D' : '#F8F9FC',
                                        color: dark ? '#fff' : '#000'
                                        }}/>
                                </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}