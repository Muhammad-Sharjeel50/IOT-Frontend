import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Label } from 'recharts'
import female from '../../assets/icons/female.png'
import male from '../../assets/icons/male.png'
import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

const COLORS = ['#FFBB28', '#08a108', '#c71930']
const images = [
	<img src={male} height="100%" width="100%" alt="male" />,
	<img src={female} height="100%" width="100%" alt="female" />,
	<img src={male} height="100%" width="100%" alt="male" />,
	<img src={female} height="100%" width="100%" alt="female" />,
]
const AdminDashBoard = () => {
	const endPoint = process.env.REACT_APP_BASE_URL
	const [data, setData] = useState([])
	const [customers, setCustomers] = useState([])
	const [filteredData, setFilteredData] = useState([])
	const [voiceCallAccounts, setVoiceCallAccounts] = useState([])
	const [audioCallAccounts, setAudioCallAccounts] = useState([])
	const [videoCallAccounts, setVideoCallAccounts] = useState([])
	const [totalVoiceAndAudioCalls, setTotalVoiceAndAudioCalls] = useState([])
	const [webchat, setWebchat] = useState([]);
	const [totalsmsAndwebchat, setTotalsmsAndwebchat] = useState([]);
	const [smsAccounts, setSmsAccounts] = useState(null)
	const [activeAgents, setActiveAgents] = useState(null);
	const [activeQueries, setActiveQueries] = useState(null);
	const userData = JSON.parse(localStorage.getItem('user'))
	const [filteredCustomers, setFilteredCustomers] = useState([]);
	const totalCustomers = customers.length
	console.log("hhhhhhhhh", userData)
	const agentDepartment = userData?.role_or_permission
	const [resolvedAccounts, setResolvedAccounts] = useState(0);

	useEffect(() => {
		fetchCustomers()
		fetchData()

	}, [])

	const fetchData = async () => {

		try {
			const url = `http://${endPoint}:8000/core/user/`
			const response = await axios.get(url)
			
			setFilteredData(response.data.data)
		
			const totalAccounts = response.data.data.length;
			const activeAccounts = response.data.data.filter((account) => account.is_active).length;
			const inactiveAccounts = totalAccounts - activeAccounts;

		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	const fetchCustomers = async () => {
		let config = {
			method: 'get',
			url: `http://${endPoint}:8000/core/customer/`,
		};

		try {
			const response = await axios.request(config);

			if (response.status === 200) {
				setCustomers(response.data.data);
				const filteredCustomersCount = response.data.data.filter((customer) => customer.is_resolved).length;
				const videoCallAccounts = response.data.data.filter((account) => account.customer_query_service === 'videocall').length;
				const voiceCallCount = response.data.data.filter(
					(account) => account.customer_query_service === 'voicecall'
				).length;

				const audioCallCount = response.data.data.filter(
					(account) => account.customer_query_service === 'audiocall'
				).length;

				const totalVoiceAndAudioCalls = voiceCallCount + audioCallCount;
				const smsCount = response.data.data.filter((account) => account.customer_query_service === 'sms').length;
				const webcount = response.data.data.filter(
					(account) => account.customer_query_service === 'webchat'
				).length;
				const totalsmsAndwebchat = webcount + smsCount;
			console.log("totalsmsAndwebchat",totalsmsAndwebchat)
				setFilteredCustomers(filteredCustomersCount);
				setVideoCallAccounts(videoCallAccounts);
				setVoiceCallAccounts(voiceCallCount);
				setAudioCallAccounts(audioCallCount);
				setSmsAccounts(smsCount);
				setWebchat(webchat);
				setTotalsmsAndwebchat(totalsmsAndwebchat);
				setTotalVoiceAndAudioCalls(totalVoiceAndAudioCalls);
			
				const newData = [
					{ name: 'Active', value: response.data.data.length },
					{ name: 'Resolved', value: filteredCustomersCount },
				];
				setData(newData);
				;
			}
		} catch (error) {
			
		}
	};


	const activeAccounts = useMemo(() => {
		return filteredData.filter((account) => {
			return account.is_active
		})
	}, [filteredData])

	return (
		<>
			<div className="w-4/5 flex flex-col p-2">
				<div className="h-2/5 py-1 px-2">
					<div className="bg-white rounded-lg h-full px-3 py-2 ">
						<div className="flex h-3/5 flex-col">
							<div className="flex flex-wrap w-full h-1/3 py-1">
								<div className="  w-1/6  px-6">
									<div className=" w-full h-full bg-gray-800 rounded-lg"></div>
								</div>
								<h3 className="w-4/6 px-6 font-semibold ">Active Agents</h3>
								<p className="w-1/6 px-4 font-semibold">{activeAccounts.length}</p>							</div>
							<div className="flex flex-wrap w-full h-1/3 py-1">
								<div className="  w-1/6  px-6">
									<div className=" w-full h-full bg-blue-800 rounded-lg"></div>
								</div>
								<h3 className="w-4/6 px-6 font-semibold ">Active Queries</h3>
								<p className="w-1/6 px-4 font-semibold">{totalCustomers}</p>
							</div>
							<div className="flex flex-wrap w-full h-1/3 py-1">
								<div className="  w-1/6  px-6">
									<div className="w-full h-full bg-teal-500 rounded-lg"></div>
								</div>
								<h3 className="w-4/6 px-6 font-semibold"> Voice Queries</h3>
								<p className="w-1/6 px-4 font-semibold"> {totalVoiceAndAudioCalls}</p>
							</div>
							<div className="flex flex-wrap w-full h-1/3 py-1">
								<div className="  w-1/6  px-6">
									<div className=" w-full h-full bg-gray-800 rounded-lg"></div>
								</div>
								<h3 className="w-4/6 px-6 font-semibold">Messaging Queries</h3>
								<p className="w-1/6 px-4 font-semibold"> {totalsmsAndwebchat}</p>
							</div>
							<div className="flex flex-wrap w-full h-1/3 py-1">
								<div className="  w-1/6  px-6">
									<div className=" w-full h-full bg-blue-800 rounded-lg"></div>
								</div>
								<h3 className="w-4/6 px-6 font-semibold"> Video Queries</h3>
								<p className="w-1/6 px-4 font-semibold">{videoCallAccounts}</p>
							</div>
							<div className="flex flex-wrap w-full h-1/3 py-1">
								<div className="  w-1/6  px-6">
									<div className=" w-full h-full bg-blue-800 rounded-lg"></div>
								</div>
								<h3 className="w-4/6 px-6 font-semibold ">Resolved Queries</h3>
								<p className="w-1/6 px-4 font-semibold"> {filteredCustomers}</p>
							</div>

							<div className="  w-1/6  px-6">
								<div className=" w-full h-full bg-gray-800 rounded-lg"></div>
							</div>
						
						</div>
					</div>
				</div>
				<div className="h-3/5 flex flex-wrap ">
					<div className="w-1/2 p-4 flex flex-wrap">
						<div className="bg-white h-full rounded-lg w-full">
							<div className="h-1/6 bg-teal-600 w-full rounded-t-lg text-center text-white py-1 font-[550]">
								Performance
							</div>

							<ResponsiveContainer width="100%" height="75%">
								<PieChart>
									<Pie
										data={data}
										cx="50%" 
										cy="50%"
										innerRadius={0}
										outerRadius="80%"
										paddingAngle={0}
										dataKey="value" 
										labelLine={false}
									>
										{data.map((_, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
							</Pie>
									<Legend />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>
					<div className="w-1/2 p-4">
						<div className="bg-white h-full rounded-lg w-full font-[550] ">
							<div className="h-1/6 bg-teal-600 w-full rounded-t-lg text-center text-white py-1">
								Reviews
							</div>
							<div className="p-3 flex justify-between">
								<p>Team Performance </p>
								<p>90.6%</p>
							</div>
							<div className="p-3 flex justify-between">
								<p>Reviews </p>
								<p>89.6%</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-1/5 h-full  p-3 flex flex-wrap">
				<div className="rounded-lg bg-white flex flex-col h-full w-full flex-wrap justify-center">
					{images.map((img, index) => (
						<div className="w-full h-1/4 flex px-10 ">
							<div className=" w-full h-full p-4 flex"key={index}>
								{img}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default AdminDashBoard
