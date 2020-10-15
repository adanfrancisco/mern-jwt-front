import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

// context
import UserContext from '../../context/UserContext'

export default function Welcome() {
	const { userData } = useContext(UserContext)
	const history = useHistory()

	if (!userData.token || !userData.user) {
		history.push('/')
	}

	return <div>Welcome to this App</div>
}
