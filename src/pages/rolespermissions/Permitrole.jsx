import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Permitrole = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const token = localStorage.getItem('user-token')
	let data = location.state
	const [name, setName] = useState(data?.title || '')
	const [desc, setDesc] = useState(data?.description || '')
	const [permissionStates, setPermissionStates] = useState(
		data?.permission || []
	)

	const handleParentCheckboxChange = (parentIndex) => {
		const updatedPermissionStates = [...permissionStates]
		updatedPermissionStates[parentIndex].checked =
			!updatedPermissionStates[parentIndex].checked

		if (updatedPermissionStates[parentIndex].checked) {
			updatedPermissionStates[parentIndex].pages.forEach((page) => {
				page.checked = true
			})
		} else {
			updatedPermissionStates[parentIndex].pages.forEach((page) => {
				page.checked = false
			})
		}

		setPermissionStates(updatedPermissionStates)
	}

	const handleChildCheckboxChange = (parentIndex, childIndex) => {
		const updatedPermissionStates = [...permissionStates]
		updatedPermissionStates[parentIndex].pages[childIndex].checked =
			!updatedPermissionStates[parentIndex].pages[childIndex].checked

		const allChecked = updatedPermissionStates[parentIndex].pages.some(
			(page) => page.checked
		)
		updatedPermissionStates[parentIndex].checked = allChecked

		setPermissionStates(updatedPermissionStates)
	}

	const handleupdate = () => {
		if (!data.title || !data.description) {
			Swal.fire({
				icon: 'error',
				title: 'Fields Required',
				text: 'Please enter both Name and description!',
				showCloseButton: true,
			})
			return
		}

		axios
			.put(
				`http://localhost:8000/core/roles/${data.id}/`,
				{
					title: name,
					description: desc,
					permission: permissionStates,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((response) => {
				if (response.status === 200) {
					console.log("permissionStates..........",permissionStates)
					Swal.fire({
						icon: 'success',
						title: 'Role Successfully Updated',
						text: response.data.message,
						showCloseButton: true,
					}).then((result) => {
						if (result.isConfirmed) {
							navigate('/roles_permissions')
						}
					})
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Role Updation Failed',
						text: response.error,
						showCloseButton: true,
					})
				}
			})
			.catch((error) => {
				Swal.fire({
					icon: 'error',
					title: 'Role Updation Failed',
					text: error.message,
					showCloseButton: true,
				})
			})
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleupdate()
		}
	}

	return (
		<div className="w-full h-full items-center text-gray-400 flex flex-col flex-wrap divide-y ">
			<div className="divide-y flex-col flex  bg-gray-100 w-full h-1/4">
				<div className="text-xl py-1 text-center w-full">
					Modify Role and Assign Permissions
				</div>
				<div className="flex pt-2 flex-wrap bg-white w-full h-full items-center">
					<div className="w-4/5 flex px-8">
						<div class="relative z-0 w-2/5 mx-auto group flex px-4">
							<input
								type="text"
								name="floating_name"
								id="floating_name"
								defaultValue={name}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								onChange={(e) => setName(e.target.value)}
							/>
							<label
								for="floating_name"
								className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Role Name
							</label>
						</div>
						<div className="relative z-0 w-2/5 mx-auto group flex px-4">
							<input
								type="text"
								defaultValue={desc}
								name="floating_desc"
								id="floating_desc"
								onChange={(e) => setDesc(e.target.value)}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							/>
							<label
								for="floating_desc "
								class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Description:
							</label>
						</div>
						<div className="w-1/5">
							<button
								type="submit"
								className="text-white bg-sky-600 hover:bg-sky-700  text-center flex focus:outline-none font-medium rounded-lg text-md w-auto  px-4 py-2 h-full active:scale-90 "
								onClick={handleupdate}
							>
								Update ROLE
							</button>
						</div>
					</div>
					<div className="w-1/5 flex py-2 justify-end px-2 items-center">
						{' '}
						<button
							className="text-white bg-sky-600 hover:bg-sky-700  text-center flex focus:outline-none font-medium rounded-lg text-md w-auto px-4 py-1 h-full active:scale-90 "
							onClick={() => navigate('/roles_permissions')}
						>
							{' '}
							Back to Roles{' '}
						</button>
					</div>
				</div>
			</div>
			<div className="h-3/4 w-full flex-col flex-wrap  flex overflow-scroll">
				<div className="h-1/6 py-3 px-2 w-full bg-gray-50">Permissions</div>
				<div className="h-5/6 divide-y text-black">
					{permissionStates?.map((perm, parentIndex) => (
						<div className="flex flex-wrap flex-col" key={perm.id}>
							<div className="flex px-4">
								<input
									type="checkbox"
									checked={perm.checked}
									onChange={() => handleParentCheckboxChange(parentIndex)}
									onKeyDown={handleKeyDown}
								/>
								<div className="py-2 px-4 font-semibold">{perm.title}</div>
							</div>
							{perm.pages?.map((page, childIndex) => (
								<div className="px-16 flex items-center" key={page.name}>
									<input
										type="checkbox"
										checked={page.checked}
										onChange={() =>
											handleChildCheckboxChange(parentIndex, childIndex)
										}
										onKeyDown={handleKeyDown}
									/>
									<h1 className="px-2 font-medium text-gray-400 text-md">
										{page.name}
									</h1>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Permitrole
