import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"
import Navbar from "../../component/navbar/navbar"
import FavoriteMovies from "../../component/favourites/favourites"
import { useEffect, useState } from "react"
import axios from "axios"
import { useApi } from "../../context/api"
import Loader from '../../component/loader/loader'


export default function Favourites() {
    const [api] = useApi()
    const [loading,setLoading] = useState(false)
    const [favourMovies,setFavourMovies] = useState([])

    async function getFavourMovie(api) {
        setLoading(true)
        const res = await axios.get(api + '/favorite-movie', {
            headers: {
                Authorization: localStorage.getItem('Authorization')
            }
        })
        setLoading(false)
        setFavourMovies(res.data.data)
    }

    useEffect(()=>{
        if (api) {
            getFavourMovie(api)
        }
    },[api])


    return (
        <>
        {
            loading && <Loader />
        }
        <Navbar />
        <FavoriteMovies favourMovie={favourMovies} />
        <Ads />
        <Footer />
        </>
    )
}