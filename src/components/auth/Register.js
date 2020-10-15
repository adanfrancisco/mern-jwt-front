import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

import UserContext from '../../context/UserContext'

// components
import ErrorNotice from '../misc/ErrorNotice'

export default function Register() {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [passwordCheck, setPasswordCheck] = useState()
	const [displayName, setDisplayName] = useState()
	const [error, setError] = useState()

	// reference to history
	const history = useHistory()

	// reference to Usercontext
	const { setUserData } = useContext(UserContext)

	// register and login user
	const submit = async (e) => {
		e.preventDefault()

		try {
			const newUser = { email, password, passwordCheck, displayName }

			// registered user to next step be login this user
			await Axios.post('http://localhost:5000/users/register', newUser)

			// login to user
			const loginRes = await Axios.post('http://localhost:5000/users/login', {
				email,
				password,
			})

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
						<h2 className='text-center text-warning'>Register</h2>
					</div>

					<div className='card-body'>
						<form onSubmit={submit}>
							<div className='form-group'>
								<label htmlFor='register-email'>Email</label>
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
								<input
									type='password'
									className='form-control mt-2'
									placeholder='Verify password'
									onChange={(e) => setPasswordCheck(e.target.value)}
								/>
							</div>

							<div className='form-group'>
								<label htmlFor='register-display-name'>Name</label>
								<input
									type='text'
									className='form-control'
									id='register-display-name'
									placeholder='Enter name'
									onChange={(e) => setDisplayName(e.target.value)}
								/>
							</div>

							<div className='form-group text-center'>
								<input
									type='submit'
									value='Register'
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
