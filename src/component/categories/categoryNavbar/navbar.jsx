import './navbar.css'
import { useEffect, useState } from 'react'
import { useTheme } from '../../../context/theme'
import { useApi } from '../../../context/api'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Navbar() {
    const [api] = useApi()
    const [categories, setCategories] = useState([])
    const [active, setActive] = useState('')
    const [dark] = useTheme()
    const itemStyle = {
        background:dark ? ' ' : '#ffffff'
    }

    useEffect(()=>{
        ;(async()=>{
            const res = await axios.get(api + '/categories')
            setCategories(res.data.data)
            console.log(res.data.data)
        })()
    },[api])

    return (
        <div className="container">
            <div  className="items">
                {
                    categories && categories.map((val, key) => <Link
                    to={`/categories/${val.category_name}`}
                    id={val.category_id}
                    onClick={e => setActive(e.target.id)}
                    key={key}
                    style={itemStyle}
                    className={`nav_item ${(val.category_id === active) ? 'active' : ''}`}>
                        {val.category_name}
                    </Link>)
                }
            </div>
        </div>
    )
}
