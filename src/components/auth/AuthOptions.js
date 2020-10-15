import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

// context
import UserContext from '../../context/UserContext'

export default function AuthOptions() {
	// geta data from UserContext
	const { userData, setUserData } = useContext(UserContext)

	const history = useHistory()

	const register = () => history.push('/register')
	const login = () => history.push('/login')

	const logout = () => {
		setUserData({
			token: undefined,
			user: undefined,
		})

		localStorage.setItem('auth-token', '')
	}

	return (
		<div className='btn-group'>
			{userData.user ? (
				<button onClick={logout} className='btn btn-danger px-4'>
					Log out
				</button>
			) : (
				<>
					<button onClick={register} className='btn btn-info px-3'>
						Register
					</button>
					<button onClick={login} className='btn btn-primary px-4'>
						Login
					</button>
				</>
			)}
		</div>
	)
}
