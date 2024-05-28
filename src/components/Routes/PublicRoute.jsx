import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UnAuthorized from '../../pages/ErrorPages/unAuthorized'
const PublicRoute = (props) => {
	const [admin, setAdmin] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		checkUserRole()
	}, [])

	const checkUserRole = () => {
		const isAdminFromLocalStorage = localStorage.getItem('is_admin') === 'true'
		const userToken = localStorage.getItem('user-token')
		setAdmin(isAdminFromLocalStorage)
		if (userToken) {
			setIsLoggedIn(true)
		} else {
			setIsLoggedIn(false)
			return navigate('/login')
		}
	}
	return <> {isLoggedIn && !admin ? props.children : <UnAuthorized />}</>
}

export default PublicRoute
