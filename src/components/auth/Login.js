import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

import UserContext from '../../context/UserContext'
// components
import ErrorNotice from '../misc/ErrorNotice'

export default function Login() {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	const [error, setError] = useState()

	const { setUserData } = useContext(UserContext)
	const history = useHistory()

	const submit = async (e) => {
		e.preventDefault()

		try {
			const loginUser = { email, password }

			if (loginUser.email && loginUser.password) {
				// login to user
				const loginRes = await Axios.post(
					'http://localhost:5000/users/login',
					loginUser
				)

				// save data in context
				setUserData({
					token: loginRes.data.token,
					user: loginRes.data.user,
				})

				// save token in localStorage
				localStorage.setItem('auth-token', loginRes.data.token)

				// redirect to welcome
				history.push('/')
				/* history.push('/welcome') */
			} else {
				setError('Complete all fields.')
			}
		} catch (err) {
			err.response.data.msg && setError(err.response.data.msg)
		}
	}

	return (
		<div className='row'>
			{error && <ErrorNotice message={error} clearMessage={setError} />}
			<div className='col-md-6 mx-auto'>
				<div className='card'>
					<div className='card-header'>
						<h2 className='text-center text-warning'>Log in</h2>
					</div>

					<div className='card-body'>
						<form onSubmit={submit}>
							<div className='form-group'>
								<label htmlFor='login-email'>Email</label>
								<input
									type='email'
									className='form-control'
									id='register-email'
									placeholder='Enter email'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className='form-group'>
								<label htmlFor='register-password'>Password</label>
								<input
									type='password'
									className='form-control'
									id='register-password'
									placeholder='Enter password'
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<div className='form-group text-center'>
								<input
									type='submit'
									value='Enter'
									className='btn btn-success px-5'
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
