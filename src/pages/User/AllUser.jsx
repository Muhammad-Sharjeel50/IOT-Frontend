import axios from 'axios'
import React, { useMemo, useState, useEffect } from 'react'
import { BiSolidLock } from 'react-icons/bi'
import { BsTrash3Fill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { HiOutlineLockOpen } from 'react-icons/hi'
import { IoMdKey } from 'react-icons/io'
import ReactPaginate from 'react-paginate'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Widget from './widget'

const itemsPerPage = 10 // Number of items to display per page

export default function AllUser({ isAdmin, filteredData, setUsers }) {
	const endPoint = process.env.REACT_APP_BASE_URL
	const navigate = useNavigate()
	
	const [currentPage, setCurrentPage] = useState(0)
	const [role, setRole] = useState('')
	const [deletePermission, setDeletePermission] = useState(false);
	const [editPermission, setEditPermission] = useState(false);
	const [lockPermission, setlockPermission] = useState(false)
	const [resetPermission, setResetPermission] = useState(false)
	const [addPermission, setAddPermission] = useState(false)


	const [loading, setLoading] = useState(true)

	const user = JSON.parse(localStorage.getItem('user'))


	const handleDeleteConfirm = async (user) => {
		if (user.is_admin) {
			Swal.fire({
				icon: 'error',
				title: 'Access Denied',
				text: 'You cannot delete an Admin user',
			})
		} else {
			try {
				let requestData = JSON.stringify({
					email: user.email,
					is_admin: user.is_admin,
				})

				let config = {
					method: 'delete',
					url: `http://${endPoint}:8000/core/user/${user.id}`,
					headers: {
						'Content-Type': 'application/json',
					},
					data: requestData,
				}

				Swal.fire({
					title: 'Are you sure?',
					text: 'You want to delete this User!',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!',
				}).then((result) => {
					if (result.isConfirmed) {
						axios
							.request(config)
							.then((response) => {
								if (response.status === 200) {
									const updatedData = filteredData.filter(
										(u) => u.email !== user.email
									)
									setUsers(updatedData)

									Swal.fire({
										title: 'Success',
										text: 'User has been deleted',
										icon: 'success',
									})
								}
							})
							.catch((error) => {
								Swal.fire({
									title: 'Error',
									text: error.message,
									icon: 'error',
								})
							})
					}
				})
			} catch (error) {
				Swal.fire({
					title: 'Error deleting user',
					text: error.message,
					icon: 'error',
				})
			}
		}
	}



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
					const deletePermissionForRole = uRole[0]?.permission[0]?.pages?.find(
						(item) => {
							return item.name === 'Delete'
						});
					const resetPermissionForRole = uRole[0]?.permission[0]?.pages?.find(
						(item) => {
							return item.name === 'Reset'
						});
					const EditPermissionForRole = uRole[0]?.permission[0]?.pages?.find(
						(item) => {
							return item.name === 'Edit'
						});
					const lockPermissionForRole = uRole[0]?.permission[0]?.pages?.find(
						(item) => {
							return item.name === 'Lock/Unlock'
						});
					const AddPermissionForRole = uRole[0]?.permission[0]?.pages?.find(
						(item) => {
							return item.name === 'Add'
						});

					const lockPermission = lockPermissionForRole?.checked;

					setDeletePermission(deletePermissionForRole?.checked);
					console.log("deletepermission", deletePermissionForRole.checked)
					setEditPermission(EditPermissionForRole?.checked)
					setResetPermission(resetPermissionForRole?.checked)
					setlockPermission(lockPermissionForRole?.checked)
					console.log("iiiiiiiiiiiiiiiiiiiiiiiiii", lockPermission)
					setAddPermission(AddPermissionForRole?.checked)
					setLoading(false)
				}
			} catch (error) {
				console.error('Error fetching permissions:', error)
			}
		}

		fetchPermissions()
	}, [])

	const handlePasswordReset = async (user) => {
		let email = user.email
		try {
			const response = await axios.post(
				`http://${endPoint}:8000/core/password/reset/request/`,
				{
					email,
				}
			)

			if (response.status === 200) {
				Swal.fire({
					icon: 'success',
					title: response.data.message,
					text: `Password reset email sent to ${email}`,
					showCloseButton: true,
				})
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Request Failed',
				text: error.message,
				showCloseButton: true,
			})
		}
	}

	const handleUpdate = (user) => {
		navigate(`/update/${user.id}`, { state: { user } })
	}

	const handleLockToggle = (user) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'You want to change status of this User!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: user.is_active ? 'Yes, Lock it!' : 'Yes, Unlock it! ',
		}).then((result) => {
			if (result.isConfirmed) {
				if (user.is_admin) {
					Swal.fire({
						icon: 'error',
						title: 'Access Denied',
						text: 'You cannot lock an admin',
					})
					return
				} else {
					handleLockConfirm(user)
					Swal.fire({
						icon: 'success',
						title: user.is_active
							? 'User Status set to Inactive'
							: 'User Status set to Active',
						text: user.is_active
							? 'User Locked Successfully'
							: 'User Unlocked Successfully',
					})
				}
			}
		})
	}

	const handleLockConfirm = async (user) => {
		try {
			const updatedUser = {
				...user,
				is_active: !user.is_active,
			}

			const requestData = JSON.stringify(updatedUser)

			const config = {
				method: 'PUT',
				url: `http://${endPoint}:8000/core/user/${user.id}`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: requestData,
			}

			const response = await axios.request(config)

			if (response.status === 200) {
				const temp = filteredData.map((u) =>
					u.id === user.id ? updatedUser : u
				)
				setUsers(temp)
			}
		} catch (error) {
			Swal.fire({
				title: 'Error',
				text: error.message,
				icon: 'error',
			})
		}
	}

	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage.selected)
	}

	const pageCount = Math.ceil(filteredData.length / itemsPerPage)

	const activeAccounts = useMemo(() => {
		return filteredData.filter((account) => {
			return account.is_active
		})
	}, [filteredData])

	const inActiveAccounts = useMemo(() => {
		return filteredData.filter((account) => {
			return !account.is_active
		})
	}, [filteredData])

	return (
		// isAdmin 
		// allPermissionsFalse && (
		<div
			style={{ background: '#F4F4F5' }}
			className="h-full pt-2 flex flex-wrap"
		>
			<div className="flex justify-center px-10 w-full flex-wrap h-1/6 ">
				{/* ... Widgets ... */}
				<Widget label="Total Accounts" count={filteredData.length} />
				<Widget label="Active Accounts" count={activeAccounts.length} />
				<Widget label="Inactive Accounts" count={inActiveAccounts.length} />
			</div>
			<div className="w-full bg-white shadow-lg h-5/6 px-4 py-1 flex flex-col flex-wrap">
				<div className="justify-between w-full flex h-1/6 items-center flex-wrap">
					<h1 className="text-xl w-3/4 font-bold mx-auto">All Users</h1>

					<div className="w-1/4 px-3">
						{addPermission && (
							<Link to="/user">
								<button
									type="button"
									className="mx-auto m-0 w-full h-8 text-sm text-white bg-sky-600 px-2 font-medium py-1"
								>
									+ Add User
								</button>
							</Link>
						)}
					</div>
				</div>
				<div className="h-4/6  w-full overflow-scroll">
					<table className="text-center  text-white font-medium w-full border-collapse  h-full">
						<thead className="bg-[#3E97CF] py-2">
							<tr className=" border rounded-lg py-1 ">
								<th className="border px-4">Name</th>
								<th className="border px-4">Email</th>
								<th className="border px-4">Contact no</th>

								<th className="border px-4">Department</th>
								<th className="border px-4">Role</th>
								<th className="border px-4">Actions</th>
							</tr>
						</thead>
						<tbody className="text-gray-700 ">
							{filteredData
								?.slice(
									currentPage * itemsPerPage,
									(currentPage + 1) * itemsPerPage
								)
								.map((val, index) => (
									<tr className="border " key={index}>
										<td className="border pl-5 py-1">{val.name}</td>
										<td className="border pl-5 py-1">{val.email}</td>
										<td className="border pl-5 py-1">{val.phone_number}</td>

										<td className="border pl-5 py-1">{val.department}</td>
										<td className="border pl-5 py-1">
											{val.role_or_permission}
										</td>
										<td className=" justify-center h-full items-center py-2 flex flex-wrap">

											{resetPermission && (
												<IoMdKey
													className="mx-1 cursor-pointer hover:scale-110"
													onClick={() => handlePasswordReset(val)}
												/>
											)}
											{editPermission && (
												<FaEdit
													onClick={() => handleUpdate(val)}
													className="cursor-pointer mx-1 hover:scale-110 text-blue-500"
												/>
											)}
											{lockPermission && val.is_active ? (
												<HiOutlineLockOpen
													onClick={() => handleLockToggle(val)}
													className="cursor-pointer mx-1 hover:scale-110 text-green-700"
												/>
											) : (lockPermission && (
												<BiSolidLock
													onClick={() => handleLockToggle(val)}
													className="cursor-pointer mx-1 hover:scale-110 text-red-500"
												/>
											)
											)}
											{deletePermission && (
												<BsTrash3Fill
													onClick={() => handleDeleteConfirm(val)}
													className="cursor-pointer mx-1 hover:scale-110 text-red-500"
												/>
											)}
										</td>
									</tr>
								))}
							{/* {!resetPermission && !editPermission && !lockPermission && !deletePermission && (
//     <tr>
//       <td colSpan="6" className="text-center">
//         No permissions to show the table.
//       </td>
//     </tr>
//   )} */}
						</tbody>
					</table>
				</div>
				<ReactPaginate
					previousLabel={'<'}
					nextLabel={'>'}
					pageCount={pageCount}
					onPageChange={handlePageChange}
					containerClassName={'pagination-container'}
					previousLinkClassName={'previous-link'}
					nextLinkClassName={'next-link'}
					disabledClassName={'disabled'}
					activeClassName={'active'}
					className="flex flex-wrap mx-auto h-1/6 justify-center  py-1 items-center"
				/>
			</div>
		</div>
		//  )
	)
}
