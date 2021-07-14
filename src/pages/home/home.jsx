import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"
import Navbar from "../../component/navbar/navbar"
import Triller from "../../component/triller/triller/triller"
import CategoryMovie from "../../component/categories/categories"
import { useEffect, useState } from "react"
import axios from "axios"
import { useApi } from "../../context/api"
import { useFilter } from '../../context/filter'
import FilterComponent from '../../component/filter/filter'
function Home() {
  const [api] = useApi()
  const [open] = useFilter()
  const [categories, setCategories] = useState([])
  const [recommendedTriller, setRecommendedTriller] = useState([])
  const [loading, setLoading] = useState(false)
  async function getMovies(api) {
    try {
      setLoading(true)
      const categories = await axios.get(api + "/category-with-movies")
      setLoading(false)
      setCategories(categories.data.data)
    } catch (error) {}
  }

  async function recommendedTrillers(api) {
    try {
      setLoading(true)
      const trillers = await axios.get(api + "/recommended-t")
      // console.log(trillers)
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
      console.log(open)
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
