import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"
import Navbar from "../../component/navbar/navbar"
import { useEffect, useState } from "react"
import CategoryMovie from '../../component/categories/categories'
import axios from "axios"
import { useApi } from "../../context/api"

function MovieCategory() {
	const [api] = useApi()
	const [categories, setCategories] = useState([])
	// const [recommendedTriller, setRecommendedTriller] = useState([])
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



	// async function recommendedTrillers(api) {
	// 	try {
	// 		setLoading(true)
	// 		const trillers = await axios.get(api + '/recommended-t')
	// 		setRecommendedTriller(trillers.data.data)
	// 		setLoading(false)
	// 	} catch (error) {
			
	// 	}
	// }
	
	useEffect(()=>{
		getMovies(api)
	},[api])
	
	return (
		<>
		<Navbar />
		<CategoryMovie
		data={categories}
		loading={loading}
		allCategory={"all"}
		what="category" />
		<Ads />
		<Footer />
		</>
		)
	}
	

	export default MovieCategory
	