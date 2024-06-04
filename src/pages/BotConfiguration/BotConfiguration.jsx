import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Header from '../../components/Header/Header'
import Sidbar from '../../components/sidbar/sidbar'

const BotConfiguration = () => {
	const endPoint = process.env.REACT_APP_BASE_URL
	const userData = JSON.parse(localStorage.getItem('user'))
	// const isAdmin = userData.is_admin
	const [data, setData] = useState([])
	const [fetchdata, setFetchdata] = useState([]);

	// State to manage dropdown visibility
	// const [botConfig, setBotConfig] = useState({
	// 	botTitle: '',
	// 	botTheme: '',
	// 	botMessageBackground: '',
	// 	userMessageBackground: '',
	// 	padding: '',
	// 	fontSize: '',
	// 	fontWeight: '',
	// 	fontThickness: '',
	// 	firstResponse: {
	// 		greetingMessage: '',
	// 	},
	// 	secondResponse: {
	// 		message: '',
	// 		options: [],
	// 	},
	// 	thirdResponse: {
	// 		message: '',
	// 		options: [],
	// 	},
	// 	fourthResponse: {
	// 		message: '',
	// 	},
	// })

	// const sendDataToAPI = async (botConfig) => {
	// 	try {
	// 		const url = `http://${endPoint}:8000/core/setting/`
	// 		const response = await axios.post(url, { setting: botConfig })

	// 		if (response.status === 201) {
	// 			const fetchedData = response.data;
	// 			setData(fetchedData);
	// 			console.log("fetchedDatasdfghjkl", fetchedData)
	// 			Swal.fire({
	// 				icon: 'success',
	// 				text: 'Your Data have been saved',
	// 				showConfirmButton: false,
	// 				timer: 2000,
	// 			})
	// 		} else {
	// 			Swal.fire({
	// 				icon: 'error',
	// 				text: 'failed to save Data',
	// 				showCloseButton: true,
	// 			})
	// 		}
	// 	} catch (error) {
	// 		Swal.fire({
	// 			icon: 'error',
	// 			text: 'An error occurred while saving Data',
	// 			showCloseButton: true,
	// 		})
	// 	}
	// }
	// const fetchDataFromAPI = async () => {
	// 	try {
	// 		const url = `http://${endPoint}:8000/core/setting/`;  
	// 		const response = await axios.get(url);

	// 		if (response.status === 200) {
	// 			const fetchedData = response.data;
	// 			setFetchdata(fetchedData);  // Update component state with fetched data\\
	// 			console.log("fetchedData", fetchedData)
	// 			setBotConfig(fetchedData.setting || {});
	// 			// console.log("fetchedData.setting",botConfig)
	// 		} else {
	// 			console.error('Failed to fetch data');
	// 		}
	// 	} catch (error) {
	// 		console.error('An error occurred while fetching data:', error);
	// 	}
	// }

	// useEffect(() => {
	// 	fetchDataFromAPI();  // Fetch data when the component mounts
	// }, []);
	// const handleSubmit = async () => {

	// 	await sendDataToAPI(botConfig)
	// 	console.log("botconfigggggg", botConfig)
	// }

	// const handleChange = (event) => {
	// 	const { name, value } = event.target
	// 	const nameParts = name.split('.')

	// 	if (nameParts.length > 1) {
	// 		setBotConfig((prevConfig) => {
	// 			const updatedConfig = { ...prevConfig }
	// 			let currentLevel = updatedConfig

	// 			for (let i = 0; i < nameParts.length - 1; i++) {
	// 				const part = nameParts[i]
	// 				currentLevel[part] = { ...currentLevel[part] }
	// 				currentLevel = currentLevel[part]
	// 			}

	// 			currentLevel[nameParts[nameParts.length - 1]] = value

	// 			return updatedConfig
	// 		})
	// 	} else {
	// 		setBotConfig((prevConfig) => ({
	// 			...prevConfig,
	// 			[name]: value,
	// 		}))
	// 	}
	// }
	
	// const handleDepartmentCheckboxChange = (event) => {
	// 	const selectedDepartment = event.target.value.toLowerCase();

	// 	setBotConfig((prevConfig) => {
	// 		const currentDepartments = prevConfig.secondResponse.options || [];

	// 		const updatedDepartments = currentDepartments.includes(selectedDepartment)
	// 			? currentDepartments.filter((dep) => dep !== selectedDepartment)
	// 			: [...currentDepartments, selectedDepartment];

	// 		const updatedConfig = {
	// 			...prevConfig,
	// 			secondResponse: {
	// 				...prevConfig.secondResponse,
	// 				options: updatedDepartments, // Update the options array
	// 			},
	// 		};

	// 		return updatedConfig;
	// 	});
	// };

	// const handleOptionCheckboxChange = (event) => {
	// 	const selectedOption = event.target.value.toLowerCase();

	// 	setBotConfig((prevConfig) => {
	// 		const currentOptions = prevConfig.thirdResponse.options || [];

	// 		const updatedOptions = currentOptions.includes(selectedOption)
	// 			? currentOptions.filter((opt) => opt !== selectedOption)
	// 			: [...currentOptions, selectedOption];
 
	// 		const updatedConfig = {
	// 			...prevConfig,
	// 			thirdResponse: {
	// 				...prevConfig.thirdResponse,
	// 				options: updatedOptions,
	// 			},
	// 		};

	// 		return updatedConfig;
	// 	});
	// };
	return (
		<div className="home border flex">
			
		</div>
	)
}

export default BotConfiguration
