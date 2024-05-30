
import React, { useState} from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import AddCards from './AddCards';

import { GiLightningFrequency } from "react-icons/gi";
import { SiPowerbi } from "react-icons/si";
import { TbGeometry } from "react-icons/tb";
import { PiWaveSineFill } from "react-icons/pi";

import { BsLightningCharge } from "react-icons/bs";

const AdminDashBoard = () => {
	const endPoint = process.env.REACT_APP_BASE_URL

	const [phase1current, setCurrentphase1] = useState([])
	const [phase1energy, setEnergyphase1] = useState([])
	const [phase1frequency, setFrequencyphase1] = useState([])
	const [phase1power, setPowerphase1] = useState([])
	const [phase1power_factor, setPower_factorphase1] = useState([])
	const [phase1voltage, setVoltagephase1] = useState([])



	const [phase2current, setCurrentphase2] = useState([])
	const [phase2energy, setEnergyphase2] = useState([])
	const [phase2frequency, setFrequencyphase2] = useState([])
	const [phase2power, setPowerphase2] = useState([])
	const [phase2power_factor, setPower_factorphase2] = useState([])
	const [phase2voltage, setVoltagephase2] = useState([])



	const [phase3current, setCurrentphase3] = useState([])
	const [phase3energy, setEnergyphase3] = useState([])
	const [phase3frequency, setFrequencyphase3] = useState([])
	const [phase3power, setPowerphase3] = useState([])
	const [phase3power_factor, setPower_factorphase3] = useState([])
	const [phase3voltage, setVoltagephase3] = useState([])


	setTimeout(() => {
		fetchData()
	}, 1000)


	const fetchData = async () => {
		try {
			const response = await axios.get('http://192.168.137.105:5000/api/sensors/data/C8:C9:A3:C8:AE:60');
			const data = response.data;
			console.log("data================>", data);
			if (data.length > 0) {
				const lastIndex = data.length - 1;
				const latestData = data[lastIndex];
				if (latestData.phase1 && latestData.phase1.length > 0) {
					const lastIndexPhase1 = latestData.phase1.length - 1;
					const phase1Data = latestData.phase1[lastIndexPhase1];
					console.log("Last Index Phase1 Data:", phase1Data);
	
					setCurrentphase1(phase1Data.current.toFixed(2));
					setEnergyphase1(phase1Data.energy.toFixed(2));
					setFrequencyphase1(phase1Data.frequency.toFixed(2));
					setPowerphase1(phase1Data.power.toFixed(2));
					setPower_factorphase1(phase1Data.power_factor.toFixed(2));
					setVoltagephase1(phase1Data.voltage.toFixed(2));
				} else {
					console.warn("No phase1 data available");
				}
	
				if (latestData.phase2 && latestData.phase2.length > 0) {
					const lastIndexPhase2 = latestData.phase2.length - 1;
					const phase2Data = latestData.phase2[lastIndexPhase2];
					console.log("Last Index Phase2 Data:", phase2Data);
	
					setCurrentphase2(phase2Data.current.toFixed(2));
					setEnergyphase2(phase2Data.energy.toFixed(2));
					setFrequencyphase2(phase2Data.frequency.toFixed(2));
					setPowerphase2(phase2Data.power.toFixed(2));
					setPower_factorphase2(phase2Data.power_factor.toFixed(2));
					setVoltagephase2(phase2Data.voltage.toFixed(2));
				}
	
				if (latestData.phase3 && latestData.phase3.length > 0) {
					const lastIndexPhase3 = latestData.phase3.length - 1;
					const phase3Data = latestData.phase3[lastIndexPhase3];
					console.log("Last Index Phase3 Data:", phase3Data);
	
					setCurrentphase3(phase3Data.current.toFixed(2));
					setEnergyphase3(phase3Data.energy.toFixed(2));
					setFrequencyphase3(phase3Data.frequency.toFixed(2));
					setPowerphase3(phase3Data.power.toFixed(2));
					setPower_factorphase3(phase3Data.power_factor.toFixed(2));
					setVoltagephase3(phase3Data.voltage.toFixed(2));
				}
			} else {
				console.warn("No data available");
			}
		} catch (error) {
			console.error('Error fetching sensor data:', error);
		}
	};
	

	const options = {
		chart: {
		  type: 'radialBar',
		  offsetY: -20,
		  sparkline: {
			enabled: true
		  }
		},
		plotOptions: {
		  radialBar: {
			startAngle: -90,
			endAngle: 90,
			track: {
			  background: "#e7e7e7",
			  strokeWidth: '97%',
			  margin: 5,
			  dropShadow: {
				enabled: true,
				top: 2,
				left: 0,
				color: '#999',
				opacity: 1,
				blur: 2
			  }
			},
			dataLabels: {
			  name: {
				show: false
			  },
			  value: {
				offsetY: -2,
				fontSize: '22px',
				formatter: function (val) {
					return val +'V'; 
				}
			  }
			}
		  }
		},
		grid: {
		  padding: {
			top: -10
		  }
		},
		fill: {
		  type: 'gradient',
		  gradient: {
			shade: 'light',
			shadeIntensity: 0.4,
			inverseColors: false,
			opacityFrom: 1,
			opacityTo: 1,
			stops: [0, 50, 53, 91]
		  }
		},
		labels: ['Average Results']
	  };
	  	
	return (
		<>

			<div className="space-y-2 w-full">
				<div className=" py-1 px-2 flex space-x-2">
				<AddCards icon={<PiWaveSineFill />} title="Phase 1" />
					<div className="bg-white h-32 grid grid-cols-1 gap-4">
						
					<ReactApexChart options={options} series={[phase1voltage]} type="radialBar" />
					</div>
					<AddCards icon={<PiWaveSineFill />} title="Current" count={phase1current} />
					<AddCards icon={<SiPowerbi/>} title="power" count={phase1power} />
					<AddCards icon={<BsLightningCharge />} title="Energy" count={phase1energy} />
					<AddCards icon={< GiLightningFrequency/>} title="frequency" count={phase1frequency} />

					<AddCards icon={< TbGeometry/>} title="power_factor	" count={phase1power_factor} />

				</div>
				<div className=" py-1 px-2 flex space-x-2 ">
					<AddCards  icon={<PiWaveSineFill />}title="Phase 2" />
					<div className="bg-white grid grid-cols-1 gap-4">
					<ReactApexChart options={options} series={[phase2voltage]} type="radialBar" />
					</div>

					<AddCards  icon={<PiWaveSineFill />} title="Current" count={phase2current} />
					<AddCards icon={<SiPowerbi/>} title="power" count={phase2power} />
					<AddCards icon={<BsLightningCharge />} title="Energy" count={phase2energy} />
					<AddCards icon={< GiLightningFrequency/>} title="frequency" count={phase2frequency} />

					<AddCards icon={< TbGeometry/>} title="power_factor" count={phase2power_factor} />

				</div>
				<div className=" py-1 px-2 flex space-x-2">
					<AddCards  icon={<PiWaveSineFill />} title="Phase 3" />
					<div className="bg-white grid grid-cols-1 gap-4">
					<ReactApexChart options={options} series={[phase3voltage]} type="radialBar" />
					</div>
					<AddCards  icon={<PiWaveSineFill />}  title="Current" count={phase3current} />
					<AddCards icon={<SiPowerbi/>} title="power" count={phase3power} />
					<AddCards icon={<BsLightningCharge />} title="Energy" count={phase3energy} />
					<AddCards icon={< GiLightningFrequency/>} title="frequency" count={phase3frequency} />

					<AddCards icon={< TbGeometry/>} title="power_factor" count={phase3power_factor} />

				</div>
		
				<div id="html-dist"></div>
			</div>

		</>
	)
}

export default AdminDashBoard
