import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from 'axios'

// context
import UserContext from './context/UserContext'

// components
import Header from './components/layout/Header'
import Home from './components/pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Welcome from './components/pages/Welcome'

export default function App() {
	const [userData, setUserData] = useState({
		token: undefined,
		user: undefined,
	})

	useEffect(() => {
		// check if exist token (there are a loggin)
		const checkLoggedIn = async () => {
			// check token in localstorage
			let token = localStorage.getItem('auth-token')
			if (token === null) {
				localStorage.setItem('auth-token', '')
				token = ''
			}

			const tokenRes = await Axios.post(
				'http://localhost:5000/users/tokenIsValid',
				null,
				{
					headers: { 'x-auth-token': token },
				}
			)

			if (tokenRes.data) {
				const userRes = await Axios.get('http://localhost:5000/users/', {
					headers: { 'x-auth-token': token },
				})

				setUserData({
					token,
					user: userRes.data,
				})
			}
		}

		checkLoggedIn()
	}, [])

	return (
		<>
			<BrowserRouter>
				<UserContext.Provider value={{ userData, setUserData }}>
					<Header />

					<div className='container mt-5'>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/register' component={Register} />
							<Route exact path='/welcome' component={Welcome} />
						</Switch>
					</div>
				</UserContext.Provider>
			</BrowserRouter>
		</>
	)
}
