import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Header from '../components/Header/Header'
import Sidbar from '../components/sidbar/sidbar'
import AllUser from './User/AllUser'
export default function Home() {
	const endPoint = process.env.REACT_APP_BASE_URL
	const [isAdmin, setIsAdmin] = useState(false)
	const [data, setData] = useState([])
	const [filteredData, setFilteredData] = useState([])

	const fetchData = async () => {
		setIsAdmin(JSON.parse(localStorage.getItem('is_admin')))
		try {
			const url = `http://${endPoint}:8000/core/user/`
			const response = await axios.get(url)
			setData(response.data.data)
			setFilteredData(response.data.data)
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Error fetching data',
				text: error,
				showCloseButton: true,
			})
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className="home border flex">
			{/* {isAdmin === true ? ( */}
			<div className=" flex flex-wrap bg-white rounded-xl h-full w-full">
				<div className=" w-2/12">
					<Sidbar isAdmin={isAdmin} />
				</div>
				<div className="w-10/12 h-full flex-col flex flex-wrap rounded-r-lg">
					<div className="h-1/6">
						<Header
							withSearch="true"
							allUsers={data}
							setFiltered={setFilteredData}
						/>
					</div>
					<div className="flex h-5/6 flex-wrap">
						<AllUser
							isAdmin={isAdmin}
							filteredData={filteredData}
							setUsers={setFilteredData}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
