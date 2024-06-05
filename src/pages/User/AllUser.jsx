import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const itemsPerPage = 30;

export default function AllUser({ isAdmin, setUsers }) {
    const endPoint = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const [data, setData] = useState([]); // State to hold the fetched data
    const [filteredData, setFilteredData] = useState([]); // State to hold the filtered data
    const [currentPage, setCurrentPage] = useState(0); // State to handle pagination
    const [timeRange, setTimeRange] = useState(0); // Default time range to Today

    const fetchDatas = async () => {
        try {
            const response = await axios.get(
                "http://192.168.137.105:5000/api/sensors/data/08:F9:E0:5F:AC:66"
            );
            const data = response.data;
            console.log("Fetched Data:", data[0].three_phase);

            if (data.length > 0) {
                setData(data[0].three_phase);
                filterDataByTimeRange(data[0].three_phase, timeRange); // Filter the data initially
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
    }

    const handleTimeRangeChange = (event) => {
        const selectedRange = parseInt(event.target.value);
        setTimeRange(selectedRange);
        filterDataByTimeRange(data, selectedRange);
    }

    const filterDataByTimeRange = (data, range) => {
        const now = dayjs();
        let startDate, endDate;

        if (range === 0) { // Today
            startDate = now.startOf('day');
            endDate = now.endOf('day');
        } else {
            startDate = now.subtract(range, 'day').startOf('day');
            endDate = now.subtract(1, 'day').endOf('day');
        }

        const filtered = data.filter(item => dayjs(item.reading_date).isBetween(startDate, endDate, null, '[]'));
        setFilteredData(filtered);
        setCurrentPage(0); // Reset to the first page after filtering
    }

    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredData.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="h-full flex flex-col">
            <div className="flex-grow overflow-x-auto mt-16">
                <div className="shadow-2xl rounded-lg p-4 bg-white">
                    <h1 className="text-xl font-bold mx-auto text-center mb-4">Three Phase Data</h1>
                    <div className="my-4 flex justify-center">
                        <label htmlFor="timeRange" className="mr-2">Select Time Range:</label>
                        <select id="timeRange" value={timeRange} onChange={handleTimeRangeChange} className="p-2 border rounded">
                            <option value={0}>Today</option>
                            <option value={1}>Last 1 Day</option>
                            <option value={7}>Last 7 Days</option>
                            <option value={30}>Last 30 Days</option>
                            <option value={90}>Last 90 Days</option>
                        </select>
                    </div>
                    <div className="overflow-y-auto max-h-[40rem]">
                        <table className="min-w-full text-center text-black font-medium border-collapse mt-2">
                            <thead className="bg-[#3E97CF] sticky top-0 z-10 text-white">
                                <tr>
                                    <th className="border px-2 md:px-4 py-2">Sno</th>
                                    <th className="border px-2 md:px-4 py-2">Date</th>
                                    <th className="border px-2 md:px-4 py-2">Voltage</th>
                                    <th className="border px-2 md:px-4 py-2">Current</th>
                                    <th className="border px-2 md:px-4 py-2">Power</th>
                                    <th className="border px-2 md:px-4 py-2">Energy</th>
                                    <th className="border px-2 md:px-4 py-2">Frequency</th>
                                    <th className="border px-2 md:px-4 py-2">Power Factor</th>
                                    <th className="border px-2 md:px-4 py-2">Reactive Power</th>
                                    <th className="border px-2 md:px-4 py-2">Apparent Power</th>
                                    <th className="border px-2 md:px-4 py-2">Generator Usage</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {currentPageData.map((item, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-gray-100">
                                        <td className="border px-2 md:px-4 py-2">{index + 1 + offset}</td>
                                        <td className="border px-2 md:px-4 py-2">{item.reading_date}</td>
                                        <td className="border px-2 md:px-4 py-2">{item.voltage.toFixed(2)}</td>
                                        <td className="border px-2 md:px-4 py-2">{item.current.toFixed(2)}</td>
                                        <td className="border px-2 md:px-4 py-2">{item.power.toFixed(2)}</td>
                                        <td className="border px-2 md:px-4 py-2">{item.energy.toFixed(2)}</td>
                                        <td className="border px-2 md:px-4 py-2">{item.frequency.toFixed(2)}</td>
                                        <td className="border px-2 md:px-4 py-2">{item.power_factor.toFixed(2)}</td>
                                        <td className="border px-2 md:px-4 py-2">{item.reactive_power.toFixed(2)}</td>
                                        <td className="border px-2 md:px-4 py-2">{item.apparent_power.toFixed(2)}</td>
                                        <td className="border px-2 md:px-4 py-2">{item.generator_usage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
