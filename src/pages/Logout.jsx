// import axios from 'axios'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const Logout = () => {
// 	const navigate = useNavigate()
// 	const userData = JSON.parse(localStorage.getItem('user'))
// 	console.log(userData, '=====////=====')
// 	const endPoint = process.env.REACT_APP_BASE_URL

// 	const handleLogout = async () => {
// 		let config = {
// 			method: 'post',
// 			url: `http://${endPoint}:8000/core/logout/`,
// 			data: {
// 				id: userData.id,
// 			},
// 		}
// 		console.log(config.data)

// 		await axios
// 			.request(config)
// 			.then((response) => {
// 				if (response.status === 200) {
// 					localStorage.clear()
// 					navigate('/login')
// 				} else {
// 				}
// 			})
// 			.catch((error) => {})
// 	}

// 	return (
// 		<div className="flex  w-full justify-center items-center h-screen">
// 			<div className="mx-auto flex-col flex-wrap">
// 				{' '}
// 				<h2 className="text-3xl text-blue-500 py-1font-semibold ">Logout</h2>
// 				<p>Are you sure you want to log out?</p>
// 				<button
// 					onClick={handleLogout}
// 					className="bg-blue-500 focus:scale-90 text-white text-xl"
// 				>
// 					Logout
// 				</button>
// 			</div>
// 		</div>
// 	)
// }
// export default Logout
