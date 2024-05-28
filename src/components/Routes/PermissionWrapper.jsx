import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UnAuthorized from '../../pages/ErrorPages/unAuthorized'
const PermissionWrapper = (props) => {
	const [permissions, setPermissions] = useState([])
	const [loading, setLoading] = useState(true)
	const [role, setRole] = useState('')
	const user = JSON.parse(localStorage.getItem('user'))

	useEffect(() => {
		const fetchPermissions = async () => {
			try {
				const token = localStorage.getItem('user-token')
				const response = await axios.get('http://localhost:8000/core/roles', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				if (response.status === 200) {
					const data = response.data
					let uRole = data?.filter((role) => {
						return role.title.toString() === user.role_or_permission.toString()
					})
					setRole(uRole[0].title)
					setPermissions(data)
					setLoading(false)
				}
			} catch (error) {
				console.error('Error fetching permissions:', error)
			}
		}
		fetchPermissions()
	}, [])

	if (loading) {
		return <div className="loaderermission"></div>
	}

	const hasRequiredPermissions = permissions.some((rolee) => {
		return (
			rolee.title === role &&
			rolee.permission.some((permission) => permission.checked)
		)
	})

	return hasRequiredPermissions ? props.children : <UnAuthorized />
}

export default PermissionWrapper
