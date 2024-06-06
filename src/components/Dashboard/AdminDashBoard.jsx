
import React, { useState, useMemo, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import AddCards from "./AddCards";
import { FaCalendarDay, FaCalendarAlt } from "react-icons/fa";
import { GiLightningFrequency } from "react-icons/gi";
import { SiPowerbi } from "react-icons/si";
import { TbGeometry } from "react-icons/tb";
import { PiWaveSineFill } from "react-icons/pi";
import { BsLightningCharge } from "react-icons/bs";
import SplitCards from "./SplitCards"
const AdminDashBoard = () => {
  const endPoint = process.env.REACT_APP_BASE_URL;
  const [phase1current, setCurrentphase1] = useState([]);
  const [phase1energy, setEnergyphase1] = useState([]);
  const [phase1frequency, setFrequencyphase1] = useState([]);
  const [phase1power, setPowerphase1] = useState([]);
  const [phase1power_factor, setPower_factorphase1] = useState([]);
  const [phase1voltage, setVoltagephase1] = useState([]);
  const [monthlyUsage, setMonthlyUsage] = useState(0);
  const [phase2current, setCurrentphase2] = useState([]);
  const [phase2energy, setEnergyphase2] = useState([]);
  const [phase2frequency, setFrequencyphase2] = useState([]);
  const [phase2power, setPowerphase2] = useState([]);
  const [phase2power_factor, setPower_factorphase2] = useState([]);
  const [phase2voltage, setVoltagephase2] = useState([]);
  const [todayUsage, setTodayUsage] = useState(0);
  const [phase3current, setCurrentphase3] = useState([])
  const [phase3energy, setEnergyphase3] = useState([])
  const [phase3frequency, setFrequencyphase3] = useState([])
  const [phase3power, setPowerphase3] = useState([])
  const [phase3power_factor, setPower_factorphase3] = useState([])
  const [phase3voltage, setVoltagephase3] = useState([])
  const [apparent,setApparent]=useState([])
  const [reactive,setReactive]=useState([])
  const[threephasevoltage,setThreephasevoltage]=useState([])
  const [frequency,setFrequency]=useState([])

  const [powerfactor,setPowerfactor]=useState([])
  const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const year = currentDate.getFullYear(); // Ensure this is not declared elsewhere
const month = String(currentMonth).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");
const todayDate = `${year}-${month}-${day}`;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://34.224.21.199:5000/api/sensors/data/08:F9:E0:5F:AC:66"
      );
      const data = response.data;
      if (data.length > 0) {
        const lastIndex = data.length - 1;
        const latestData = data[lastIndex];

		if (latestData.phase1 && latestData.phase1.length > 0) {
          const lastIndexPhase1 = latestData.phase1.length - 1;
          const phase1Data = latestData.phase1[lastIndexPhase1];

          setCurrentphase1(phase1Data.current.toFixed(3));
          setEnergyphase1(phase1Data.energy.toFixed(3));
          setFrequencyphase1(phase1Data.frequency.toFixed(2));
		  setPowerphase1((phase1Data.power / 1000).toFixed(3));

          setPower_factorphase1(phase1Data.power_factor.toFixed(2));
          setVoltagephase1(phase1Data.voltage.toFixed(2));
        } else {
          console.warn("No phase1 data available");
        }

        if (latestData.phase2 && latestData.phase2.length > 0) {
          const lastIndexPhase2 = latestData.phase2.length - 1;
          const phase2Data = latestData.phase2[lastIndexPhase2];

          setCurrentphase2(phase2Data.current.toFixed(3));
          setEnergyphase2(phase2Data.energy.toFixed(3));
          setFrequencyphase2(phase2Data.frequency.toFixed(2));
          setPowerphase2((phase2Data.power/1000).toFixed(3));
          setPower_factorphase2(phase2Data.power_factor.toFixed(2));
          setVoltagephase2(phase2Data.voltage.toFixed(2));
        }

        if (latestData.phase3 && latestData.phase3.length > 0) {
          const lastIndexPhase3 = latestData.phase3.length - 1;
          const phase3Data = latestData.phase3[lastIndexPhase3];

          setCurrentphase3(phase3Data.current.toFixed(3));
          setEnergyphase3(phase3Data.energy.toFixed(3));
          setFrequencyphase3(phase3Data.frequency.toFixed(2));
          setPowerphase3((phase3Data.power/1000).toFixed(3));
          setPower_factorphase3(phase3Data.power_factor.toFixed(2));
          setVoltagephase3(phase3Data.voltage.toFixed(2));
		
        }

		if (latestData.three_phase && latestData.three_phase.length > 0) {
			const latestThreePhaseData = latestData.three_phase[latestData.three_phase.length - 1]; 
		
			setApparent(latestThreePhaseData.apparent_power.toFixed(3));
			setReactive(latestThreePhaseData.reactive_power.toFixed(3));
      setThreephasevoltage(latestThreePhaseData.voltage.toFixed(2))
			setFrequency(latestThreePhaseData.frequency.toFixed(2));
			setPowerfactor(latestThreePhaseData.power_factor.toFixed(2));
		
		} else {
			console.warn("No three_phase data available");
		}
		
		}else {
        console.warn("No data available");
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  const options = {
	chart: {
	  type: 'radialBar',
	  offsetY: -20,
	  width: '100%',
	  sparkline: {
		enabled: true,
	  },
	},
	plotOptions: {
	  radialBar: {
		startAngle: -90,
		endAngle: 90,
		track: {
		  background: '#e7e7e7',
		  strokeWidth: '97%',
		  margin: 5,
		  dropShadow: {
			enabled: true,
			top: 2,
			left: 0,
			color: '#999',
			opacity: 1,
			blur: 2,
		  },
		},
		dataLabels: {
		  name: {
			show: false,
		  },
		  value: {
			offsetY: -2,
			fontSize: '22px',
			formatter: function (val) {
			  // Check if the screen width is smaller than 640px
			  if (window.innerWidth <= 640) {
				// If smaller, add margin top to the value
				return `${val}V`;
			  } else {
				// Otherwise, display the value without margin top
				return `${val}V`;
			  }
			},
		  },
		},
	  },
	},
	grid: {
	  padding: {
		top: -10,
	  },
	},
	fill: {
	  type: 'gradient',
	  gradient: {
		shade: 'blue',
		shadeIntensity: 0.4,
		inverseColors: false,
		opacityFrom: 1,
		opacityTo: 1,
		stops: [0, 50, 53, 91],
	  },
	},
	colors: ['#00008B'],
	labels: ['Average Results'],
  };
  
  // Add this media query for small screens
  if (window.innerWidth <= 640) { // Adjust the breakpoint as needed
	options.plotOptions.radialBar.track.marginTop = 20; // Override margin top for small screens
  }
  

  const [chartData, setChartData] = useState({
    series: [
      { name: "Phase 1", data: Array.from({ length: 24 }, () => 0) },
      { name: "Phase 2", data: Array.from({ length: 24 }, () => 0) },
      { name: "Phase 3", data: Array.from({ length: 24 }, () => 0) },
      { name: "threephase", data: Array.from({ length: 24 }, () => 0) },

    ],
    options: {
      chart: {
        type: "bar",
        height: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: Array.from({ length: 24 }, (_, i) =>
          i.toString().padStart(2, "0")
        ),
      },
      yaxis: {
        min: 0, 
        max: 100, 
        title: {
          text: "Power (kW)",
        },
        labels: {
          formatter: function (val) {
            return Math.round(val);
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${Math.round(val)} kW`; 
          },
        },
      },
    },
  });

  const fetchDatas = async () => {
    try {
      const response = await axios.get(
        "http://34.224.21.199:5000/api/sensors/data/08:F9:E0:5F:AC:66"
      );
      const data = response.data;

      const filterAndSumPower = (phaseData) => {
        const filteredData = phaseData.filter(
          (item) => item.reading_date == todayDate
        );

        const powerData = Array(24).fill(0);
        filteredData.forEach((item) => {
          const hour = parseInt(item.reading_time.split(":")[0]);

          const powerValue = Number(item.power);

          powerData[hour] += powerValue.toFixed(2) / 1000;
        });

        return powerData;
      };

      if (data.length > 0) {
        const powerDataPhase1 = filterAndSumPower(data[0].phase1);
        const powerDataPhase2 = filterAndSumPower(data[0].phase2);
        const powerDataPhase3 = filterAndSumPower(data[0].phase3);
		const three_phaseData = filterAndSumPower(data[0].three_phase);
        setChartData((prevState) => ({
			 ...prevState,
             series: [
            { name: "Phase 1", data: powerDataPhase1 },
            { name: "Phase 2", data: powerDataPhase2 },
            { name: "Phase 3", data: powerDataPhase3 },
			{name:"threephase", data: three_phaseData}
          ],
        }));
      } else {
        console.warn("No data available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDailyAndMonthlyData = async () => {
    try {
      const response = await axios.get(
        "http://34.224.21.199:5000/api/sensors/data/08:F9:E0:5F:AC:66"
      );
      const data = response.data;
      let totalMonthlyUsage = 0;
      let totalDailyUsage = 0;

      const calculateUsage = (phaseData, filterCondition) => {
        const filteredData = phaseData.filter(filterCondition);


        let totalPower = 0;
        filteredData.forEach((item) => {
          totalPower += item.power;
        });

        return (totalPower / 1000).toFixed(2);
      };

      if (data.length > 0) {
      

        const monthlyFilterCondition = (item) =>
          new Date(item.reading_date).getMonth() + 1 === currentMonth;
        const dailyFilterCondition = (item) =>
          item.reading_date == todayDate;

        const phase1MonthlyUsage = calculateUsage(
          data[0].phase1,
          monthlyFilterCondition
        );
        const phase2MonthlyUsage = calculateUsage(
          data[0].phase2,
          monthlyFilterCondition
        );
        const phase3MonthlyUsage = calculateUsage(
          data[0].phase3,
          monthlyFilterCondition
        );

        const phase1DailyUsage = calculateUsage(
          data[0].phase1,
          dailyFilterCondition
        );
        const phase2DailyUsage = calculateUsage(
          data[0].phase2,
          dailyFilterCondition
        );
        const phase3DailyUsage = calculateUsage(
          data[0].phase3,
          dailyFilterCondition
        );

        totalMonthlyUsage =
          parseFloat(phase1MonthlyUsage) +
          parseFloat(phase2MonthlyUsage) +
          parseFloat(phase3MonthlyUsage);

        totalDailyUsage =
          parseFloat(phase1DailyUsage) +
          parseFloat(phase2DailyUsage) +
          parseFloat(phase3DailyUsage);
      } else {
        console.warn("No data available");
      }

      setMonthlyUsage(totalMonthlyUsage.toFixed(2));
      setTodayUsage(totalDailyUsage.toFixed(2));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
	fetchData();
	fetchDatas();
	fetchDailyAndMonthlyData();
    const intervalId = setInterval(() => {
      fetchData();
	  fetchDatas();
	  fetchDailyAndMonthlyData();
    }, 30000); // 30 seconds interval

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount
    };
  }, []);

  return (
    <>
      <div className="w-full h-full p-4 flex flex-col gap-4 overflow-scroll">
        <div className="space-y-1 w-full">
          <div className=" flex flex-col gap-4 md:flex-row">
		  <AddCards icon={<PiWaveSineFill />} title="Phase 1" bgColor="#62b2cd" />


            <div className="bg-white xl:h-32 h-20 md:w-[300px]  sm:w-auto rounded grid grid-cols-1 gap-2 mb-1">
      <ReactApexChart options={options} series={[phase1voltage]} type="radialBar" />
    </div>
            <AddCards
              icon={<PiWaveSineFill />}
              title="Current"
              count={phase1current}
			  unit="A"
            />
            <AddCards icon={<SiPowerbi />} title="Power" count={phase1power} unit="KW" />
            <AddCards
              icon={<BsLightningCharge />}
              title="Energy"
              count={phase1energy}
			  unit="kw/h"
            />
            <AddCards
              icon={<GiLightningFrequency />}
              title="Frequency"
              count={phase1frequency}
			  unit="Hz"
            />

            <AddCards
              icon={<TbGeometry />}
              title="Power_Factor	"
              count={phase1power_factor}
			  unit="Pf"
            />
          </div>
          <div className=" flex flex-col gap-4 md:flex-row ">
            <AddCards icon={<PiWaveSineFill />} title="Phase 2" bgColor="#62b2cd" />
            <div className="bg-white xl:h-32 h-20 md:w-[300px] sm:w-auto rounded grid grid-cols-1 gap-2 mb-1">
              <ReactApexChart
                options={options}
                series={[phase2voltage]}
                type="radialBar"
              />
            </div>

            <AddCards
              icon={<PiWaveSineFill />}
              title="Current"
              count={phase2current}
			  unit="A"
            />
            <AddCards icon={<SiPowerbi />} title="Power" count={phase2power}unit="KW" />
            <AddCards
              icon={<BsLightningCharge />}
              title="Energy"
              count={phase2energy}
			  unit="kw/h"
            />
            <AddCards
              icon={<GiLightningFrequency />}
              title="Frequency"
              count={phase2frequency}
			  unit="Hz"
            />

            <AddCards
              icon={<TbGeometry />}
              title="Power_Factor"
              count={phase2power_factor}
			  unit="Pf"
            />
          </div>
          <div className=" flex flex-col gap-4 md:flex-row">
            <AddCards icon={<PiWaveSineFill />} title="Phase 3" bgColor="#62b2cd" />
            <div className="bg-white xl:h-32 h-20 xl:w-[300px] md:w-auto rounded grid grid-cols-1 gap-2 mb-1">
              <ReactApexChart
                options={options}
                series={[phase3voltage]}
                type="radialBar"
              />
            </div>
            <AddCards
              icon={<PiWaveSineFill />}
              title="Current"
              count={phase3current}
			  unit="A"
            />
            <AddCards icon={<SiPowerbi />} title="Power" count={phase3power}unit="KW" />
            <AddCards
              icon={<BsLightningCharge />}
              title="Energy"
              count={phase3energy}
			  unit="kw/h"
            />
            <AddCards
              icon={<GiLightningFrequency />}
              title="Frequency"
              count={phase3frequency}
			  unit="Hz"
            />

            <AddCards
              icon={<TbGeometry />}
              title="Power_Factor"
              count={phase3power_factor}
			  unit="Pf"

            />
          </div>
		  <div className="flex flex-col gap-4  md:flex-row">
            <AddCards icon={<PiWaveSineFill />}  title="three Phase"bgColor="#62b2cd"  />
            <div className="bg-white xl:h-32 h-20  md:w-[300px] sm:w-auto rounded grid grid-cols-1  mb-1">
              <ReactApexChart
                options={options}
                series={[threephasevoltage]}
                type="radialBar"
              />
            </div>
            <AddCards
              icon={<PiWaveSineFill />}
              title="Current"
              count={phase1current}
			  unit="A"
            />
            <AddCards
			 icon={<SiPowerbi />}
			  title="Active-Power" 
			   count={phase1power}
			    unit="KW" />
          
			 {/* <div className="flex space-x-4"> */}
			 <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
    <div className="flex flex-col gap-3">
        <SplitCards
            icon={<BsLightningCharge />}
            title="Apparent-Power"
            count={apparent}
            unit="KVA"
        />
        <SplitCards
            icon={<BsLightningCharge />}
            title="Reactive-Power"
            count={reactive}
            unit="KVAR"
        />
    </div>
    <div className="flex flex-col gap-3">
        <SplitCards
            icon={<BsLightningCharge />}
            title="Frequency"
            count={frequency}
            unit="Hz"
        />
        <SplitCards
            icon={<BsLightningCharge />}
            title="Power-Factor"
            count={powerfactor}
            unit="pf"
        />
    </div>
</div>

<AddCards
        icon={<BsLightningCharge />}
        title="Energy"
        count={phase1energy}
        unit="kw/h"
    />
        {/* </div> */}
		
            {/* <AddCards
              icon={<GiLightningFrequency />}
              title="frequency"
              count={phase1frequency}
			  unit="Hz"
            /> */}
{/* 
            <AddCards
              icon={<TbGeometry />}
              title="power_factor	"
              count={phase1power_factor}
			  unit="Pf"
            /> */}
          </div>
        </div>
		
		<div className="flex flex-col items-center justify-center">
  <div className="w-full flex flex-col lg:flex-row gap-4 pl-2 pr-2">
    <div className="flex flex-col items-center bg-white p-3 rounded-md shadow-md  md:w-full sm:w-auto">
      <FaCalendarDay className="text-2xl mb-2 text-blue-500" />
      <h3 className="text-xl font-semibold">Today’s Usage</h3>
      <p className="text-lg">{todayUsage} kWh</p>
    </div>
    <div className="flex flex-col items-center bg-white p-3 rounded-md shadow-md md:w-full sm:w-auto">
      <FaCalendarAlt className="text-2xl mb-2 text-green-500" />
      <h3 className="text-xl font-semibold">This Month’s Usage</h3>
      <p className="text-lg">{monthlyUsage} kWh</p>
    </div>
    <div className="flex flex-col items-center bg-white p-3 rounded-md shadow-md  md:w-full sm:w-auto">
      <BsLightningCharge className="text-2xl mb-2 text-red-500" />
      <h3 className="text-xl font-semibold">Generator Usage</h3>
      <p className="text-lg">Usage: 123.45 kWh</p> {/* Dummy data */}
    </div>
  </div>
</div>


<div className="w-full">
  <ReactApexChart
    options={chartData.options}
    series={chartData.series}
    type="bar"
    height={400} // Increase the height for a larger chart view
  />
</div>

        <div id="html-dist"></div>
      </div>
    </>
  );
};

export default AdminDashBoard;
