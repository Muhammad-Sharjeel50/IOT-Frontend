import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { IoIosSearch } from 'react-icons/io'
import {
	RiArrowDownSLine,
	RiMessage2Line,
	RiNotification2Line,
} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2' // Import SweetAlert
import './header.css'

export default function Header(props) {
	const userData = JSON.parse(localStorage.getItem('user'))
	const [profilePicture, setProfilePicture] = useState('')
	const [allUsers, setAllUsers] = useState(props.allusers)
	const [currentUser, setCurrentUser] = useState('')
	const [showDropdown, setShowDropdown] = useState(false)
	const navigate = useNavigate()
	const [searchQuery, setSearchQuery] = useState('')
	const endPoint = process.env.REACT_APP_BASE_URL

	useEffect(() => {
		setCurrentUser(JSON.parse(localStorage.getItem('user')))
		setAllUsers(props.allUsers)
		setProfilePicture('asdfgh')
	}, [props.allUsers])

	const onSearchChange = (e) => {
  setSearchQuery(e.target.value)
  if (e.target.value) {
    const filtered = allUsers.filter((user) => {
      return user.name && user.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    props.setFiltered(filtered)
  } else {
    props.setFiltered(allUsers)
  }
}

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown)
	}

	const handleLogout = async () => {
		Swal.fire({
			title: 'Logout Confirmation',
			text: 'Do you want to logout!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Logout it!',
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					let config = {
						method: 'post',
						url: `http://${endPoint}:8000/core/logout/`,
						data: {
							id: userData.id,
						},
					}

					await axios
						.request(config)
						.then((response) => {
							// console.log(JSON.stringify(response.data.message))
							if (response.status === 200) {
								Swal.fire({
									title: 'Logged Out!',
									text: 'You have been logged out successfully.',
									icon: 'success',
								})
								localStorage.clear()
								navigate('/login')
							} else {
							}
						})
						.catch((error) => {
							Swal.fire({
								icon: 'error',
								title: 'An error occurred',
								text: error,
								showCloseButton: true,
							})
						})
				} catch (error) {
					Swal.fire({
						icon: 'error',
						title: 'Error during logout',
						text: error,
						showCloseButton: true,
					})
				}
			}
		})
	}

	return (
		<div className="bg-white h-full w-full px-2 flex flex-wrap justify-around rounded-tr-xl shadow-xl border">
			{props.withSearch === 'true' ? (
				<div className="flex items-center w-1/2 px-10 justify-center">
					<div className=" flex items-center w-full border-gray-300 border shadow-md border-1 rounded-md bg-gray-100 h-2/5 ">
						<IoIosSearch className="text-sky-600 h-full text-center w-1/6 bg-gray-200 px-3 " />
						<input
							type="text"
							className="border-none h-full text-gray-800 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 bg-gray-50 pl-4 m-0 placeholder:text-gray-500 w-full"
							placeholder="Search"
							value={searchQuery}
							onChange={onSearchChange}
						/>
					</div>
				</div>
			) : (
				<div className="flex items-center w-1/2 py-2 px-10 justify-center"></div>
			)}
			<div className="flex items-center w-1/2 py-3 justify-center px-3">
				<div className="flex flex-wrap w-1/2 justify-end px-4">
					<div className="px-2">
						<RiNotification2Line className="text-gray-500 h-6 w-6  " />
					</div>
					<div className="px-2">
						<RiMessage2Line className="text-gray-500 h-6 w-6" />
					</div>
				</div>
				<div className=" w-1/2 pl-10">
					<div className=" flex justify-end">
						<div
							className="flex flex-wrap items-center justify-center cursor-pointer border rounded-md w-full bg-gray-50 shadow-md"
							onClick={toggleDropdown}
						>
							<div className="w-1/6 py-2 pl-2 text-center">
								{currentUser?.profilePicture ? (
									<img
										className=" rounded-full"
										src={profilePicture}
										alt="profile"
									/>
								) : (
									<CgProfile className="text-3xl" />
								)}
							</div>
							<span className="w-4/6 pl-1 text-md font-semibold text-gray-700 tracking-wide text-center ">
								{currentUser?.name}
							</span>
							<div className=" w-1/6 py-3 ">
								<RiArrowDownSLine
									onClick={toggleDropdown}
									className="text-gray-500 text-xl cursor-pointer"
								/>
							</div>
						</div>
					</div>
					{showDropdown && (
						<div className="absolute bg-white border rounded-lg py-2 px-4 text-md w-48 divide-y">
							<div
								className=" py-1 cursor-pointer hover:text-blue-600 w-full font-semibold text-gray-600"
								onClick={() => handleLogout()}
							>
								Logout
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
