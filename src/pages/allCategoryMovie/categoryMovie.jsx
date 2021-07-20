import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"
import Navbar from "../../component/navbar/navbar"
import { useEffect, useState } from "react"
import CategoryMovie from '../../component/categories/categories'
import TrillerCarousel from '../../component/triller/trillerCarousel/triller'
import axios from "axios"
import { useApi } from "../../context/api"

function MovieCategory() {
	const [api] = useApi()
	const [categories, setCategories] = useState([])
	const [genres, setGenres] = useState([])
	const [recommendedTriller, setRecommendedTriller] = useState([])
	const [loading, setLoading] = useState(false)
	async function getMovies (api){
		try {
			setLoading(true)
			const categories = await axios.get(api + '/category-with-movies')
			setLoading(false)
			setCategories(categories.data.data)
		} catch (error) {
		}
	}



	// vse kategorini kurib chiq yaxshilab

	async function getGenres(api) {
		try {
			setLoading(true)
			const genres = await axios.get(api + '/genres')
			setGenres(genres.data.data)
			setLoading(false)
		} catch (error) {
			
		}
	}



	async function recommendedTrillers(api) {
		try {
			setLoading(true)
			const trillers = await axios.get(api + '/recommended-t')
			setRecommendedTriller(trillers.data.data)
			setLoading(false)
		} catch (error) {
			
		}
	}
	
	useEffect(()=>{
		getMovies(api)
		getGenres(api)
		recommendedTrillers(api)
	},[api])
	
	return (
		<>
		<Navbar />
		<TrillerCarousel
		api={api}
		movies={recommendedTriller} />
		<CategoryMovie
		data={categories}
		genres={genres}
		type="genres"
		loading={loading}
		what="category"
		allCategory={"all"} />
		<Ads />
		<Footer />
		</>
		)
	}
	

	export default MovieCategory
	