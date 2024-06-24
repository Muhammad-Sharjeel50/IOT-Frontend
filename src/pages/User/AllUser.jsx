import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { API_URL } from '../../Apiurl';

dayjs.extend(isBetween);

const itemsPerPage = 24;

export default function AllUser() {
  const endPoint = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [timeRange, setTimeRange] = useState(0);
  const device_id = localStorage.getItem("device_id");
  const fetchDatas = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/api/sensors/data/${device_id}`
    );
      const data = response.data;
      console.log("Fetched Data:", data[0].three_phase);

      if (data.length > 0) {
        setData(data[0].three_phase);
        filterDataByTimeRange(data[0].three_phase, timeRange);
      } else {
        console.warn("No data available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  useEffect(() => {
    filterDataByTimeRange(data, timeRange);
  }, [data, timeRange]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleTimeRangeChange = (event) => {
    const selectedRange = parseInt(event.target.value);
    setTimeRange(selectedRange);
    filterDataByTimeRange(data, selectedRange);
  };

  const filterDataByTimeRange = (data, range) => {
    const now = dayjs();
    let startDate, endDate;

    if (range === 0) {
      // Today
      startDate = now.startOf("day");
      endDate = now.endOf("day");
    } else {
      startDate = now.subtract(range, "day").startOf("day");
      endDate = now.subtract(1, "day").endOf("day");
    }

    const filtered = data.filter((item) =>
      dayjs(item.reading_date).isBetween(startDate, endDate, null, "[]")
    );
    filterDataByHours(filtered);
  };

  const filterDataByHours = (data) => {
    const hourlyData = {};
  
    for (let i = 0; i < 24; i++) {
      const hour = String(i).padStart(2, "0");
      hourlyData[hour] = {
        reading_date: "",
        reading_time: hour,
        voltage: 0,
        current: 0,
        power: 0,
        energy: 0,
        frequency: 0,
        power_factor: 0,
        reactive_power: 0,
        apparent_power: 0,
        voltageCount: 0,
        currentCount: 0,
        powerCount: 0,
        energyCount: 0,
        frequencyCount: 0,
        powerFactorCount: 0,
        reactivePowerCount: 0,
        apparentPowerCount: 0,
        count: 0,
      };
    }
  
    data.forEach((item) => {
      const date = dayjs(item.reading_date).format("YYYY-MM-DD");
      const hour = item.reading_time.split(":")[0];
  
      if (!hourlyData[hour].reading_date) {
        hourlyData[hour].reading_date = date;
      }
  
      if (item.voltage !== 0) {
        hourlyData[hour].voltage += item.voltage;
        hourlyData[hour].voltageCount += 1;
      }
      if (item.current !== 0) {
        hourlyData[hour].current += item.current;
        hourlyData[hour].currentCount += 1;
      }
      if (item.power !== 0) {
        hourlyData[hour].power += item.power;
        hourlyData[hour].powerCount += 1;
      }
      if (item.energy !== 0) {
        hourlyData[hour].energy += item.energy;
        hourlyData[hour].energyCount += 1;
      }
      if (item.frequency !== 0) {
        hourlyData[hour].frequency += item.frequency;
        hourlyData[hour].frequencyCount += 1;
      }
      if (item.power_factor !== 0) {
        hourlyData[hour].power_factor += item.power_factor;
        hourlyData[hour].powerFactorCount += 1;
      }
      if (item.reactive_power !== 0) {
        hourlyData[hour].reactive_power += item.reactive_power;
        hourlyData[hour].reactivePowerCount += 1;
      }
      if (item.apparent_power !== 0) {
        hourlyData[hour].apparent_power += item.apparent_power;
        hourlyData[hour].apparentPowerCount += 1;
      }
      hourlyData[hour].count += 1;
    });
  
    const averagedData = Object.values(hourlyData)
      .map((hour) => ({
        reading_date: hour.reading_date,
        reading_time: hour.reading_time,
        voltage: hour.voltageCount ? hour.voltage / hour.voltageCount : 0,
        current: hour.currentCount ? hour.current / hour.currentCount : 0,
        power: hour.powerCount ? ((hour.power / hour.powerCount)/1000): 0,
        energy: hour.energyCount ? hour.energy / hour.energyCount : 0,
        frequency: hour.frequencyCount ? hour.frequency / hour.frequencyCount : 0,
        power_factor: hour.powerFactorCount ? hour.power_factor / hour.powerFactorCount : 0,
        reactive_power: hour.reactivePowerCount ? hour.reactive_power / hour.reactivePowerCount : 0,
        apparent_power: hour.apparentPowerCount ? hour.apparent_power / hour.apparentPowerCount : 0,
      }))
      .sort((a, b) => a.reading_time.localeCompare(b.reading_time));
  
    setFilteredData(averagedData);
    console.log("averagedData",averagedData)
    setCurrentPage(0); // Reset to the first page after filtering
  };
  

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="xl:h-full flex flex-col md:px-8 lg:px-16 p-4">
    <div className="flex-grow mt-8 md:mt-16">
      <div className="rounded-lg xl:p-4 p-2 bg-white">
        <h1 className="text-xl font-bold mx-auto text-center mb-4">
          Three Phase Data
        </h1>
        <div className="my-4 flex xl:justify-center justify-start">
          <label htmlFor="timeRange" className="mr-2">
            <span className="xl:block hidden">Select Time Range:</span>
          </label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="p-2 border rounded"
          >
            <option value={0}>Today</option>
            <option value={1}>Last 1 Day</option>
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>
        </div>
        <div className="max-w-full overflow-x-auto table-container">
      <div className="overflow-y-auto max-h-[42rem]">
        <table className="min-w-full text-center text-black font-medium mt-2 hidden sm:table">
          <thead className="bg-[#3E97CF] sticky top-0 z-10 text-white">
            <tr>
              <th className="border px-2 md:px-4 py-2">Sno</th>
              <th className="border px-2 md:px-4 py-2">Date</th>
              <th className="border px-2 md:px-4 py-2">Hour</th>
              <th className="border px-2 md:px-4 py-2">Voltage</th>
              <th className="border px-2 md:px-4 py-2">Current</th>
              <th className="border px-2 md:px-4 py-2">Power</th>
              <th className="border px-2 md:px-4 py-2">Energy</th>
              <th className="border px-2 md:px-4 py-2">Frequency</th>
              <th className="border px-2 md:px-4 py-2">Power Factor</th>
              <th className="border px-2 md:px-4 py-2 hidden sm:table-cell hidden-sm">Reactive Power</th>
              <th className="border px-2 md:px-4 py-2 hidden sm:table-cell hidden-sm">Apparent Power</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentPageData.map((item, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="border px-2 md:px-4 py-2">{index + 1 + offset}</td>
                <td className="border px-2 md:px-4 py-2">{item.reading_date || "--"}</td>
                <td className="border px-2 md:px-4 py-2">{item.reading_time}</td>
                <td className="border px-2 md:px-4 py-2">{item.voltage.toFixed(2)}</td>
                <td className="border px-2 md:px-4 py-2">{item.current.toFixed(2)}</td>
                <td className="border px-2 md:px-4 py-2">{item.power.toFixed(2)}</td>
                <td className="border px-2 md:px-4 py-2">{item.energy.toFixed(2)}</td>
                <td className="border px-2 md:px-4 py-2">{item.frequency.toFixed(2)}</td>
                <td className="border px-2 md:px-4 py-2">{item.power_factor.toFixed(2)}</td>
                <td className="border px-2 md:px-4 py-2 hidden sm:table-cell hidden-sm">{item.reactive_power.toFixed(2)}</td>
                <td className="border px-2 md:px-4 py-2 hidden sm:table-cell hidden-sm">{item.apparent_power.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="block sm:hidden">
          {currentPageData.map((item, index) => (
            <div key={index} className="border p-4 mb-2 bg-white">
              <p><strong>Sno:</strong> {index + 1 + offset}</p>
              <p><strong>Date:</strong> {item.reading_date || "--"}</p>
              <p><strong>Hour:</strong> {item.reading_time}</p>
              <p><strong>Voltage:</strong> {item.voltage.toFixed(2)}</p>
              <p><strong>Current:</strong> {item.current.toFixed(2)}</p>
              <p><strong>Power:</strong> {item.power.toFixed(2)}</p>
              <p><strong>Energy:</strong> {item.energy.toFixed(2)}</p>
              <p><strong>Frequency:</strong> {item.frequency.toFixed(2)}</p>
              <p><strong>Power Factor:</strong> {item.power_factor.toFixed(2)}</p>
              <p className="hidden-sm"><strong>Reactive Power:</strong> {item.reactive_power.toFixed(2)}</p>
              <p className="hidden-sm"><strong>Apparent Power:</strong> {item.apparent_power.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center mt-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link px-3 py-1 border rounded mx-1"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link px-3 py-1 border rounded mx-1"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link px-3 py-1 border rounded mx-1"}
        activeClassName={"active"}
        activeLinkClassName={"bg-blue-500 text-white"}
      />
    </div>
  </div>
  );
}
