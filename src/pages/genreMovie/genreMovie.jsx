import st1 from './genreMovie.module.css'
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useApi } from "../../context/api"
import MovieItem from "../../component/movie/movieItem/movieItem"
import Navbar from "../../component/navbar/navbar"
import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"

export default function GenreMovie() {
    const [data,setData] = useState([])
    const genreid = useParams()
    const [api] = useApi()

    async function getGenre(api, genreid) {
       try {
        const data = {
            year: [],
            genreId: [genreid && genreid.genreid],
            countryId: []
        }
        const res = await axios.post(api + '/filter-movie', data, {
            headers: {
                Language: localStorage.getItem('lang')
            }
        })
        setData(res.data.data)
       } catch (error) {
           
       }
    }

    useEffect(()=>{
        if (api && genreid && genreid.genreid) {
            getGenre(api, genreid)
        }
    },[api, genreid])

    return (
        <>
        <Navbar />
            <div className={st1.container}>
                <div className={st1.result}>
                    {
                        data.map((x, key) => <MovieItem key={key} movie={x} />)
                    }
                </div>
            </div>
            <Ads />
        <Footer />
        </>
    )
}