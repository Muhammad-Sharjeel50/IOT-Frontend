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
import { API_URL } from "../../Apiurl";
import Swal from 'sweetalert2'
import { useMediaQuery } from 'react-responsive';

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
  const [phase3current, setCurrentphase3] = useState([]);
  const [phase3energy, setEnergyphase3] = useState([]);
  const [phase3frequency, setFrequencyphase3] = useState([]);
  const [phase3power, setPowerphase3] = useState([]);
  const [phase3power_factor, setPower_factorphase3] = useState([]);
  const [phase3voltage, setVoltagephase3] = useState([]);
  const [apparent, setApparent] = useState([]);
  const [reactive, setReactive] = useState([]);
  const [threephasevoltage, setThreephasevoltage] = useState([]);
  const [frequency, setFrequency] = useState([]);
   const[ThreephasePower, setThreephasepower] = useState([]);
   const [threephaseenergy, setThreePhaseenergy ]= useState([]);
  const [powerfactor, setPowerfactor] = useState([]);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear(); // Ensure this is not declared elsewhere
  const month = String(currentMonth).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;
  const device_id = localStorage.getItem("device_id");
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/sensors/data/${device_id}`
      );
      const data = response.data;
      if (data.length > 0) {
        const lastIndex = data.length - 1;
        const latestData = data[lastIndex];
        let showAlert = false;
        
        if (latestData.phase1 && latestData.phase1.length > 0) {
          const lastIndexPhase1 = latestData.phase1.length - 1;
          const phase1Data = latestData.phase1[lastIndexPhase1];

          setCurrentphase1(phase1Data.current.toFixed(3));
          setEnergyphase1(phase1Data.energy.toFixed(3));
          setFrequencyphase1(phase1Data.frequency.toFixed(2));
          setPowerphase1((phase1Data.power / 1000).toFixed(3));

          setPower_factorphase1(phase1Data.power_factor.toFixed(2));
         const  phase1voltage = parseFloat(phase1Data.voltage.toFixed(2));
         setVoltagephase1(phase1Data.voltage.toFixed(2))
         console.log("Phase 1 Voltage:", phase1voltage);
         if (phase1voltage < 50) {
          showAlert = true; 
        }
        else if(phase1voltage <150){
          showAlert = true; 
          
        }
      } else {
        console.warn("No phase1 data available");
      
        } 

        if (latestData.phase2 && latestData.phase2.length > 0) {
          const lastIndexPhase2 = latestData.phase2.length - 1;
          const phase2Data = latestData.phase2[lastIndexPhase2];

          setCurrentphase2(phase2Data.current.toFixed(3));
          setEnergyphase2(phase2Data.energy.toFixed(3));
          setFrequencyphase2(phase2Data.frequency.toFixed(2));
          setPowerphase2((phase2Data.power / 1000).toFixed(3));
          setPower_factorphase2(phase2Data.power_factor.toFixed(2));
          const phase2voltage = parseFloat(phase2Data.voltage.toFixed(2));
          setVoltagephase2(phase2Data.voltage.toFixed(2))
         console.log("Phase 2 Voltage:", phase2voltage);

        if (phase2voltage < 50) {
          showAlert = true;
        }
        else if(phase2voltage < 150){
          showAlert = true;
        }

        }

        if (latestData.phase3 && latestData.phase3.length > 0) {
          const lastIndexPhase3 = latestData.phase3.length - 1;
          const phase3Data = latestData.phase3[lastIndexPhase3];

          setCurrentphase3(phase3Data.current.toFixed(3));
          setEnergyphase3(phase3Data.energy.toFixed(3));
          setFrequencyphase3(phase3Data.frequency.toFixed(2));
          setPowerphase3((phase3Data.power / 1000).toFixed(3));
          setPower_factorphase3(phase3Data.power_factor.toFixed(2));
          const phase3voltage = parseFloat(phase3Data.voltage.toFixed(2));
          setVoltagephase3(phase3Data.voltage.toFixed(2))
          console.log("Phase 3 Voltage:", phase3voltage);
          if (phase3voltage < 50) {
            showAlert = true;
          }
          else if(phase3voltage < 150){
            showAlert = true;
          }
          if (showAlert) {
            Swal.fire({
              icon: 'error',
              text: 'Voltage of at least one phase is less than 150  Voltage is Dim Or Occured!',
              showCloseButton: true,
            });
          }   

        }

        if (latestData.three_phase && latestData.three_phase.length > 0) {
          const latestThreePhaseData =
            latestData.three_phase[latestData.three_phase.length - 1];

          setApparent(latestThreePhaseData.apparent_power.toFixed(3));
          setReactive(latestThreePhaseData.reactive_power.toFixed(3));
          setThreephasevoltage(latestThreePhaseData.voltage.toFixed(2));
          setFrequency(latestThreePhaseData.frequency.toFixed(2));
          setPowerfactor(latestThreePhaseData.power_factor.toFixed(2));
           setThreephasepower(latestThreePhaseData.power.toFixed(2))
           setThreePhaseenergy(latestThreePhaseData.energy.toFixed(2))
        } else {
          console.warn("No three_phase data available");
        }
    
      } else {
        console.warn("No data available");
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  const options = {
    chart: {
      type: "radialBar",
      offsetY: -20,
      width: "100%",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
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
            fontSize: "22px",
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
      type: "gradient",
      gradient: {
        shade: "blue",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    colors: ["#00008B"],
    labels: ["Average Results"],
  };

  // Add this media query for small screens
  if (window.innerWidth <= 640) {
    // Adjust the breakpoint as needed
    options.plotOptions.radialBar.track.marginTop = 20; // Override margin top for small screens
  }

  const [chartData, setChartData] = useState({
    series: [
      // { name: "Time", },
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
        max: 10,
        title: {
          text: "Energy (kWh)",
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
            return `${val.toFixed(2)} kWh`;
          },
        },
      },
    },
  });

  const fetchDatas = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/sensors/data/${device_id}`
      );
      const data = response.data;
  
      const filterAndSumPower = (phaseData) => {
        const filteredData = phaseData.filter(
          (item) => item.reading_date === todayDate
        );
        const powerData = Array(24).fill(0);
        const zeroCountData = Array(24).fill(0);
  
        filteredData.forEach((item) => {
          const hour = parseInt(item.reading_time.split(":")[0]);
          const powerValue =item.power;
          if (powerValue !== 0) {
            powerData[hour] += powerValue;
          } else {
            zeroCountData[hour]++;
          }
        });
  
        const averagePowerData = powerData.map((sum, index) => {
          const validMinutes = 60 - zeroCountData[index];
          console.log("validminutes::",validMinutes)
          return validMinutes === 0 ? 0 : ((sum / validMinutes)/1000);
        });
        return averagePowerData;
      };
  
      if (data.length > 0) {
        const powerDataPhase1 = filterAndSumPower(data[0].phase1);
        const powerDataPhase2 = filterAndSumPower(data[0].phase2);
        const powerDataPhase3 = filterAndSumPower(data[0].phase3);
        const three_phaseData = filterAndSumPower(data[0].three_phase);
        console.log("powerDataPhase1",powerDataPhase1)
        setChartData((prevState) => ({
          ...prevState,
          series: [
            { name: "Phase 1", data: powerDataPhase1 },
            { name: "Phase 2", data: powerDataPhase2 },
            { name: "Phase 3", data: powerDataPhase3 },
            { name: "Three Phase", data: three_phaseData },
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
      const response = await axios.get(`${API_URL}/api/sensors/data/${device_id}`);
      const data = response.data;
  
      let totalDailyAveragePower = 0;
      let totalMonthlyAveragePower = 0;
  
      // Function to filter and sum power for a specific condition
      const filterAndSumPower = (phaseData, filterCondition) => {
        const powerData = Array(24).fill(0);
        const zeroCountData = Array(24).fill(0);
        let totalPower = 0;
        let validMinutes = 0;
  
        phaseData.forEach((item) => {
          if (filterCondition(item)) {
            const hour = parseInt(item.reading_time.split(":")[0]);
            const powerValue = item.power;
  
            if (powerValue !== 0) {
              powerData[hour] += powerValue;
              totalPower += powerValue;
              validMinutes++;
            } else {
              zeroCountData[hour]++;
            }
          }
        });
  
        // Calculate average power per hour
        const averagePowerData = powerData.map((sum, index) => {
          const validHourMinutes = 60 - zeroCountData[index];
          return validHourMinutes === 0 ? 0 : (sum / validHourMinutes) / 1000; // Convert to kW
        });
  
        // Calculate total average power for the day
        const dailyAveragePower = averagePowerData.reduce((acc, val) => acc + val, 0);
  
        return {
          dailyAveragePower,
          validMinutes,
        };
      };
  
      if (data.length > 0) {
        // Daily filter condition (current date)
        const dailyFilterCondition = (item) => item.reading_date === new Date().toISOString().split('T')[0];
        const threePhaseDaily = filterAndSumPower(data[0].three_phase, dailyFilterCondition);
  
        // Calculate total average power for daily usage
        totalDailyAveragePower = threePhaseDaily.dailyAveragePower;
  
        // Monthly filter condition (current month)
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
  
        let dailyAverages = [];
        for (let day = 1; day <= new Date().getDate(); day++) {
          const currentDate = new Date(currentYear, currentMonth - 1, day).toISOString().split('T')[0];
          const dailyFilterConditionForMonth = (item) => item.reading_date === currentDate;
          const threePhaseDailyForMonth = filterAndSumPower(data[0].three_phase, dailyFilterConditionForMonth);
          dailyAverages.push(threePhaseDailyForMonth.dailyAveragePower);
        }
  
        // Calculate total average power for monthly usage by summing daily averages
        totalMonthlyAveragePower = dailyAverages.reduce((acc, val) => acc + val, 0);
  
        // Display results or update state
        console.log(`Total average power consumed today: ${totalDailyAveragePower.toFixed(2)} kW`);
        console.log(`Total average power consumed this month: ${totalMonthlyAveragePower.toFixed(2)} kW`);
  
        // Update state with average values
        setMonthlyUsage(totalMonthlyAveragePower.toFixed(2));
        setTodayUsage(totalDailyAveragePower.toFixed(2));
      } else {
        console.warn("No data available");
      }
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  



  useEffect(() => {
    fetchData();
    fetchDatas();
    fetchDailyAndMonthlyData();
    // const intervalId = setInterval(() => {
    //   fetchData();
    //   fetchDatas();
    //   fetchDailyAndMonthlyData();
    // }, 30000); // 30 seconds interval

    // return () => {
    //   clearInterval(intervalId); // Clear interval on component unmount
    // };
  },
   []);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handlePhaseClick = (phase) => {
    setSelectedPhase(phase);
  };

  return (
    <>
      <div className="w-full h-full p-4 flex flex-col gap-4 overflow-scroll">


<div className="flex-grow bg-gray-100">
      {!isMobile ? (
        <div className="xl:grid md:grid none w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <div className="space-y-4">
            <AddCards
              icon={<PiWaveSineFill />}
              title="Phase 1"
              bgColor="xl:bg-[#ffffff]"
              smBgColor="bg-[#4B9CD3]"
              onClick={() => handlePhaseClick("phase1")}
            />
            <AddCards
              icon={<PiWaveSineFill />}
              title="Phase 2"
              bgColor="xl:bg-[#ffffff]"
              smBgColor="bg-[#118A99]"
              onClick={() => handlePhaseClick("phase2")}
            />
            <AddCards
              icon={<PiWaveSineFill />}
              title="Phase 3"
              bgColor="xl:bg-[#ffffff]"
              smBgColor="bg-[#FFF176]"
              onClick={() => handlePhaseClick("phase3")}
            />
            <AddCards
              icon={<PiWaveSineFill />}
              title="Three Phase"
              bgColor="xl:bg-[#ffffff]"
              smBgColor="bg-[#BA6C86]"
              onClick={() => handlePhaseClick("threephase")}
            />
          </div>
          <div className="col-span-2 space-y-4">
            <div style={{ background: '#fff', height: '132px', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <ReactApexChart
                options={options}
                series={[phase1voltage]}
                type="radialBar"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div style={{ background: '#fff', height: '132px', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <ReactApexChart
                options={options}
                series={[phase2voltage]}
                type="radialBar"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div style={{ background: '#fff', height: '132px', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <ReactApexChart
                options={options}
                series={[phase3voltage]}
                type="radialBar"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div style={{ background: '#fff', height: '132px', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <ReactApexChart
                options={options}
                series={[threephasevoltage]}
                type="radialBar"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
          <div className="space-y-4">
            <AddCards
              icon={<PiWaveSineFill />}
              title="Current"
              count={phase1current}
              unit="A"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#4B9CD3]"
            />
            <AddCards
              icon={<PiWaveSineFill />}
              title="Current"
              count={phase2current}
              unit="A"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#78A845]"
            />
            <AddCards
              icon={<PiWaveSineFill />}
              title="Current"
              count={phase3current}
              unit="A"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#FFF176]"
            />
            <AddCards
              icon={<PiWaveSineFill />}
              title="Current"
              count={phase1current}
              unit="A"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#BA6C86]"
            />
          </div>
          <div className="space-y-4">
            <AddCards
              icon={<SiPowerbi />}
              title="Power"
              count={phase1power}
              unit="Kw"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#4B9CD3]"
            />
            <AddCards
              icon={<SiPowerbi />}
              title="Power"
              count={phase2power}
              unit="Kw"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#78A845]"
            />
            <AddCards
              icon={<SiPowerbi />}
              title="Power"
              count={phase3power}
              unit="Kw"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#FFF176]"
            />
            <AddCards
              icon={<SiPowerbi />}
              title="Active-Power"
              count={phase1power}
              unit="Kw"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#BA6C86]"
            />
          </div>
          <div className="space-y-4">
            <AddCards
              icon={<BsLightningCharge />}
              title="Energy"
              count={phase1energy}
              unit="W/h"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#4B9CD3]"
            />
            <AddCards
              icon={<BsLightningCharge />}
              title="Energy"
              count={phase2energy}
              unit="W/h"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#78A845]"
            />
            <AddCards
              icon={<BsLightningCharge />}
              title="Energy"
              count={phase3energy}
              unit="W/h"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#FFF176]"
            />
            <AddCards
              icon={<BsLightningCharge />}
              title="Energy"
              count={phase1energy}
              unit="W/h"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#BA6C86]"
            />
          </div>
          <div className="space-y-4">
            <AddCards
              icon={<GiLightningFrequency />}
              title="Frequency"
              count={phase1frequency}
              unit="Hz"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#4B9CD3]"
            />
            <AddCards
              icon={<GiLightningFrequency />}
              title="Frequency"
              count={phase2frequency}
              unit="Hz"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#78A845]"
            />
            <AddCards
              icon={<GiLightningFrequency />}
              title="Frequency"
              count={phase3frequency}
              unit="Hz"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#FFF176]"
            />
            <SplitCards
              icon={<BsLightningCharge />}
              title="Frequency"
              count={frequency}
              unit="Hz"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#BA6C86]"
            />
            <SplitCards
              icon={<BsLightningCharge />}
              title="Apparent"
              count={apparent}
              unit="KVA"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#BA6C86]"
            />
          </div>
          <div className="space-y-4">
            <AddCards
              icon={<TbGeometry />}
              title="Power_Factor"
              count={phase1power_factor}
              unit="Pf"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#4B9CD3]"
            />
            <AddCards
              icon={<TbGeometry />}
              title="Power_Factor"
              count={phase2power_factor}
              unit="Pf"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#118A99]"
            />
            <AddCards
              icon={<TbGeometry />}
              title="Power_Factor"
              count={phase3power_factor}
              unit="Pf"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#FFF176]"
            />
            <SplitCards
              icon={<BsLightningCharge />}
              title="Power-Fa"
              count={powerfactor}
              unit="pf"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#BA6C86]"
            />
            <SplitCards
              icon={<BsLightningCharge />}
              title="Reactive"
              count={reactive}
              unit="KVAR"
              bgColor="lg:bg-[#ffffff]"
              smBgColor="bg-[#BA6C86]"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
   
            <>
              <AddCards
                icon={<PiWaveSineFill />}
                title="Phase 1"
                bgColor="bg-[#4B9CD3]"
              />
              <ReactApexChart
                options={options}
                series={[phase1voltage]}
                type="radialBar"
                style={{ background: '#C62828', height: "132px", borderRadius: "0.5rem", overflow: "hidden" }}
              />
              <AddCards
                icon={<PiWaveSineFill />}
                title="Current"
                count={phase1current}
                unit="A"
                bgColor="bg-[#4B9CD3]"
              />
              <AddCards
                icon={<SiPowerbi />}
                title="Power"
                count={phase1power}
                unit="Kw"
                bgColor="bg-[#4B9CD3]"
              />
              <AddCards
                icon={<BsLightningCharge />}
                title="Energy"
                count={phase1energy}
                unit="W/h"
                bgColor="bg-[#4B9CD3]"
              />
              <AddCards
                icon={<GiLightningFrequency />}
                title="Frequency"
                count={phase1frequency}
                unit="Hz"
                bgColor="bg-[#4B9CD3]"
              />
              <AddCards
                icon={<TbGeometry />}
                title="Power_Factor"
                count={phase1power_factor}
                unit="Pf"
                bgColor="bg-[#4B9CD3]"
              />
            </>
       
            <>
              <AddCards
                icon={<PiWaveSineFill />}
                title="Phase 2"
                bgColor="bg-[#118A99]"
              />
              <ReactApexChart
                options={options}
                series={[phase2voltage]}
                type="radialBar"
                style={{ background: '#78A845', height: "132px", borderRadius: "0.5rem", overflow: "hidden" }}
              />
              <AddCards
                icon={<PiWaveSineFill />}
                title="Current"
                count={phase2current}
                unit="A"
                bgColor="bg-[#118A99]"
              />
              <AddCards
                icon={<SiPowerbi />}
                title="Power"
                count={phase2power}
                unit="Kw"
                bgColor="bg-[#118A99]"
              />
              <AddCards
                icon={<BsLightningCharge />}
                title="Energy"
                count={phase2energy}
                unit="W/h"
                bgColor="bg-[#118A99]"
              />
              <AddCards
                icon={<GiLightningFrequency />}
                title="Frequency"
                count={phase2frequency}
                unit="Hz"
                bgColor="bg-[#118A99]"
              />
              <AddCards
                icon={<TbGeometry />}
                title="Power_Factor"
                count={phase2power_factor}
                unit="Pf"
                bgColor="bg-[#118A99]"
              />
            </>
        
            <>
              <AddCards
                icon={<PiWaveSineFill />}
                title="Phase 3"
                bgColor="bg-[#FFF176]"
              />
              <ReactApexChart
                options={options}
                series={[phase3voltage]}
                type="radialBar"
                style={{ background: '#FFF176', height: "132px", borderRadius: "0.5rem", overflow: "hidden" }}
              />
              <AddCards
                icon={<PiWaveSineFill />}
                title="Current"
                count={phase3current}
                unit="A"
                bgColor="bg-[#FFF176]"
              />
              <AddCards
                icon={<SiPowerbi />}
                title="Power"
                count={phase3power}
                unit="Kw"
                bgColor="bg-[#FFF176]"
              />
              <AddCards
                icon={<BsLightningCharge />}
                title="Energy"
                count={phase3energy}
                unit="W/h"
                bgColor="bg-[#FFF176]"
              />
              <AddCards
                icon={<GiLightningFrequency />}
                title="Frequency"
                count={phase3frequency}
                unit="Hz"
                bgColor="bg-[#FFF176]"
              />
              <AddCards
                icon={<TbGeometry />}
                title="Power_Factor"
                count={phase3power_factor}
                unit="Pf"
                bgColor="bg-[#FFF176]"
              />
            </>
   
            <>
              <AddCards
                icon={<PiWaveSineFill />}
                title="Three Phase"
                bgColor="bg-[#BA6C86]"
              />
              <ReactApexChart
                options={options}
                series={[threephasevoltage]}
                type="radialBar"
                style={{ background: '#BA6C86', height: "132px", borderRadius: "0.5rem", overflow: "hidden" }}
              />
              <AddCards
                icon={<SiPowerbi />}
                title="Active-Power"
                count={phase1power}
                unit="Kw"
                bgColor="bg-[#BA6C86]"
              />
              <AddCards
                icon={<BsLightningCharge />}
                title="Energy"
                count={threephaseenergy}
                unit="W/h"
                bgColor="bg-[#BA6C86]"
              />
              <AddCards
                icon={<GiLightningFrequency />}
                title="Frequency"
                count={frequency}
                unit="Hz"
                bgColor="bg-[#BA6C86]"
              />
              <SplitCards
                icon={<BsLightningCharge />}
                title="Apparent"
                count={apparent}
                unit="KVA"
                bgColor="bg-[#BA6C86]"
              />
              <SplitCards
                icon={<BsLightningCharge />}
                title="Power-Fa"
                count={powerfactor}
                unit="pf"
                bgColor="bg-[#BA6C86]"
              />
              <SplitCards
                icon={<BsLightningCharge />}
                title="Reactive"
                count={reactive}
                unit="KVAR"
                bgColor="bg-[#BA6C86]"
              />
            </>

        </div>
      )}
    </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full flex flex-col lg:flex-row gap-4 pl-2 pr-2">
            <div className="flex flex-col items-center bg-white rounded-lg p-3 rounded-md shadow-md  md:w-full sm:w-auto">
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