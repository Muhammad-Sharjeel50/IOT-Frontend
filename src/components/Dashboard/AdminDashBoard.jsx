import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Label } from 'recharts'
import female from '../../assets/icons/female.png'
import male from '../../assets/icons/male.png'
import React, { useState, useMemo, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import AddCards from './AddCards';
import { PiWaveSineFill } from "react-icons/pi";
// import { BsLightningCharge } from "react-icons/bs";
import { BsLightningCharge } from "react-icons/bs";
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


	// useEffect(() => {
	
		
		setTimeout(()=>{
			fetchData()
		},1000)
	

	const fetchData = async () => {
		try {
			const response = await axios.get('http://192.168.137.105:5000/api/sensors/data/C8:C9:A3:C8:AE:60');
			const data = response.data;
			console.log("data================>",data)
			if (data.length > 0) {
				const lastIndex = data.length - 1;
				const latestData = data[lastIndex];
				if (latestData.phase1 && latestData.phase1.length > 0) {
					const lastIndexPhase1 = latestData.phase1.length - 1;
					const phase1Data = latestData.phase1[lastIndexPhase1];
	

					const lastIndexPhase2 = latestData.phase2.length - 1;
					const phase2Data = latestData.phase2[lastIndexPhase2];
	
					const lastIndexPhase3 = latestData.phase3.length - 1;
					const phase3Data = latestData.phase3[lastIndexPhase3];

					console.log("Last Index Phase1 Data:", phase1Data);
					console.log("Last Index Phase2 Data:", phase2Data); 	

					console.log("Last Index Phase1 Data:", phase3Data);





					setCurrentphase1(phase1Data.current);
					setEnergyphase1(phase1Data.energy);
					setFrequencyphase1(phase1Data.frequency);
					setPowerphase1(phase1Data.power);
					setPower_factorphase1(phase1Data.power_factor);
					setVoltagephase1(phase1Data.voltage);



					setCurrentphase2(phase2Data.current);
					setEnergyphase2(phase2Data.energy);
					setFrequencyphase2(phase2Data.frequency);
					setPowerphase2(phase2Data.power);
					setPower_factorphase2(phase2Data.power_factor);
					setVoltagephase2(phase2Data.voltage);




					setCurrentphase3(phase3Data.current);
					setEnergyphase3(phase3Data.energy);
					setFrequencyphase3(phase3Data.frequency);
					setPowerphase3(phase3Data.power);
					setPower_factorphase3(phase3Data.power_factor);
					setVoltagephase3(phase3Data.voltage);


				} else {
					console.warn("No phase1 data available");
				}
			} else {
				console.warn("No data available");
			}
		} catch (error) {
			console.error('Error fetching weather data:', error);
		}
	};
	
	
	const [chartData, setChartData] = useState({
		series: [
			{
				name: 'phase1',
				data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
			},
			{
				name: 'phase 2',
				data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
			},
			{
				name: 'phase 3',
				data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
			},
		],
		options: {
			chart: {
				type: 'bar',
				height: 350,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '55%',
					endingShape: 'rounded',
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent'],
			},
			xaxis: {
				categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
			},
			yaxis: {
				title: {
					text: '$ (thousands)',
				},
			},
			fill: {
				opacity: 1,
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return "$ " + val + " thousands";
					},
				},
			},
		},
	});

	return (
		<>

			<div className="space-y-2 w-full">
				<div className=" py-1 px-2 flex space-x-2">
					<AddCards  title="Phase 1" />
					<AddCards icon={<PiWaveSineFill />} title="Current" count={phase1current} />
					<AddCards icon={<BsLightningCharge />} title="Energy" count={phase1energy} />
					<AddCards bgColor="bg-gray-800" title="frequency" count={phase1frequency} />
					<AddCards bgColor="bg-blue-800" title="power" count={phase1power} />
					<AddCards bgColor="bg-blue-800" title="power_factor	" count={phase1power_factor} />
					<AddCards bgColor="bg-red-800" title="voltage " count={phase1voltage} />
				</div>
				<div className=" py-1 px-2 flex space-x-2 ">
					<AddCards bgColor="bg-red-800" title="Phase 2" />
					<AddCards bgColor="bg-yellow-800" title="Current"count={phase2current} />
					<AddCards bgColor="bg-green-500" title="Energy"count={phase2energy} />
					<AddCards bgColor="bg-purple-800" title="frequency"count={phase2frequency} />
					<AddCards bgColor="bg-indigo-800" title="power"count={phase2power} />
					<AddCards bgColor="bg-pink-800" title="power_factor" count={phase2power_factor}/>
					<AddCards
        title="Voltage"
        count={phase1voltage}
        bgColor="bg-red-800"
        gaugeProps={{
          arc: {
            subArcs: [
              { limit: 20, color: '#EA4228', showTick: true },
              { limit: 40, color: '#F58B19', showTick: true },
              { limit: 60, color: '#F5CD19', showTick: true },
              { limit: 100, color: '#5BE12C', showTick: true },
            ],
          },
          value: 50,
        }}
      />
				</div>
				<div className=" py-1 px-2 flex space-x-2">
					<AddCards bgColor="bg-red-800" title="Phase 3" />
					<AddCards bgColor="bg-yellow-800" title="Current" count={phase3current}/>
					<AddCards bgColor="bg-green-500" title="Energy" count={phase3energy}/>
					<AddCards bgColor="bg-purple-800" title="frequency" count={phase3frequency}/>
					<AddCards bgColor="bg-indigo-800" title="power"count={phase3power} />
					<AddCards bgColor="bg-pink-800" title="power_factor" count={phase3power_factor}/>
					<AddCards bgColor="bg-red-800" title="voltage" count={phase3voltage}/>
				</div>
				<div id="chart">
					<ReactApexChart
						options={chartData.options}
						series={chartData.series}
						type="bar"
						height={350}
					/>
				</div>
				<div id="html-dist"></div>
			</div>

		</>
	)
}

export default AdminDashBoard
