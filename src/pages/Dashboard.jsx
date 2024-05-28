import React, { useEffect, useState } from 'react'
import AdminDashBoard from '../components/Dashboard/AdminDashBoard'
import AgentDashBoard from '../components/Dashboard/AgentDashBoard'
// import Header from '../components/Header/Header'
import Sidbar from '../components/sidbar/sidbar'

const Dashboard = () => {
	const userData = JSON.parse(localStorage.getItem('user'))
	const [isAdmin, setIsAdmin] = useState(false)

	useEffect(() => {
		setIsAdmin(userData)
	}, [])

	return (
		<div>
			<div className="home border flex">
				<div className=" flex flex-wrap bg-white rounded-xl h-full w-full">
					<div className=" w-2/12">
						<Sidbar isAdmin={isAdmin} />
					</div>
					<div className="w-10/12 h-full flex-col flex flex-wrap rounded-r-lg">
						{/* <div className="h-1/6"> */}
							{/* <Header withSearch="false" /> */}
						{/* </div> */}
						<div className="flex h-full w-full bg-gray-100">
							{   <AgentDashBoard />}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
