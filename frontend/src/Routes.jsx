import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const AuthedRoutes = ({exact, component, path}) => {
	if (localStorage.getItem("jwt")) {
		return (
			<Route path={path} exact={exact} component={component} />
		)
	} else {
		return (
			<Redirect to="/login" />
		)
	}
}

const Routes = (props) => (
	<Switch>
		<AuthedRoutes exact path="/" component={Home} />
		<Route exact path="/login" component={Login} />
		<Route exact path="/register" component={Register} />
	</Switch>
)

export default Routes