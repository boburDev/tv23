import './app.css'
import { Route, Switch } from 'react-router-dom'
import Home from '../home/home'
import AllCategoryMovie from '../allCategoryMovie/categoryMovie'
import CategoryMovie from '../categoryMovie/categoryMovie'
import GenreMovie from '../genreMovie/genreMovie'
import Movie from '../movie/movie'
import { useTheme } from '../../context/theme'
function App() {
	const [dark] = useTheme()
	return (
		<div style={{background: dark ? '#0C0C0D' : '#F8F9FC'}}>
			<Switch>
				<Route path="/:lang?" component={Home} exact />
				<Route path="/:lang?/categories" component={AllCategoryMovie} exact />
				<Route path="/:lang?/categories/:category" component={CategoryMovie} exact />
				<Route path="/:lang?/categories/:category/:movieid" component={Movie} exact />
				<Route path="/:lang?/genres/:genre" component={GenreMovie} exact />
			</Switch>
		</div>
	)
}

export default App
