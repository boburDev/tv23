import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"
import Navbar from "../../component/navbar/navbar"
import MovieItem from '../../component/movieItem/movieItem'
import CategoryMovie from '../../component/categories/categories'
function Home() {


  const movie = {
    category_id: '1234',
    movie_id: "123rgfd",
    movie_thumnail_path: "../../assets/image/ads_banner.svg",
    movie_name: "Reklama",
    movie_genre: "rek, ed, gsd, gfdvd, fvfd"
  }


  return (
    <>
      <Navbar />
      <CategoryMovie />
      <MovieItem movie={movie} />
      <Ads />
      <Footer />
    </>
  )
}

export default Home
