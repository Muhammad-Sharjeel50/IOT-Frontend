import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'react-chat-elements/dist/main.css'
import { BsCameraVideo, BsPersonFill, BsTelephone } from 'react-icons/bs'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Voicecall from '../../components/Audio/Voicecall'
import NewChat from '../../components/Chat/NewChat'
import SMShandler from '../../components/Chat/SMShandler'
import Sidbar from '../../components/sidbar/sidbar'
import AgentHeaderQueue from './AgentHeaderQueue'
Modal.setAppElement('#root')

const AgentView = () => {
	const [sent, setSent] = useState(false)
	const endPoint = process.env.REACT_APP_BASE_URL
	const userData = JSON.parse(localStorage.getItem('user'))
	let room = userData.email
	const [customers, setCustomers] = useState([])
	const [activeIndex, setActiveIndex] = useState('1')
	const [activeCustomer, setActiveCustomer] = useState()
	const [channel, setChannel] = useState(null)
	const [roomName, setRoomName] = useState(room)
	const [token, setToken] = useState('')
	const [customerToken, setCustomerToken] = useState('')
	const [link, setLink] = useState('')
	const [showButton, setShowButton] = useState(false)
	const agentDepartment = userData?.department

	const totalCustomers = customers.length
	const navigate = useNavigate()
	const [isVoiceCallModalOpen, setIsVoiceCallModalOpen] = useState(false)
	const fetchCustomers = async () => {
		let currentDate = new Date().toISOString().split('T')[0]; 
		let config = {
			method: 'get',
			url: `http://${endPoint}:8000/core/customer/?department=${agentDepartment.toLowerCase()}`,
		};
	
		await axios
			.request(config)
			.then((response) => {
				if (response.status === 200) {
					let todayCustomers = []; 
					let otherCustomers = [];
					response.data.data.forEach((customer) => {
						if (!customer.is_resolved) {
							if (customer.date === currentDate) {
								todayCustomers.push(customer);
							} else {
								otherCustomers.push(customer);
							}
						}
					});
	
					setCustomers([...todayCustomers, ...otherCustomers]);
				}
			})
			.catch((error) => {
				Swal.fire({
					icon: 'error',
					title: error,
					text: 'An error occurred.',
					showCloseButton: true,
				});
			});
	}; 

	const getToken = async (identity) => {
		const response = await axios.get(
			`http://${endPoint}:8000/core/twilio_video_access_token?user_identity=${identity}&room_name=${roomName}`
		)
		const { data } = response
		let token = data.token

		return token
	}

	const handleVideoCall = () => {
		const url = token && `/videocall?token=${token}&roomname=${roomName}`
		navigate(url, { state: { activeCustomer } })
	}

	const handleVoiceCall = () => {
		setIsVoiceCallModalOpen(true)
	}

	const closeVoiceCallModal = () => {
		setIsVoiceCallModalOpen(false)
	}

	useEffect(() => {
		fetchCustomers()
		setRoomName(userData.email)
		getToken(userData.email).then((token) => {
			setToken(token)
			console.log("token",token)

		})

		const intervalId = setInterval(() => {
			fetchCustomers()
		}, 10000)

		return () => {
			clearInterval(intervalId)
			channel && channel.removeAllListeners()
		}
	}, [activeCustomer])

	const handleResolve = async (customer) => {
		let config = {
			method: 'patch',
			url: `http://${endPoint}:8000/core/customer/?customer_id=${customer.id}`,
			headers: {
				'content-type': 'application/json',
			},
			data: {
				agent_id: userData.id,
				is_resolved: true,
			},
		}

		await axios
			.request(config)
			.then((response) => {
				if (response.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Resloved Queries Successfully',
						text: response.data.message,
						showCloseButton: true,
					}).then((result) => {
						if (result.isConfirmed) {
							fetchCustomers()
						}
					})
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Query Resolution Failed',
						text: 'Cannot  Reslove Queries',
						showCloseButton: true,
					})
					fetchCustomers()
					setActiveCustomer('')
				}
			})
			.catch(() => {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'An error occurred while resolving the customer.',
					showCloseButton: true,
				})
			})
	}

	const handleActiveCustomer = (customer, index) => {
		setActiveCustomer(customer)
		setActiveIndex(index)
	}

	const generateShareableLink = async () => {
		try {
			const shareableLink =
				customerToken &&
				`http:localhost:3000/videocall/?token=${customerToken}&room_name=${roomName}`

			console.log('Shareable Link:', shareableLink)
			setLink(shareableLink)
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: error,
				text: 'An error occurred during Shareable Link.',
				showCloseButton: true,
			})
		}
	}

	useEffect(() => {
		if (activeCustomer?.customer_query_service === 'Video Call') {
			let cEmail = activeCustomer.customer_email
			setShowButton(true)
			getToken(cEmail).then((token) => {
				setCustomerToken(token)
			})
		} else {
			setShowButton(false)
		}
	}, [activeCustomer])

	return (
		<div className="home border flex">
			<div className=" flex flex-wrap bg-white rounded-xl h-full w-full">
				<div className=" w-2/12">
					<Sidbar />
				</div>
				<div className="w-10/12 h-full flex-col flex flex-wrap rounded-r-lg">
					<div className="h-1/6">
						<AgentHeaderQueue queue={totalCustomers} />
					</div>
					<div className="flex h-5/6 flex-wrap">
						<div className="w-10/12 h-full flex">
							<div className="w-1/4 bg-gray-100 h-full">
								<div className="bg-gray-50 pb-2 h-full overflow-scroll">
									<h1 className="text-center text-md py-4 bg-sky-50 border-y text-sky-700 h-auto">
										Active Queries ({totalCustomers})
									</h1>

									<ul className="py-2 px-2  flex flex-col">
										{customers?.map((item, index) => (
											<li
												className={'p-1'}
												key={index}
												onClick={() => handleActiveCustomer(item, index)}
											>
												<div
													className={
														index === activeIndex
															? 'bg-sky-600 text-white py-1 flex rounded-xl items-center  flex-wrap p-1 shadow-lg cursor-pointer'
															: 'py-1 flex rounded-xl items-center bg-white scale-100 active:bg-sky-600 active:scale-90 focus:bg-sky-600 flex-wrap p-1 shadow-lg cursor-pointer'
													}
												>
													<div className="w-1/4 px-2 py-2 flex">
														<div className="rounded-full bg-sky-500 w-full h-full p-2">
															<BsPersonFill className="text-white w-full h-full " />
														</div>
													</div>
													<p className="w-2/4 text-md flex">
														{item.customer_name}
													</p>
													<div className=" flex flex-wrap h-full flex-col  px-3 w-1/4">
														<span className="h-1/2 text-gray-500 text-sm text-center pt-1">
															{item.time}
														</span>
														<div className="bg-red-500 h-1/2 text-center text-white rounded-full ">
															{item.messageCoount}
														</div>
													</div>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>

							<div className="w-3/4 p-4 bg-gray-100 flex">
								<div className="bg-white w-full h-full flex flex-col flex-wrap rounded-xl border">
									<div className="bg-sky-600 w-full h-1/6 pt-1 rounded-t-xl border-b border-gray-300">
										<div className="flex items-center justify-center text-white text-center h-1/2 text-xl font-semibold shadow-xl">
											{activeCustomer && activeCustomer.customer_name}
										</div>
										<div className="flex flex-wrap justify-center bg-sky-50 w-full h-1/2 ">
											{' '}
											<div className=" w-3/5 items-center flex justify-end px-2 text-center ">
												<div className="mx-auto w-full items-center flex text-center px-2 ">
													<div
														className="flex flex-wrap mx-auto  rounded-full px-2 py-1 w-full text-gray-100 bg-[#2E2E48] text-sm cursor-pointer active:scale-90 shadow-xl"
														onClick={handleVoiceCall}
													>
														<BsTelephone className="text-xl" />{' '}
														<p className="w-3/4">Call Phone</p>{' '}
													</div>
												</div>
												<div className="w-full mx-auto items-center flex   text-center px-2 ">
													<div
														className="flex flex-wrap mx-auto  rounded-full px-2 py-1 w-full text-gray-100 bg-[#2E2E48] text-sm cursor-pointer active:scale-90 shadow-xl"
														onClick={handleVideoCall}
													>
														<BsCameraVideo className="text-xl" />{' '}
														<p className="   w-3/4">Video Call</p>
													</div>
												</div>
											</div>
											<div className=" w-2/5 items-center flex justify-end px-2 text-center ">
												{showButton && (
													<div
														className="flex flex-wrap   px-2 py-1 w-full justify-end text-gray-100 mx-auto  text-center"
														onClick={() => generateShareableLink()}
													>
														<p className="px-3 py-1 bg-teal-800  rounded-md text-sm cursor-pointer active:scale-90 shadow-xl">
															Send Link
														</p>{' '}
													</div>
												)}
												<div
													className="flex flex-wrap px-2 w-full justify-end text-gray-100 mx-auto  text-center"
													onClick={() =>
														activeCustomer && handleResolve(activeCustomer)
													}
												>
													<p className="px-3 py-1 bg-teal-800  rounded-md text-sm cursor-pointer active:scale-90 shadow-xl">
														Resolve
													</p>{' '}
												</div>
											</div>
										</div>
									</div>
									<div className="h-5/6 w-full pt-3 pb-1 bg-blue-50">
										{activeCustomer &&
										activeCustomer.customer_query_service.toLowerCase() ===
											'sms' ? (
											<SMShandler
												customerId={activeCustomer.id}
												setSent={setSent}
												token={token}
												conversationId={activeCustomer?.conversation_id}
											/>
										) : (
											token &&
											activeCustomer && (
												<NewChat
													conversationId={activeCustomer?.conversation_id}
													link={link}
													token={token}
													setLink={setLink}
												/>
											)
										)}
									</div>

									<Modal
										isOpen={isVoiceCallModalOpen}
										onRequestClose={closeVoiceCallModal}
										contentLabel="Voice Call Modal"
										className="voice-call-modal"
										overlayClassName="voice-call-overlay"
									>
										<Voicecall
											token={token}
											onClose={() => setIsVoiceCallModalOpen(false)}
										/>
										<button onClick={closeVoiceCallModal}>
											Close Voice Call
										</button>
									</Modal>
								</div>
							</div>
						</div>
						<div className="w-2/12 flex flex-col flex-wrap h-full">
							<div className="h-auto  bg-gray-100 w-full  p-1">
								<div className="rounded-md px-2 py-1 border h-full shadow-xl bg-white">
									<h1 className="text-sm p-1 text-sky-700">Customer's Bio</h1>
									<div className="flex justify-left py-1 ">
										<div className="w-full pl-2">
											<p className="text-sm flex-col flex justify-left">
												{activeCustomer?.customer_name}
											</p>

											<p className="text-sm flex-col flex justify-left">
												{activeCustomer?.customer_phone_number}
											</p>

											<p className="text-sm flex justify-left">
												{activeCustomer?.customer_email}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="h-auto bg-gray-100 w-full  p-1">
								<div className="rounded-md px-4 py-2 border h-full shadow-xl bg-white">
									<h1 className="text-sm p-1 text-sky-700">Department</h1>
									<div className="py-1">
										<p className="text-sm text-white px-2 py-1 bg-sky-500 rounded-full shadow-md w-full text-center ">
											{' '}
											{activeCustomer?.customer_query_department}
										</p>
									</div>
									<h1 className="text-sm p-1 mt-1 text-sky-700">Preference</h1>
									<div className="py-1">
										<p className="text-sm px-2 py-1 bg-sky-500 text-white rounded-full shadow-md w-full text-center ">
											{activeCustomer?.customer_query_service}
										</p>
									</div>
								</div>
							</div>
							<div className="h-auto bg-gray-100 w-full  p-1">
								<div className="rounded-md p-4  border min-h-full h-32 shadow-xl bg-white flex flex-col">
									<h1 className="text-xs p-1 h-1/4">Customer History</h1>
									<div className="w-full text-slate-400 flex items-center justify-center h-3/4">
										Nothing to show
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AgentView
