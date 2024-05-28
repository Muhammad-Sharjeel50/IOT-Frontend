import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UnAuthorized from '../../pages/ErrorPages/unAuthorized'
const AdminRoute = (props) => {
	const [admin, setAdmin] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)

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
		setLoading(false);
	}
	if (loading) {
		return <div className="loaderermission"></div>
	}
	return <> {isLoggedIn && admin ? props.children : <UnAuthorized />}</>
}
export default AdminRoute
