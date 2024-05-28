import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Header from '../../components/Header/Header'
import Sidbar from '../../components/sidbar/sidbar'

const BotConfiguration = () => {
	const endPoint = process.env.REACT_APP_BASE_URL
	const userData = JSON.parse(localStorage.getItem('user'))
	const isAdmin = userData.is_admin
	const [data, setData] = useState([])
	const [fetchdata, setFetchdata] = useState([]);

	// State to manage dropdown visibility
	const [botConfig, setBotConfig] = useState({
		botTitle: '',
		botTheme: '',
		botMessageBackground: '',
		userMessageBackground: '',
		padding: '',
		fontSize: '',
		fontWeight: '',
		fontThickness: '',
		firstResponse: {
			greetingMessage: '',
		},
		secondResponse: {
			message: '',
			options: [],
		},
		thirdResponse: {
			message: '',
			options: [],
		},
		fourthResponse: {
			message: '',
		},
	})

	const sendDataToAPI = async (botConfig) => {
		try {
			const url = `http://${endPoint}:8000/core/setting/`
			const response = await axios.post(url, { setting: botConfig })

			if (response.status === 201) {
				const fetchedData = response.data;
				setData(fetchedData);
				console.log("fetchedDatasdfghjkl", fetchedData)
				Swal.fire({
					icon: 'success',
					text: 'Your Data have been saved',
					showConfirmButton: false,
					timer: 2000,
				})
			} else {
				Swal.fire({
					icon: 'error',
					text: 'failed to save Data',
					showCloseButton: true,
				})
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				text: 'An error occurred while saving Data',
				showCloseButton: true,
			})
		}
	}
	const fetchDataFromAPI = async () => {
		try {
			const url = `http://${endPoint}:8000/core/setting/`;  
			const response = await axios.get(url);

			if (response.status === 200) {
				const fetchedData = response.data;
				setFetchdata(fetchedData);  // Update component state with fetched data\\
				console.log("fetchedData", fetchedData)
				setBotConfig(fetchedData.setting || {});
				// console.log("fetchedData.setting",botConfig)
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error('An error occurred while fetching data:', error);
		}
	}

	useEffect(() => {
		fetchDataFromAPI();  // Fetch data when the component mounts
	}, []);
	const handleSubmit = async () => {

		await sendDataToAPI(botConfig)
		console.log("botconfigggggg", botConfig)
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		const nameParts = name.split('.')

		if (nameParts.length > 1) {
			setBotConfig((prevConfig) => {
				const updatedConfig = { ...prevConfig }
				let currentLevel = updatedConfig

				for (let i = 0; i < nameParts.length - 1; i++) {
					const part = nameParts[i]
					currentLevel[part] = { ...currentLevel[part] }
					currentLevel = currentLevel[part]
				}

				currentLevel[nameParts[nameParts.length - 1]] = value

				return updatedConfig
			})
		} else {
			setBotConfig((prevConfig) => ({
				...prevConfig,
				[name]: value,
			}))
		}
	}
	
	const handleDepartmentCheckboxChange = (event) => {
		const selectedDepartment = event.target.value.toLowerCase();

		setBotConfig((prevConfig) => {
			const currentDepartments = prevConfig.secondResponse.options || [];

			const updatedDepartments = currentDepartments.includes(selectedDepartment)
				? currentDepartments.filter((dep) => dep !== selectedDepartment)
				: [...currentDepartments, selectedDepartment];

			const updatedConfig = {
				...prevConfig,
				secondResponse: {
					...prevConfig.secondResponse,
					options: updatedDepartments, // Update the options array
				},
			};

			return updatedConfig;
		});
	};

	const handleOptionCheckboxChange = (event) => {
		const selectedOption = event.target.value.toLowerCase();

		setBotConfig((prevConfig) => {
			const currentOptions = prevConfig.thirdResponse.options || [];

			const updatedOptions = currentOptions.includes(selectedOption)
				? currentOptions.filter((opt) => opt !== selectedOption)
				: [...currentOptions, selectedOption];
 
			const updatedConfig = {
				...prevConfig,
				thirdResponse: {
					...prevConfig.thirdResponse,
					options: updatedOptions,
				},
			};

			return updatedConfig;
		});
	};
	return (
		<div className="home border flex">
			{fetchdata && (
				<div className="flex flex-wrap bg-white rounded-xl h-full w-full">
					<div className="w-2/12">
						<Sidbar isAdmin={isAdmin} />
					</div>
					<div className="w-10/12 h-full flex-col flex flex-wrap rounded-r-lg">
						<div className="h-1/6">
							<Header withSearch={false} allUsers={data} />
						</div>
						<div className="flex h-5/6 flex-wrap">
							<div className="w-full h-full flex flex-wrap overflow-scroll">
								<div className="text-3xl text-center py-2 w-full font-semibold">
									Configure Your Bot Appearance
								</div>
								<div className="w-full pb-2 px-8 flex flex-col flex-wrap">
									<div className="pt-2  text-gray-400 w-full border-b border-gray-300 text-lg">
										Bot Header
									</div>
									<div className="flex  flex-wrap w-full  py-4">
										<div className="w-1/2 pr-2">
											<label
												htmlFor="botTitle"
												className="block  text-sm font-medium text-gray-900"
											>
												Bot Title
											</label>
											<input
												type="text"
												id="botTitle"
												name="botTitle"
												value={botConfig.botTitle}
												onChange={handleChange}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											/>
										</div>
										<div className="w-1/2 pl-2">
											<label
												htmlFor="botTheme"
												className="block text-sm font-medium text-gray-900"
											>
												BOT Theme
											</label>
											<input
												type="text"
												id="botTheme"
												name="botTheme"
												value={botConfig.botTheme}
												onChange={handleChange}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											/>
										</div>
									</div>
									<div className="pt-2  w-full text-gray-400 border-b border-gray-300 text-lg">
										Message Body
									</div>
									<div className="flex  flex-wrap w-full py-2">
										<div className="w-1/2 py-2 pr-2 ">
											<label
												htmlFor="botMessageBackground"
												className="block text-sm font-medium text-gray-900"
											>
												Bot's message Background
											</label>
											<input
												type="text"
												id="botMessageBackground"
												name="botMessageBackground"
												value={botConfig.botMessageBackground}
												onChange={handleChange}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											/>
										</div>
										<div className="w-1/2 py-2 pr-2">
											<label
												htmlFor="userMessageBackground"
												className="block text-sm font-medium text-gray-900"
											>
												User's message Background
											</label>
											<input
												type="text"
												id="userMessageBackground"
												name="userMessageBackground"
												value={botConfig.userMessageBackground}
												onChange={handleChange}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											/>
										</div>
										<div className="w-1/2 py-2 pr-2">
											<label
												htmlFor="padding"
												className="block text-sm font-medium text-gray-900"
											>
												Padding
											</label>
											<input
												type="text"
												id="padding"
												name="padding"
												value={botConfig.padding}
												onChange={handleChange}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											/>
										</div>
										<div className="w-1/2 py-2 pr-2">
											<label
												htmlFor="fontSize"
												className="block text-sm font-medium text-gray-900"
											>
												Font Size
											</label>
											<input
												type="text"
												id="fontSize"
												name="fontSize"
												value={botConfig.fontSize}
												onChange={handleChange}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											/>
										</div>
										<div className="w-1/2 py-2 pr-2">
											<label
												htmlFor="fontWeight"
												className="block text-sm font-medium text-gray-900"
											>
												Font Weight
											</label>
											<input
												type="text"
												id="fontWeight"
												name="fontWeight"
												value={botConfig.fontWeight}
												onChange={handleChange}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											/>
										</div>
										<div className="w-1/2 py-2 pr-2">
											<label
												htmlFor="fontThickness"
												className="block text-sm font-medium text-gray-900"
											>
												Font Thickness
											</label>
											<input
												type="text"
												id="fontThickness"
												name="fontThickness"
												value={botConfig.fontThickness}
												onChange={handleChange}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											/>
										</div>
									</div>
									<div className="pt-2 w-full text-gray-400 border-b border-gray-300 text-lg">
										First Response
									</div>
									<div className="flex  flex-wrap w-full pt-4">
										<div className="w-full">
											<label
												htmlFor="greetingMessage"
												className="block text-sm font-medium text-gray-900"
											>
												Greeting Message
											</label>
											<input
												type="text"
												id="greetingMessage"
												name="firstResponse.greetingMessage"
												value={botConfig.firstResponse.greetingMessage}
												onChange={(e) =>
													handleChange(e, 'firstResponse', 'greetingMessage')
												}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											/>
										</div>
									</div>
									<div className="pt-2 w-full text-gray-400 border-b border-gray-300 text-lg">
										Second Response
									</div>
									<div className="  flex-wrap w-full flex pt-4">
										<div className="w-1/2 pr-2">
											<label
												htmlFor="message"
												className="block text-sm font-medium text-gray-900"
											>
												Message
											</label>
											<input
												type="text"
												id="message"
												name="secondResponse.message"
												value={botConfig.secondResponse.message}
												onChange={(e) =>
													handleChange(e, 'secondResponse', 'message')
												}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											/>
										</div>
										<div className="w-1/2 px-6 text-md">
											<label
												htmlFor="options"
												className=" font-medium  text-gray-900"
											>
												Choose which departments you want to be included
											</label>
											<div className="flex text-md gap-x-8 font-semibold">
												{['Sales', 'Finance', 'Marketing', 'Technical'].map((department) => (
													<div key={department} className="flex items-center py-2 gap-x-2">
														<input
															type="checkbox"
															id={`department_${department}`}
															name={`department_${department}`}
															value={department.toLowerCase()}  // Make sure to use the lowercase value
															checked={botConfig.secondResponse.options?.includes(department.toLowerCase())}
															onChange={handleDepartmentCheckboxChange}
															className="gap-x-4 w-4 h-4"
														/>
														<label htmlFor={`department_${department}`} className="text-gray-900">
															{department}
														</label>
													</div>
												))}
											</div>
											{/* <KeywordChipsInput onAddKeywords={handleAddKeywords1} />  */}
										</div>
									</div>

									{/* Third Response Section */}
									<div className="pt-2 w-full text-gray-400 border-b border-gray-300 text-lg ">
										Third Response
									</div>
									<div className=" flex-wrap w-full flex pt-4 ">
										<div className="w-1/2 pr-2">
											<label
												htmlFor="message"
												className="block text-sm font-medium text-gray-900"
											>
												Message
											</label>
											<input
												type="text"
												id="message"
												name="thirdResponse.message"
												value={botConfig.thirdResponse.message}
												onChange={handleChange}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											/>
										</div>
										<div className="flex flex-wrap w-full ">
											<div className="w-1/2 py-2  text-md">
												<label
													htmlFor="firstDropdown"
													className="flex  text-md font-medium text-gray-900   "
												>
													Choose which channels you want to be included
												</label>
												<div className="flex flex-row gap-x-4 ">
													<div className="flex gap-x-8 font-semibold ">
														{['SMS', 'Whatsapp', 'Webchat', 'Call'].map(
															(option) => (
																<div
																	key={option}
																	className="flex items-center py-2"
																>
																	<input
																		type="checkbox"
																		id={`option_${option}`}
																		name={`option_${option}`}
																		value={option.toLowerCase()}
																		checked={botConfig.thirdResponse.options?.includes(option.toLowerCase())}
																		onChange={handleOptionCheckboxChange}
																		className="w-4 h-4"
																	/>
																	<label
																		htmlFor={`option_${option}`}
																		className="text-md text-gray-900 px-2"
																	>
																		{option}
																	</label>
																</div>
															)
														)}
													</div>
													{botConfig.thirdResponse.options?.includes('call') && (
														<div className="w-full flex flex-row ">
															{botConfig.thirdResponse.options?.includes(
																'call'
															) && (
																	<div className="flex gap-x-4 w-full font-semibold">
																		<div className="flex items-center py-2 ">
																			<input
																				type="checkbox"
																				id="voiceCall"
																				name="voiceCall"
																				value="voicecall"
																				checked={botConfig.thirdResponse.options?.includes(
																					'voicecall'
																				)}
																				onChange={handleOptionCheckboxChange}
																				className="gap-x-4"
																			/>
																			<label
																				htmlFor="voiceCall"
																				className=" text-md px-2 text-gray-900"
																			>
																				Voice Call
																			</label>
																		</div>
																		<div className="flex items-center py-2">
																			<input
																				type="checkbox"
																				id="videoCall"
																				name="videoCall"
																				value="videocall"
																				checked={botConfig.thirdResponse.options?.includes(
																					'videocall'
																				)}
																				onChange={handleOptionCheckboxChange}
																				className="mr-2"
																			/>
																			<label
																				htmlFor="videoCall"
																				className=" text-md px-2 text-gray-900"
																			>
																				Video call
																			</label>
																		</div>
																	</div>
																)}
														</div>
													)}
												</div>

												{botConfig.thirdResponse.options?.includes('call') && (
													<div className="w-full flex flex-row">
														{botConfig.thirdResponse.options?.includes(
															'call'
														) && (
																<div className="flex gap-x-4 w-full font-semibold">
																	<div className="flex flex-wrap items-center">
																		<input
																			type="checkbox"
																			id="DoYouWantCallScheduling"
																			name="DoYouWantCallScheduling"
																			value="true"
																			checked={botConfig.thirdResponse.options?.includes(
																				'true'
																			)}
																			onChange={handleOptionCheckboxChange}
																			className="mr-2 "
																		/>
																		<label
																			htmlFor="DoYouWantCallScheduling"
																			className="text-lg text-blue-600"
																		>
																			Do You Want Call Scheduling to be included?
																		</label>
																	</div>
																</div>
																// first 2 will place here
															)}
													</div>
												)}
											</div>
										</div>
										<div className="pt-2 text-gray-400 w-full border-b border-gray-300 text-lg">
											Fourth Response
										</div>
										<div className=" flex-wrap w-full flex py-4">
											<div className="w-full">
												<label
													htmlFor="message"
													className="block text-sm font-medium text-gray-900"
												>
													Message
												</label>
												<input
													type="text"
													id="message"
													name="fourthResponse.message"
													value={botConfig.fourthResponse.message}
													onChange={handleChange}
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
												/>
											</div>
										</div>

										<div className="flex w-full">
											<button
												type="submit"
												className="text-white bg-sky-600 mx-auto active:scale-90 scale-100 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
												onClick={handleSubmit}
											>
												Save Changes
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default BotConfiguration
