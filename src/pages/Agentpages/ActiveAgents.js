import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const ActiveAgents = ({ isAdmin, filteredData, setUsers }) => {
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
        "http://34.224.21.199:5000/api/sensors/data/C8:C9:A3:C8:AE:60"
      );
      const data = response.data;
 console.log("dataaaaaaaaaaaaa",data)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [viewMode, setViewMode] = useState("");

  useEffect(() => {
    fetchDatas()
    // fetchData(viewMode);
  }, []);


  const handleViewModeChange = (e) => {
    setViewMode(e.target.value);
  };

  return (
    <div style={{ background: "#F4F4F5" }} className="h-full w-full p-8">
      <div className="activeagent rounded-lg bg-white shadow-lg mx-auto justify-start p-4">
        <h1 className="text-2xl font-bold">Graphs</h1>
        <div className="mb-4">
          <label htmlFor="viewMode" className="mr-2">
            Select View Mode:
          </label>
          <select
            id="viewMode"
            value={viewMode}
            onChange={handleViewModeChange}
            className="border rounded p-1"
          >
            <option value="7days">7 Days</option>
            <option value="month">30 days</option>
            <option value="days">90 days</option>

          </select>
        </div>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={400}
        />
      </div>
    </div>
  );
};

export default ActiveAgents;
