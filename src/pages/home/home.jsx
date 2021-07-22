import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"
import Navbar from "../../component/navbar/navbar"
import Triller from "../../component/triller/triller/triller"
import CategoryMovie from "../../component/categories/categories"
import { useEffect, useState } from "react"
import axios from "axios"
import { useApi } from "../../context/api"
import FilterComponent from '../../component/filter/filter'
import Loader from '../../component/loader/loader'

function Home() {
  const [api] = useApi()
  const [categories, setCategories] = useState([])
  const [recommendedTriller, setRecommendedTriller] = useState([])
  const [loading, setLoading] = useState(false)

  async function getMovies(api) {
    try {
      setLoading(true)
      const categories = await axios.get(api + "/category-with-movies", {
        headers: {
          Authorization: localStorage.getItem('Authorization')
        }
      })
      setLoading(false)
      setCategories(categories.data.data)
      console.log(categories.data.data)
    } catch (error) {}
  }

  async function recommendedTrillers(api) {
    try {
      setLoading(true)
      const trillers = await axios.get(api + "/recommended-t")
      setRecommendedTriller(trillers.data.data)
      setLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
    getMovies(api)
    recommendedTrillers(api)
  }, [api])

  return (
    <>
      {
        loading && <Loader />
      }
      <FilterComponent />
      <Navbar />
      <Triller data={recommendedTriller} api={api} />
      <CategoryMovie data={categories} loading={loading} what="category" />
      <Ads />
      <Footer />
    </>
  )
}

export default Home
