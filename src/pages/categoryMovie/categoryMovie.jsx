import Footer from "../../component/footer/footer";
import Ads from "../../component/ads/ads";
import Navbar from "../../component/navbar/navbar";
import TrillerCarousel from "../../component/triller/trillerCarousel/triller";
import MovieCategory from "../../component/categories/categories";
import { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "../../context/api";
import { usePagination } from "../../context/pagination";
import { useParams } from "react-router-dom";
import Loader from '../../component/loader/loader'
export default function CategoryMovie() {
  const [api] = useApi();
  const [pagination] = usePagination();
  const category = useParams();
  const [movies, setMovies] = useState({});
  const [categories, setCategories] = useState();
  const [recommendedTriller, setRecommendedTriller] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getMovies(api, value, pagination) {
    try {
      setLoading(true);
      const val =
        value.category.toLowerCase().charAt(0).toUpperCase() +
        value.category.toLowerCase().slice(1);

      const movies = await axios.get(api + "/movie-category", {
        params: {
          categoryName: val,
		  page: pagination
        },
      });
      setMovies(movies.data.data);
    //   console.log(movies.data.data);
      setLoading(false);
    } catch (error) {}
  }

  async function getCategories(api) {
    try {
      setLoading(true)
      const categories = await axios.get(api + "/categories", {
		  headers: {
			Authorization: localStorage.getItem('Authorization')
		  }
	  })
      const data = categories.data.data;
      setCategories(data);
      setLoading(false);
    } catch (error) {}
  }

  async function recommendedTrillers(api) {
    try {
      setLoading(true);
      const trillers = await axios.get(api + "/recommended-t");
      setRecommendedTriller(trillers.data.data);
      setLoading(false);
    } catch (error) {}
  }
  useEffect(() => {
    getMovies(api, category, pagination);
    recommendedTrillers(api);
    getCategories(api);
  }, [api, category, pagination]);

  return (
    <>
      {
			loading && <Loader />
	  }
      <Navbar />
      <TrillerCarousel api={api} movies={recommendedTriller} />
      <MovieCategory
        data={movies}
        categories={categories}
        loading={loading}
        what="signle-movie-category"
      />
      <Ads />
      <Footer />
    </>
  );
}
