import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const itemsPerPage = 24;

export default function AllUser({ isAdmin, setUsers }) {
  const endPoint = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [timeRange, setTimeRange] = useState(0);

  const fetchDatas = async () => {
    try {
      const response = await axios.get(
        "http://192.168.137.105:5000/api/sensors/data/08:F9:E0:5F:AC:66"
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

    // Initialize all hours with empty values
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
        count: 0,
      };
    }

    data.forEach((item) => {
      const date = dayjs(item.reading_date).format("YYYY-MM-DD");
      const hour = item.reading_time.split(":")[0];

      if (!hourlyData[hour].reading_date) {
        hourlyData[hour].reading_date = date;
      }

      hourlyData[hour].voltage += item.voltage;
      hourlyData[hour].current += item.current;
      hourlyData[hour].power += item.power;
      hourlyData[hour].energy += item.energy;
      hourlyData[hour].frequency += item.frequency;
      hourlyData[hour].power_factor += item.power_factor;
      hourlyData[hour].reactive_power += item.reactive_power;
      hourlyData[hour].apparent_power += item.apparent_power;
      hourlyData[hour].count += 1;
    });

    const averagedData = Object.values(hourlyData)
      .map((hour) => ({
        reading_date: hour.reading_date,
        reading_time: hour.reading_time,
        voltage: hour.count ? hour.voltage / hour.count : 0,
        current: hour.count ? hour.current / hour.count : 0,
        power: hour.count ? hour.power / hour.count : 0,
        energy: hour.count ? hour.energy / hour.count : 0,
        frequency: hour.count ? hour.frequency / hour.count : 0,
        power_factor: hour.count ? hour.power_factor / hour.count : 0,
        reactive_power: hour.count ? hour.reactive_power / hour.count : 0,
        apparent_power: hour.count ? hour.apparent_power / hour.count : 0,
      }))
      .sort((a, b) => a.reading_time.localeCompare(b.reading_time));

    setFilteredData(averagedData);
    setCurrentPage(0); // Reset to the first page after filtering
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="xl:h-full xl:flex none flex-col md:px-8  lg:px-16">
      <div className="flex-grow mt-8 md:mt-16">
        <div className="rounded-lg xl:p-4 Kw pr-8 bg-white">
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
          <div className="max-w-full Kw">
            <div className="overflow-y-auto Kw max-h-[42rem]">
              <table className="min-w-full text-center text-black font-medium border-collapse mt-2">
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
                    <th className="border px-2 md:px-4 py-2">Reactive Power</th>
                    <th className="border px-2 md:px-4 py-2">Apparent Power</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 Kw">
                  {currentPageData.map((item, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-100">
                      <td className="border px-2 md:px-4 py-2">
                        {index + 1 + offset}
                      </td>
                      <td className="border px-2 md:px-4 py-2">
                        {item.reading_date || "--"}
                      </td>
                      <td className="border px-2 md:px-4 py-2">
                        {item.reading_time}
                      </td>
                      <td className="border px-2 md:px-4 py-2">
                        {item.voltage.toFixed(2)}
                      </td>
                      <td className="border px-2 md:px-4 py-2">
                        {item.current.toFixed(2)}
                      </td>
                      <td className="border px-2 md:px-4 py-2">
                        {item.power.toFixed(2)}
                      </td>
                      <td className="border px-2 md:px-4 py-2">
                        {item.energy.toFixed(2)}
                      </td>
                      <td className="border px-2 md:px-4 py-2">
                        {item.frequency.toFixed(2)}
                      </td>
                      <td className="border px-2 md:px-4 py-2">
                        {item.power_factor.toFixed(2)}
                      </td>
                      <td className="border px-2 md:px-4 py-2">
                        {item.reactive_power.toFixed(2)}
                      </td>
                      <td className="border px-2 md:px-4 py-2">
                        {item.apparent_power.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
