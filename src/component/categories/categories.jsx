import { useState } from 'react'
import Category from './category/category'
import Header from './categoryHeader/header'
import Navbar from './categoryNavbar/navbar'

export default function Categories() {
    const [categories] = useState([])
    const [loading] = useState(true)

    return (
        <>
        <Header />
        <div className="container">
            <Navbar />
            {
                categories && categories.map((val, key) => <Category key={key}
                type='advanced'
                loading= {loading}
                movies = {val?.movies}
                title="Categories"
                link={`/categories/1`}
                />)
            }
        </div>
        </>
    )
}
