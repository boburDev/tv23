import st from './navbar.module.css'
import { useState } from 'react'
import { useTheme } from '../../../context/theme'
import { Link } from 'react-router-dom'
export default function Navbar({ data }) {
    const [active, setActive] = useState('')
    const [dark] = useTheme()

    return (
        <>
            <div className={st.category_navbar} style={{background: dark ? '#0C0C0D' : '#F8F9FC'}}>
                <div className={st.container}>
                <div className={st.items}>
                    {
                        data && data.map((val, key) => <Link
                        key={key}
                        to={`/categories/${val.category_name.toLowerCase()}`}
                        id={val.category_id}
                        onClick={e => setActive(e.target.id)}
                        style={{
                            background: dark ? 'rgba(17, 17, 18, 1)' : '#fff',
                            color: dark ? '#777' : '#777'
                        }}
                        className={`${st.nav_item} ${(val.category_id === active) ? st.active : ''}`}>
                            {val.category_name}
                        </Link>)
                    }
                </div>
            </div>
            </div>
        </>
    )
}
