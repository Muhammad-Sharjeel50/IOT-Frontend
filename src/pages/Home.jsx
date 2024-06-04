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

	


	return (
		<div className="home border flex">
			{/* {isAdmin === true ? ( */}
			<div className=" flex flex-wrap bg-white rounded-xl h-full w-full">
				<div className=" w-2/12">
					<Sidbar isAdmin={isAdmin} />
				</div>
				<div className="w-10/12 h-full flex-col flex flex-wrap rounded-r-lg">
				
					<div className=" h-5/6 ">
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
