
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
  setTimeout(() => {
    fetchData();
  }, 1000);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.137.105:5000/api/sensors/data/C8:C9:A3:C8:AE:60"
      );
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
      console.error("Error fetching sensor data:", error);
    }
  };

  const options = {
    chart: {
      type: "radialBar",
      offsetY: -20,
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
              return val + "V";
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
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["Average Results"],
  };

  const [chartData, setChartData] = useState({
    series: [
      { name: "Phase 1", data: Array.from({ length: 24 }, () => 0) },
      { name: "Phase 2", data: Array.from({ length: 24 }, () => 0) },
      { name: "Phase 3", data: Array.from({ length: 24 }, () => 0) },
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
        min: 0, // Set the minimum value for y-axis
        max: 100, // Set the maximum value for y-axis
        title: {
          text: "Power (kW)",
        },
        labels: {
          formatter: function (val) {
            return Math.round(val); // Ensure y-axis labels are whole numbers
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${Math.round(val)} kW`; // Ensure tooltip values are whole numbers
          },
        },
      },
    },
  });

  const fetchDatas = async () => {
    try {
      const response = await axios.get(
        "http://192.168.137.105:5000/api/sensors/data/C8:C9:A3:C8:AE:60"
      );
      const data = response.data;
      const filterAndSumPower = (phaseData) => {
        const filteredData = phaseData.filter(
          (item) => item.reading_date === "2024-05-29"
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
        console.log("In");
        const powerDataPhase1 = filterAndSumPower(data[0].phase1);
        const powerDataPhase2 = filterAndSumPower(data[0].phase2);
        const powerDataPhase3 = filterAndSumPower(data[0].phase3);
        console.log("powerDataPhase1", powerDataPhase1);
        setChartData((prevState) => ({
          ...prevState,
          series: [
            { name: "Phase 1", data: powerDataPhase1 },
            { name: "Phase 2", data: powerDataPhase2 },
            { name: "Phase 3", data: powerDataPhase3 },
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
        "http://192.168.137.105:5000/api/sensors/data/C8:C9:A3:C8:AE:60"
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
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const todayDate = `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;

        const monthlyFilterCondition = (item) =>
          new Date(item.reading_date).getMonth() + 1 === currentMonth;
        const dailyFilterCondition = (item) =>
          item.reading_date === "2024-05-29";

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
    fetchDatas();
    fetchDailyAndMonthlyData();
  }, []);

  return (
    <>
      <div className="space-y-2 w-full overflow-scroll">
        <div className="space-y-1 w-full">
          <div className=" py-1 px-2 flex space-x-2">
            <AddCards icon={<PiWaveSineFill />} title="Phase 1" />
            <div className="bg-white h-28 rounded grid grid-cols-1 gap-2 mb-1">
              <ReactApexChart
                options={options}
                series={[phase1voltage]}
                type="radialBar"
              />
            </div>
            <AddCards
              icon={<PiWaveSineFill />}
              title="Current"
              count={phase1current}
			  unit="A"
            />
            <AddCards icon={<SiPowerbi />} title="power" count={phase1power} unit="W" />
            <AddCards
              icon={<BsLightningCharge />}
              title="Energy"
              count={phase1energy}
			  unit="kw/h"
            />
            <AddCards
              icon={<GiLightningFrequency />}
              title="frequency"
              count={phase1frequency}
			  unit="Hz"
            />

            <AddCards
              icon={<TbGeometry />}
              title="power_factor	"
              count={phase1power_factor}
			  unit="Pf"
            />
          </div>
          <div className=" py-1 px-2 flex space-x-2 ">
            <AddCards icon={<PiWaveSineFill />} title="Phase 2" />
            <div className="bg-white h-28 rounded grid grid-cols-1 gap-2 mb-1">
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
            <AddCards icon={<SiPowerbi />} title="power" count={phase2power}unit="W" />
            <AddCards
              icon={<BsLightningCharge />}
              title="Energy"
              count={phase2energy}
			  unit="kw/h"
            />
            <AddCards
              icon={<GiLightningFrequency />}
              title="frequency"
              count={phase2frequency}
			  unit="Hz"
            />

            <AddCards
              icon={<TbGeometry />}
              title="power_factor"
              count={phase2power_factor}
			  unit="Pf"
            />
          </div>
          <div className=" py-1 px-2 flex space-x-2">
            <AddCards icon={<PiWaveSineFill />} title="Phase 3" />
            <div className="bg-white h-28 rounded grid grid-cols-1 gap-2 mb-1">
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
            <AddCards icon={<SiPowerbi />} title="power" count={phase3power}unit="W" />
            <AddCards
              icon={<BsLightningCharge />}
              title="Energy"
              count={phase3energy}
			  unit="kw/h"
            />
            <AddCards
              icon={<GiLightningFrequency />}
              title="frequency"
              count={phase3frequency}
			  unit="Hz"
            />

            <AddCards
              icon={<TbGeometry />}
              title="power_factor"
              count={phase3power_factor}
			  unit="Pf"

            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full gap-4 pl-2 pr-2 flex justify-between">
            <div className="flex w-full flex-col items-center bg-white p-3 rounded-md shadow-md">
              <FaCalendarDay className="text-2xl mb-2 text-blue-500" />
              <h3 className="text-xl font-semibold">Today’s Usage</h3>
              <p className="text-lg">{todayUsage} kWh</p>
            </div>
            <div className="flex w-full flex-col items-center bg-white p-3 rounded-md shadow-md">
              <FaCalendarAlt className="text-2xl mb-2 text-green-500" />
              <h3 className="text-xl font-semibold">This Month’s Usage</h3>
              <p className="text-lg">{monthlyUsage} kWh</p>
            </div>
            <div className="flex w-full flex-col items-center bg-white p-3 rounded-md shadow-md">
              <BsLightningCharge className="text-2xl mb-2 text-red-500" />
              <h3 className="text-xl font-semibold">Generator Usage</h3>
              <p className="text-lg">Usage: 123.45 kWh</p> {/* Dummy data */}
            </div>
          </div>
        </div>
        <div
          className="p-2 bg-white border-none rounded-md w-full  "
        >
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
