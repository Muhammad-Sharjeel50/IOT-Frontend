
import axios from 'axios'

import { useEffect, useState } from 'react'
import { FiTv, FiSpeaker, FiWifi } from 'react-icons/fi';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomCard from './CustomCard'
import { FaBeer, FaCoffee, FaApple } from 'react-icons/fa';
import { BsFillRouterFill } from "react-icons/bs";
import { MdOutlineWifiTethering, MdHeatPump, MdMicExternalOn } from "react-icons/md";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactApexChart from 'react-apexcharts';
import { areDatesEqual } from '@mui/x-date-pickers/internals';
const AgentDashBoard = () => {

	const [customers, setCustomers] = useState([])
	// 	const currentHour = new Date().getHours();
	// let hourIn12HourFormat = currentHour % 12 || 12;
	// 	const formattedHour = parseInt(hourIn12HourFormat.toString().padStart(2, '0'))

	const userData = JSON.parse(localStorage.getItem('user'))
	const totalCustomers = customers.length
	console.log("totalcustomer", totalCustomers);
	const endPoint = process.env.REACT_APP_BASE_URL
	// const timeActive = localStorage.getItem('timer_Active Time');
	const [apiweather, setApiWeather] = useState({})
	const [temperature, setTemperatures] = useState(false)
	const [humidity, setHumidity] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [buttonText, setButtonText] = useState('Action');
	const [Temperature, setTemperature] = useState(0)
	const [Voltage, setVoltage] = useState(0)
	const [current, setCurrent] = useState(0)
	const [phases, setPhases] = useState([]);
	const [pollutant, setPollutant] = useState([]);
	const [carbon_dioxide, setCarbon_dioxide] = useState([])
	const [power, setPower] = useState([])
	const [totalPower, setTotalPower] = useState(0);
	const [time, setTime] = useState();
	const [sum, setSum] = useState(0);
	const [hourIndex, setHourIndex] = useState(1);

	const [newpowerdata, setNewpowerdata] = useState([])
	// const [humidity, setHumidity] = useState(0); // Initialize humidity state


	const [hourlySums, setHourlySums] = useState([]);
	const xLabels = ['00', '01', '02', '03', '04', '05', '06'];




	const handleItemClick = (text) => {
		console.log("ole kar nekai", text);
		setButtonText(text);
	};
	const options = [
		{ value: 'today', label: 'Today' },
		{ value: 'yesterday', label: 'Yesterday' },
		{ value: 'lastWeek', label: 'Last Week' },
		{ value: 'lastMonth', label: 'Last Month' },
	];

	// const uData =[200,299];
	// const vData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
	// const xLabels = [
	// 	'00',
	// 	'01',
	// 	'02',
	// 	'03',
	// 	'04',
	// 	'05',
	// 	'06',
	// ];
	let data;
	useEffect(() => {
		const fetchWeatherData = async () => {
			try {
				const response = await axios.get('http://192.168.137.240:5000/api/sensors/data/1100');
				data = response.data[0].data;
				// let aravoltage = JSON.parse(response.data[0].voltage);
				// console.log("aravoltage", aravoltage[0])
				setApiWeather(response.data.daily);
				setHumidity(response.data[0].humidity)
				setTemperature(response.data[0].temperature)
				// setVoltage(response.data[0]?.voltage
				setCurrent(response.data[0].data[0].current)
				setPhases(response.data[0].status)
				setPollutant(response.data[0].pollutant)
				const weather = () => {
					const city = 'Seattle';
					fetch(`${api.base}weather?q=${city}&appid=${api.key}`)
						.then(res => {
							if (!res.ok) {
								throw new Error('Network response was not ok ' + res.statusText);
							}
							return res.json();
						})
						.then(result => {
							console.log("weather api::", result);
							setTemperatures(true)
							setApiWeather(result);
						})
						.catch(error => {
							console.error('There has been a problem with your fetch operation:', error);
						});
				};

				weather();
				// Get the current hour and format it to a 12-hour format
				const currentHour = new Date().getHours();
				let hourIn12HourFormat = currentHour % 12 || 12;
				const formattedHour = hourIn12HourFormat.toString().padStart(2, '0');
				let filteredDatas;
				// Calculate sums for the current hour and set others to 0
				const sums = xLabels.map(label => {
					if (label === formattedHour) {
						filteredDatas = data.filter(item => {
							const hour = item.reading_time.split(':')[0];
							return hour === label;
						});
						const powerValues = filteredDatas.map(item => item.power);
						const sum = powerValues.reduce((acc, power) => acc + power, 0) / 1000;
						return sum;
					}
					return 0;
				});

				setHourlySums(sums);

				// const hourIndex = 1; // Index for '02'



				const powerValues = filteredDatas.map(item => item.power);

				const sumss = powerValues.reduce((acc, power) => acc + power, 0) / 1000; // Calculate sum and convert to kW
				setSum(sumss);
				console.log("Calculated Total Power (kW):", sum); // Debugging log

				setTotalPower(sum);
				setCarbon_dioxide(response.data[0].carbon_dioxide)
				setTime(response.data[0].reading_time)
				console.log("timeeeeeeeeee", response.data[0].reading_time)
				// setPower(response.data[0].power)



				// Add total power to uData
				setNewpowerdata(prevUData => [...prevUData, sum]);
				// setNewpowerdata(prevUData => [...prevUData, totalPower]);

				console.log("datttttttttttttttttttttttt", sum)
				console.log("datttttttttttttttttttttttt123", newpowerdata)

				setPower(powerValues);
				console.log("response.data[0].powerValues", powerValues)

				console.log("dattttt", response)
				console.log("dattttt", response.data[0])

			} catch (error) {
				console.error('Error fetching weather data:', error);
			}
		};

		fetchWeatherData();
	}, [data, xLabels]);




	const currentDate = new Date();

	// Get hours, minutes, and period (AM/PM)
	let hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();
	const period = hours >= 12 ? 'PM' : 'AM'; // Determine if it's AM or PM

	// Convert hours to 12-hour format
	hours = hours % 12 || 12;

	// Format minutes with leading zero if needed
	const formattedMinutes = minutes.toString().padStart(2, '0');

	// Concatenate hours, minutes, and period
	const formattedTime = `${hours}:${formattedMinutes} ${period}`;

	// Now `formattedTime` contains the current time in the "2:01 PM" format
	console.log("Current Time:", formattedTime);


	// const totalPower = power?.reduce((sum, item) => sum + item.power, 0);
	const chartOptions = {
		chart: {
			height: 350,
			type: 'radialBar',
			toolbar: {
				show: true
			}
		},
		plotOptions: {
			radialBar: {
				startAngle: -135,
				endAngle: 225,
				hollow: {
					margin: 0,
					size: '70%',
					background: '#fff',
					image: undefined,
					imageOffsetX: 0,
					imageOffsetY: 0,
					position: 'front',
					dropShadow: {
						enabled: true,
						top: 3,
						left: 0,
						blur: 4,
						opacity: 0.24
					}
				},
				track: {
					background: '#fff',
					strokeWidth: '67%',
					margin: 0,
					dropShadow: {
						enabled: true,
						top: -3,
						left: 0,
						blur: 4,
						opacity: 0.35
					}
				},
				dataLabels: {
					show: true,
					name: {
						offsetY: -10,
						show: true,
						color: '#888',
						fontSize: '17px'
					},
					value: {
						formatter: function (val) {
							return parseInt(val);
						},
						color: '#111',
						fontSize: '36px',
						show: true,
					}
				}
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'dark',
				type: 'horizontal',
				shadeIntensity: 0.5,
				gradientToColors: ['#616161'],
				inverseColors: true,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100]
			}
		},
		stroke: {
			lineCap: 'round'
		},
		labels: ['Temperature'],
	};

	const chartSeries = [Temperature]; // Example array with a single temperature value


	// const chartSeries = [`${humidity}`];
	const api = {
		key: '446d6bfc79d6130fa07d4b04a5239eca',
		base: "https://api.openweathermap.org/data/2.5/"
	};

	useEffect(() => {

	}, []); // Empty dependency array ensures the effect runs only once




	function valuetext(value) {
		console.log("valurrrrrrrr", value);
		return `${value}°C`;
	}

	const theme = createTheme({
		components: {
			MuiSlider: {
				styleOverrides: {
					thumb: {
						color: 'black', // Custom thumb color
						width: 20, // Set the width of the thumb
						height: 20, // Set the height of the thumb
					},
					track: {
						color: '#888888', // Custom track color
						height: 8, // Set the height of the track
					},
					rail: {
						color: '#888888', // Custom rail color
						height: 10, // Set the height of the rail
					},
				},
			},
		},
	});

	return (
		<>

			<div className="w-3/4 flex flex-col p-2">
				<div className="cards">
					<CustomCard title="Smart TV" icon={<FiTv />} />
					<CustomCard title="Speaker" icon={<FiSpeaker />} />
					<CustomCard title="Router" icon={<BsFillRouterFill />} />
				</div>

				<div className="flex flex-wrap justify-center">
					<CustomCard title="Wifi" icon={<MdOutlineWifiTethering />} />
					<CustomCard title="Heater" icon={<MdHeatPump />} />
					<CustomCard title="Socket" icon={<MdMicExternalOn />} />
				</div>

				<div className="flex w-full justify-center gap-5">
					<div style={{ height: "355px" }} className="w-1/2 p-2 bg-white rounded-lg ">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h1>Usage Status</h1>
							<div style={{ display: 'flex' }}>

								<FaBeer style={{ margin: '10 10px', color: 'black', width: '40px' }} />
								<FaCoffee style={{ margin: '10 10px', color: 'black', width: '40px' }} />
								<button style={{}}
									type="button"
									className="btn btn-danger dropdown-toggle"
									data-bs-toggle="dropdown"  // Use data-bs-toggle for Bootstrap 5
									aria-haspopup="true"
									aria-expanded="false"
								>
									{buttonText}
								</button>
								<div className="dropdown-menu">
									{/* <a className="dropdown-item" href="#" onClick={() => handleItemClick('Action')}>Today</a> */}
									<a className="dropdown-item" href="#" onClick={() => handleItemClick('Today')}>Today</a>
									<a className="dropdown-item" href="#" onClick={() => handleItemClick('Yesterday')}>Yesterday</a>
									<a className="dropdown-item" href="#" onClick={() => handleItemClick('Montly')}>Monthly</a>
								</div>
								{/* </div> */}
							</div>
						</div>

						{/* <div className="chart-container"> */}
						<BarChart
							width={300}
							height={200}
							colors={["gray"]}
							series={[{ data: hourlySums, label: 'Current Usage', type: 'bar' }]}
							xAxis={[{ scaleType: 'band', data: xLabels }]}
						/>

						{/* </div> */}
						{/* <CustomCard title="Big Card 1" /> */}
					</div>
					<div style={{ height: "355px" }} className="w-1/2 p-2 bg-white rounded-lg h-full">
						<div className='outage'>
							<h1>Power Outage</h1>
							<label className="relative inline-flex items-center mb-1 cursor-pointer">
								<input
									type="checkbox"
									className="sr-only peer"
								// checked={isActive}
								// onChange={toggleStatus}
								/>
								<div
									className={`w-11 ml-16 h-6 bg-gray-200 rounded-full peer ${isActive ? 'peer-checked:bg-blue-600' : 'dark:bg-gray-500'
										} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:ml-16 after:transition-all`}
								/>
							</label>
						</div>

						{phases && (
							<>
								{phases === 'threephase' ? (
									<>
										<div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
											<h2 style={{ boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', padding: '10px', borderRadius: '4px' }}>Phase 1:{Voltage}</h2>
											<ThemeProvider theme={theme}>
												<Box sx={{ width: 260 }}>
													<Slider
														aria-label="Voltage 1"
														value={Voltage}
														min={0}
														max={300}
														valueLabelDisplay="auto"
													// You can set the value based on data if needed
													/>
												</Box>
											</ThemeProvider>
										</div>
										<div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
											<h2 style={{ boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', padding: '10px', borderRadius: '4px' }}>Phase 2:{Voltage}</h2>
											<ThemeProvider theme={theme}>
												<Box sx={{ width: 260 }}>
													<Slider
														aria-label="Voltage 2"
														value={Voltage}
														min={0}
														max={300}
														valueLabelDisplay="auto"
													// You can set the value based on data if needed
													/>
												</Box>
											</ThemeProvider>
										</div>
										<div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
											<h2 style={{ boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', padding: '10px', borderRadius: '4px' }}>Phase 3:{Voltage}</h2>
											<ThemeProvider theme={theme}>
												<Box sx={{ width: 260 }}>
													<Slider
														aria-label="Voltage 3"
														value={Voltage}
														min={0}
														max={300}
														valueLabelDisplay="auto"
													// You can set the value based on data if needed
													/>
												</Box>
											</ThemeProvider>
										</div>
									</>
								) : (
									<div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
										<h2 style={{ boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', padding: '10px', borderRadius: '4px' }}>Phase 1</h2>
										<ThemeProvider theme={theme}>
											<Box sx={{ width: 260 }}>
												<Slider
													aria-label="Voltage 1"
													value={Voltage}
													min={0}
													max={300}
													valueLabelDisplay="auto"
												// You can set the value based on data if needed
												/>
											</Box>
										</ThemeProvider>
									</div>
								)}
							</>
						)}
					</div>
				</div>

				<div className="h-3/5 flex flex-wrap px-2">

					<div className="w-1/2 p-4">

					</div>
				</div>
			</div >
			<div className="w-full md:w-1/4 h-full flex flex-col flex-wrap">
				<div className="row d-flex justify-content-center mt-10">
					<div className="col-md-6 w-full md:w-64">
						<h1 className="text-center md:text-left">Temperature</h1>
						{temperature ? (
							<ReactApexChart options={chartOptions} series={chartSeries} type="radialBar" height={450} />
						) : "No weather to display"}
					</div>
				</div>
				<div>
					<h1>Humidity</h1>
					<ThemeProvider theme={theme}>
						<Box sx={{ width: '100%' }}>
							<Slider
								aria-label="Humidity"
								value={humidity && humidity.toFixed(2)}
								min={0}
								max={100}
								valueLabelDisplay="auto"
							/>
							<div>Humidity: {humidity.toFixed(2)}%</div>
						</Box>
					</ThemeProvider>
				</div>
				<div className="h-auto py-2 px-1 w-full flex flex-wrap text-sm">
					<div className="w-full md:w-72 h-full bg-white rounded-lg mx-auto">
						Air Quality
						<h1 className="border">Moderate CO2:{carbon_dioxide}</h1>
						<h1 className="border">Pollutants:{pollutant}</h1>
					</div>
				</div>
				<div className="bg-white text-white p-6 rounded-lg shadow-lg max-w-sm">
					<div className="flex justify-between items-center">
						<div>
							{/* <h2 className="text-lg font-semibold">{apiweather?.name}</h2> */}
							{console.log("////////////////////////////////////////////", apiweather?.name)}
							<h1 className="text-4xl font-bold">{Temperature.toFixed(2)}</h1>
							<p className="text-sm mt-2">15d : 15h : 27m : 40s</p>
						</div>
						<div>
							<img src="https://img.icons8.com/ios-filled/50/000000/partly-cloudy-day--v1.png" alt="Weather Icon" className="w-16" />
							<p className="text-sm text-center">Today</p>
						</div>
					</div>
					<div className="flex justify-between mt-4 text-black">
						{[
							{ day: 'Mon', temp: '22°C', icon: 'cloudy' },
							{ day: 'Tue', temp: '24°C', icon: 'sunny' },
							{ day: 'Wed', temp: '23°C', icon: 'rain' },
							{ day: 'Thu', temp: '22°C', icon: 'sunny' },
							{ day: 'Fri', temp: '24°C', icon: 'cloudy' },
							{ day: 'Sat', temp: '23°C', icon: 'sunny' },
						].map((item, index) => (
							<div key={index} className="flex flex-col items-center text-black">
								<img src={`https://img.icons8.com/ios-filled/50/000000/${item.icon}.png`} alt={`${item.icon} icon`} className="w-8 h-8" />
								<p className="text-sm mt-1">{item.temp}</p>
								<p className="text-xs">{item.day}</p>
							</div>
						))}
					</div>
				</div>
			</div>


		</>
	)
}

export default AgentDashBoard
