import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const columns = [
	{ id: 'id', label: 'ID', minWidth: 100 },
	{ id: 'title', label: 'Title', minWidth: 100 },
	{ id: 'description', label: 'Description', minWidth: 200 },
	{ id: 'actions', label: 'Actions', minWidth: 120 },
]

function StickyHeadTable() {
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [data, setData] = useState([])
	const token = localStorage.getItem('user-token')
	const [deleteItemId, setDeleteItemId] = useState(null)
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const [deletedItems, setDeletedItems] = useState([])
	const navigate = useNavigate()
	const [role, setRole] = useState('')
	const [deletePermission, setDeletePermission] = useState(false);
	const [editPermission, setEditPermission] = useState(false);
	const user = JSON.parse(localStorage.getItem('user'))
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:8000/core/roles', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})

				if (response.status === 200) {
					setData(response.data)
				}
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
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
					const deletePermissionForRole = uRole[0]?.permission[2]?.pages?.find(
						(item) => {
							return item.name === 'Delete'
						});
					
					const EditPermissionForRole = uRole[0]?.permission[2]?.pages?.find(
						(item) => {
							return item.name === 'Edit'
						});
					
					// const AddPermissionForRole = uRole[0]?.permission[0]?.pages?.find(
					// 	(item) => {
					// 		return item.name === 'Add'
					// 	});

					// const lockPermission = lockPermissionForRole?.checked;

					setDeletePermission(deletePermissionForRole?.checked);
					console.log("deletepermission", deletePermissionForRole.checked)
					setEditPermission(EditPermissionForRole?.checked)
					console.log("EditPermissionForRole",EditPermissionForRole?.checked)
					// setResetPermission(resetPermissionForRole?.checked)
					// setlockPermission(lockPermissionForRole?.checked)
					// console.log("iiiiiiiiiiiiiiiiiiiiiiiiii", lockPermission)
					// setAddPermission(AddPermissionForRole?.checked)
					// setLoading(false)
				}
			} catch (error) {
				console.error('Error fetching permissions:', error)
			}
		}

		fetchPermissions()
	}, [])


	const handleDelete = (id) => {
		const deletedItem = data.find((item) => item.id === id)
		setDeletedItems((prevDeletedItems) => [...prevDeletedItems, deletedItem])

		setDeleteItemId(id)
		setShowDeleteConfirmation(true)
	}

	const handleConfirmDelete = () => {
		axios
			.delete(`http://localhost:8000/core/roles/${deleteItemId}/`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				if (response.status === 204) {
					// Successfully deleted on the server
					// Remove the item from the deletedItems state
					const updatedData = data.filter((item) => item.id !== deleteItemId)
					setData(updatedData)
				} else {
					console.error('Error deleting item:', response.data)
				}
			})
			.catch((error) => {
				console.error('Error deleting item:', error)
			})

		// Close the confirmation dialog
		setDeleteItemId(null)
		setShowDeleteConfirmation(false)
	}
	const handlePermit = (data) => {
		navigate('/permitrole', { state: data }) //; You can use the ID to identify the row to permit
		console.log('Permit clicked for ID:', data)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	return (
		<div className="w-full flex flex-col px-4 pb-2">
			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align="center"
										style={{
											minWidth: column.minWidth,
											fontWeight: '600',
											backgroundColor: '#3E97CF',
											color: 'white',
										}}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => (
									<TableRow key={row.id}>
										{columns.map((column) => (
											<TableCell key={column.id} align="center">
												{column.id === 'actions' ? (
													
													<div className="w-full flex flex-wrap px-8">
													{editPermission &&(
														<button
															className="mx-auto flex bg-sky-600 py-1 px-6 h-full rounded-lg active:scale-90  text-center text-white text-lg w-auto cursor-pointer"
															onClick={() => handlePermit(row)}
														>
															Permit
														</button>
													)}
														{deletePermission && (
														<button
															className="mx-auto flex bg-red-700 py-1 px-6 h-full rounded-lg active:scale-90  text-center text-white text-lg w-auto cursor-pointer"
															onClick={() => handleDelete(row.id)}
														>
															Delete
														</button>
														)}
													</div>
												) : (
													row[column.id]
												)}
											</TableCell>
										))}
									</TableRow>
								))}
							<Dialog
								open={showDeleteConfirmation}
								onClose={() => setShowDeleteConfirmation(false)}
							>
								<DialogTitle>Confirm Deletion</DialogTitle>
								<DialogContent>
									<DialogContentText>
										Are you sure you want to delete this item?
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button
										onClick={() => setShowDeleteConfirmation(false)}
										color="primary"
									>
										Cancel
									</Button>
									<Button onClick={handleConfirmDelete} color="primary">
										Confirm
									</Button>
								</DialogActions>
							</Dialog>
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	)
}

export default StickyHeadTable
