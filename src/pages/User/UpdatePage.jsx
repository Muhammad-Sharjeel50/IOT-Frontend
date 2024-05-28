import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Header from '../../components/Header/Header'
import Sidbar from '../../components/sidbar/sidbar'
import UpdateUser from './Updateuser'

const UpdatePage = (props) => {
	const endPoint = process.env.REACT_APP_BASE_URL
	const params = useParams()
	const [user, setUser] = useState()
	let userr = JSON.parse(localStorage.getItem('user'))

	const fetchData = async () => {
		try {
			const url = `http://${endPoint}:8000/core/user/`
			const response = await axios.get(url)
			let users = response.data.data

			let filteredUser = users.filter((item) => item.id === parseInt(params.id))
			if (filteredUser.length > 0) {
				return filteredUser[0]
			} else {
				throw new Error('User not found')
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Error fetching data.',
				showCloseButton: true,
			})

			throw error
		}
	}

	useEffect(() => {
		fetchData()
			.then((user) => setUser(user))
			.catch((error) => {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: error,
					showCloseButton: true,
				})
			})
	}, [])

	return (
		<div className="home flex">
			{user && (
				<div className=" flex flex-wrap bg-white rounded-xl h-full w-full">
					<div className=" w-2/12">
						<Sidbar isAdmin={userr.is_admin} />
					</div>
					<div className="w-10/12 h-full flex-col flex flex-wrap rounded-r-lg">
						<div className="h-1/6">
							<Header />
						</div>
						<div className="flex h-5/6 flex-wrap">
							<div className="w-full h-full">
								<UpdateUser user={user} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default UpdatePage
