import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/Header/Header'
import Sidbar from '../../components/sidbar/sidbar'
import AddRole from './AddRole'
import RoleTable from './RoleTable'

const RolesPermissions = () => {
	 const user = JSON.parse(localStorage.getItem('user'));
	 const [addPermission, setAddPermission] = useState(false)
	 const [role, setRole] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)
	const [active, setActive] = useState('table')
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('user'))
		setIsAdmin(data.is_admin)
	}, [])
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
					console.log("rolllllllll",uRole[0].title)
					setRole(uRole[0].title)
					
					const AddPermissionForRole = uRole[0]?.permission[2]?.pages?.find(
						(item) => {
							return item.name === 'Add'
						});
						 setAddPermission(AddPermissionForRole?.checked)
						 console.log("uhjhsdhuhsdhsd",AddPermissionForRole?.checked)
					//  setLoading(false)
				}
			} catch (error) {
				console.error('Error fetching permissions:', error)
			}
		}

		fetchPermissions()
	}, [user])
	return (
		<div>
			<div className="home border flex">
				<div className=" flex flex-wrap bg-white rounded-xl h-full w-full">
					<div className=" w-2/12">
						<Sidbar isAdmin={isAdmin} />
					</div>
					<div className="w-10/12 h-full flex-col flex flex-wrap rounded-r-lg">
						<div className="h-1/6">
							<Header withSearch="false"/>
						</div>
						<div className="flex h-5/6 flex-wrap">
							{active === 'table' ? (
								<div className="w-full  h-full flex justify-center items-center text-5xl font-bold text-gray-400 flex flex-col flex-wrap ">
									<div className="h-1/6 flex flex-wrap w-full justify-end items-center text-white">
										<div className="w-1/5 flex px-4">
											{addPermission&&(
											<button
												className="mx-auto m-0 h-8 text-lg text-white bg-sky-600 px-1 font-medium h-full py-2 active:scale-90"
												onClick={() => setActive('new')}
											>
												Add New Role
											</button>
											)}
										</div>
									</div>
									<div className="h-5/6 flex w-full ">
										{' '}
										<RoleTable />
									</div>
								</div>
							) : (
								<AddRole setActive={setActive} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RolesPermissions
