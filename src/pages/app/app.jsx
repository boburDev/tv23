import './app.css'
import { Route, Switch } from 'react-router-dom'
import Home from '../home/home'

function App() {
  return (
    <>
		<Switch>
			<Route path="/:lang?" component={Home} exact />
		</Switch>
    </>
  )
}

export default App
