import './app.css'
import { Route, Switch } from 'react-router-dom'
import Home from '../home/home'
import CategoryMovie from '../categoryMovie/categoryMovie'

function App() {
  return (
    <>
		<Switch>
			<Route path="/:lang?" component={Home} exact />
			<Route path="/:lang/categories" component={CategoryMovie} exact />
		</Switch>
    </>
  )
}

export default App
