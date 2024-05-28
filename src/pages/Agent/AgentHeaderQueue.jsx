import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Timer from './Timer'

const AgentHeaderQueue = ({ queue }) => {
	const userData = JSON.parse(localStorage.getItem('user'))
	const timeActive = localStorage.getItem('timer_Active Time')
	const timeBreak = localStorage.getItem('timer_Break Time')
	const timeMeeting = localStorage.getItem('timer_In a Meeting')

	const navigate = useNavigate()
	const location = useLocation()

	const endPoint = process.env.REACT_APP_BASE_URL
	const [timers, setTimers] = useState({
		'Active Time': 0,
		'Break Time': 0,
		'In a Meeting': 0,
	})

	const startTimer = (timerName) => {
		setTimers((prevTimers) => {
			const currentTime = Date.now()

			const updatedTimers = {
				...prevTimers,
				[timerName]: prevTimers[timerName] || currentTime,
				[`${timerName}StartTime`]:
					prevTimers[`${timerName}StartTime`] || currentTime, // Store the start time
			}

			return updatedTimers
		})
	}

	const stopTimer = (timerName) => {
		setTimers((prevTimers) => ({
			...prevTimers,
			[timerName]: 0,
		}))
	}

	const toggleTimer = (timerName) => {
		setTimers((prevTimers) => {
			const isTimerActive = prevTimers[timerName] !== 0

			const updatedTimers = Object.keys(prevTimers).reduce((acc, name) => {
				acc[name] = 0
				return acc
			}, {})

			if (!isTimerActive) {
				updatedTimers[timerName] = Date.now()

				if (timerName === 'Break Time') {
					updatedTimers['Active Time'] = 0 // Stop Active Time when Break Time starts
					updatedTimers['In a Meeting'] = 0 // Reset other timers if needed
				}
			}

			return updatedTimers
		})
	}

	useEffect(() => {
		const isQueriesPage = location.pathname === '/agent/home'
		const activeTimeNotRunning = !timers['Active Time']

		if (isQueriesPage && activeTimeNotRunning) {
			startTimer('Active Time')
		} else if (!isQueriesPage && timers['Active Time'] !== 0) {
			// Leaving the queries page, stop "Active Time" and start "Break Time"
			stopTimer('Active Time')
			startTimer('Break Time')
		} else if (!isQueriesPage) {
			// Back to queries page, retrieve break time from local storage
			const storedBreakTime = localStorage.getItem('timer_Break Time')
			if (storedBreakTime) {
				setTimers((prevTimers) => ({
					...prevTimers,
					'Break Time': parseInt(storedBreakTime),
				}))
			}
		}
	}, [])

	const handleLogout = async () => {
		try {
			const modesConfig = {
				method: 'post',
				url: `http://${endPoint}:8000/core/user/modes/`,
				data: {
					user: userData.id,
					active_time: timeActive,
					break_time: timeBreak,
					meeting_time: timeMeeting,
				},
			}

			await axios.request(modesConfig)

			const logoutConfig = {
				method: 'post',
				url: `http://${endPoint}:8000/core/logout/`,
				data: {
					id: userData.id,
				},
			}

			await axios.request(logoutConfig).then((response) => {
				if (response.status === 200) {
					Swal.fire({
						title: 'Logged Out!',
						text: 'You have been logged out successfully.',
						icon: 'success',
					})
					localStorage.clear()
					navigate('/login')
				} else {
					// Handle other response statuses if needed
				}
			})
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Error during logout',
				text: error.message || 'An error occurred.',
				showCloseButton: true,
			})
		}
	}

	return (
		<div className="h-full">
			<div className="bg-white h-full w-full px-2 flex flex-wrap justify-center items-center rounded-tr-xl shadow-xl border">
				<div className="flex flex-col items-center w-1/5  justify-center h-full">
					<div className="w-full flex  justify-between items-center border my-auto text-center text-md py-1 rounded-md border-gray-300">
						<p className="pl-3">Customers in Queue</p>
						<div className="bg-red-500 mr-2 items-center px-2 text-center text-white rounded-full ">
							{queue}
						</div>
					</div>
					<div className="w-full border my-auto text-lg py-1  text-center rounded-md border-gray-300 bg-sky-500 text-white tracking-wider font-semibold">
						My Status
					</div>
				</div>
			<div className="flex flex-wrap h-full py-1 items-center w-3/5 justify-center px-3">
					<div className="w-full flex flex-wrap justify-center items-center pl-10">	
						<Timer
							name="Active Time"
							isActive={timers['Active Time'] !== 0}
							toggleTimer={() => toggleTimer('Active Time')}
						/>
						<Timer
							name="Break Time"
							isActive={timers['Break Time'] !== 0}
							toggleTimer={() => toggleTimer('Break Time')}
						/>
						<Timer
							name="In a Meeting"
							isActive={timers['In a Meeting'] !== 0}
							toggleTimer={() => toggleTimer('In a Meeting')}
						/>
					</div>
				</div>
				<div className="flex items-center w-1/5 py-3 justify-end px-4">
					<div
						className="text-red-500 bg-white shadow-lg rounded-xl py-2 px-6 font-semibold tracking-wider scale-100 text-md active:scale-90 cursor-pointer border border-gray-200 "
						onClick={handleLogout}
					>
						Log Out
					</div>
				</div>
			</div>
		</div>
	)
}

export default AgentHeaderQueue
