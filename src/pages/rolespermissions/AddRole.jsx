import axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2'

const AddRole = ({ setActive }) => {
	const permissions = [
		{
			title: 'All_Users',
			pages: ['Add','Lock/Unlock', 'Edit', 'Delete', 'Reset','view Only'],
		},
		{
			title: 'Profile_Update',
		},
		{
			title: 'Roles_Permissions',
			pages: ['Add', 'Edit', 'Delete'],
		},
		{
			title: 'Queries',
		},
		{
			title: 'Configure_Bot',
		},
		{
			title:'Agenthistory',
		},
		{
			title:'ActiveAgent',
		},
	]
	const endPoint = process.env.REACT_APP_BASE_URL
	const [name, setName] = useState()
	const [desc, setDesc] = useState()
	const [permissionStates, setPermissionStates] = useState(
		permissions.map((perm, parentIndex) => ({
			id: parentIndex, // Assign a unique ID to each parent for the 'key' prop
			title: perm.title,
			checked:false,
			pages: (perm.pages || []).map((page, childIndex) => ({
				name: page,
				checked: false,
				id: childIndex, // Assign a unique ID to each child for the 'key' prop
			})),
		}))
	)
	const [permission, setPermission] = useState([])

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
		setPermission(updatedPermissionStates)
	}

	const handleChildCheckboxChange = (parentIndex, childIndex) => {
		const updatedPermissionStates = [...permissionStates]
		updatedPermissionStates[parentIndex].pages[childIndex].checked =
			!updatedPermissionStates[parentIndex].pages[childIndex].checked

		// Check if all child checkboxes are checked and update the parent checkbox
		const allChecked = updatedPermissionStates[parentIndex].pages.some(
			(page) => page.checked
		)
		updatedPermissionStates[parentIndex].checked = allChecked
		// setPermissionStates(updatedPermissionStates)
		setPermission(updatedPermissionStates)
	}
	const handleName = (e) => {
		setName(e.target.value)
	}
	const handleDesc = (e) => {
		setDesc(e.target.value)
	}
	const handlePermissions = () => {
		const newPermission = permissionStates.map((perm, parentIndex) => {
			if (perm.pages.length === 0) {
				return {
					pageTitle: perm.title,
					actions: perm.checked ? 1 : 0, // Set actions to 1 if self-checked
				}
			} else {
				const permissions = perm.pages.map((page) => ({
					name: page.name,
					permission: page.checked ? 1 : 0,
				}))

				return {
					pageTitle: perm.title,
					actions: 1,
					actionsAllowed: permissions.reduce((acc, cur) => {
						acc[cur.name] = cur.permission
						return acc
					}, {}),
				}
			}
		})

		setPermission(newPermission)
	}
	const handleSubmit = async () => {
		if (!name || !desc) {
			Swal.fire({
				icon: 'error',
				title: 'Fields Required',
				text: 'Please enter both Name and description!',
				showCloseButton: true,
			})
			return
		}

		try {
			handlePermissions()
			const response = await axios.post(`http://${endPoint}:8000/core/roles`, {
				title: name.toLowerCase(),
				description: desc,
				permission: permissionStates,
			})

			if (response.status === 201) {
				Swal.fire({
					icon: 'success',
					title: 'Role Added Successfully!',
					showConfirmButton: false,
					timer: 2000,
				}).then(() => {
					setActive('table')
				})
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Role creation failed',
					text: response.error.message,
					showCloseButton: true,
				})
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Bad Request',
				text: error.message,
				showCloseButton: true,
			})
		}
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleSubmit()
		}
	}

	return (
		<div className="w-full h-full items-center text-gray-400 flex flex-col flex-wrap divide-y ">
			<div className="divide-y flex-col flex  bg-gray-100 w-full h-1/4">
				<div className="text-xl py-1 text-center w-full">
					Add New Role and Assign Permissions
				</div>
				<div className="flex pt-2 flex-wrap bg-white w-full h-full items-center">
					<div className="w-4/5 flex px-8">
						<div class="relative z-0 w-2/5 mx-auto group flex px-4">
							<input
								type="text"
								name="floating_name"
								id="floating_name"
								value={name}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								onChange={handleName}
							/>
							<label
								for="floating_name"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Role Name
							</label>
						</div>
						<div className="relative z-0 w-2/5 mx-auto group flex px-4">
							<input
								type="text"
								value={desc}
								name="floating_desc"
								id="floating_desc"
								onChange={handleDesc}
								onKeyDown={handleKeyDown}
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							/>
							<label
								for="floating_desc "
								class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Description
							</label>
						</div>
						<div className="w-1/5">
							<button
								type="submit"
								className="text-white bg-sky-600 hover:bg-sky-700  text-center flex focus:outline-none font-medium rounded-lg text-md w-auto  px-4 py-2 h-full active:scale-90 "
								onClick={handleSubmit}
							>
								ADD ROLE
							</button>
						</div>
					</div>
					<div className="w-1/5 flex py-2 justify-end px-2 items-center">
						{' '}
						<button
							className="text-white bg-sky-600 hover:bg-sky-700  text-center flex focus:outline-none font-medium rounded-lg text-md w-auto px-4 py-1 h-full active:scale-90 "
							onClick={() => setActive('table')}
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
					{permissionStates.map((perm, parentIndex) => (
						<div className="flex flex-wrap flex-col" key={perm.id}>
							<div className="flex px-4">
								<input
									type="checkbox"
									checked={perm.checked}
									onChange={() => handleParentCheckboxChange(parentIndex)}
									onKeyDown={handleKeyDown}
									// defaultChecked={perm.title==='Profile_Update'?true:false}
								/>
								<div className="py-2 px-4 font-semibold">{perm.title}</div>
							</div>
							{perm.pages.map((page, childIndex) => (
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
export default AddRole
