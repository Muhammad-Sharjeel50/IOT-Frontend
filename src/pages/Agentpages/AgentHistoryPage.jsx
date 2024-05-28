import React, { useMemo, useState } from 'react';
import moment from 'moment/moment'; // Move import statement to the top
import ReactPaginate from 'react-paginate';
const itemsPerPage = 10; // Number of items to display per page

export default function AgentHistoryPage({ filteredData, setUsers }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);
    
    const timeActive = localStorage.getItem('timer_Active Time');
    console.log('arrayData', timeActive);

    const calculateQueryHandlingTime = (time) => {
        if (time) {
            const [hoursStr, minutesStr] = time.split(':');
            const hours = parseInt(hoursStr, 10);
            const minutes = parseInt(minutesStr, 10);
            if (!isNaN(hours) || !isNaN(minutes)) {
                const formattedTime = [];
                if (hours > 0) {
                    formattedTime.push(`${hours}h`);
                }
                if (minutes >= 0) {
                    formattedTime.push(`${minutes}mins`);
                }
                return formattedTime.length > 0 ? formattedTime.join(' ') : '0 mins';
            } else {
                return 'Not available';
            }
        } else {
            return 'Not available';
        }
    };

    const formattedTime = calculateQueryHandlingTime(timeActive);
    console.log('formattedTime', formattedTime);
    const isDateInToday = (date) => {
        const today = new Date();
        const dateToCheck = new Date(date);
        return (
            dateToCheck.getDate() === today.getDate() &&
            dateToCheck.getMonth() === today.getMonth() &&
            dateToCheck.getFullYear() === today.getFullYear()
        );
    };
    const handleNameChange = (value, index) => {
        const newData = [...filteredData];
        newData[index].name = value;
        setUsers(newData);
    };
    const handleLoginChange = (value, index) => {
        const newData = [...filteredData];
        newData[index].loginTime = value;
        setUsers(newData);
    };
    const handlelogoutChange = (value, index) => {
        const newData = [...filteredData];
        newData[index].logoutTime = value;
        setUsers(newData);
    };

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const pageCount = Math.ceil(filteredData?.length / itemsPerPage);
    console.log("filterdataaaaaaa",filteredData)

    return (
        <div style={{ background: '#F4F4F5' }} className="h-full p-8">
            <div className="h-4/6  w-full overflow-scroll">
            <div className="activeagent rounded-lg bg-white shadow-lg mx-auto justify-start p-4">
                <h1 className="text-2xl font-bold">Agent History</h1>
                <table className="table-auto text-left w-full mt-8 border-collapse h-52 font-medium">
                    <thead className="bg-[#3E97CF] h-10">
                        <tr className="border rounded-lg h-full">
                            <th className="border px-4 text-white">Name</th>
                            <th className="border px-4 text-white">LoginTime</th>
                            <th className="border px-4 text-white">LogoutTime</th>
                            <th className="border pl-4 text-white">Last Query Answer Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData
                            ?.slice(
                                currentPage * itemsPerPage,
                                (currentPage + 1) * itemsPerPage
                            )
                            .map((val, index) => (
                                <React.Fragment key={index}>
                                    <tr className="border">
                                        <td className="border pl-5 py-1">{val.name}</td>
                                        <td className="border pl-5 py-1">{moment(val.login_time).format('LLL')}</td>
                                        <td className="border pl-5 py-1">{moment(val.logout_time).format('LLL')}</td>
                                        <td className="border pl-5 py-1"> {moment.duration(moment(val.logout_time).diff(moment(val.login_time))).humanize()}</td>
                                    </tr>
                                    {expandedRowIndex === index && (
                                        <tr key={`${index}-edit`} className="border">
                                            <td colSpan="2" className="border pl-5 py-1">
                                                <input
                                                    type="text"
                                                    value={val.name}
                                                    onChange={(e) => handleNameChange(e.target.value, index)}
                                                />
                                            </td>
                                            <td colSpan="2" className="border pl-5 py-1">
                                                <input
                                                    type="text"
                                                    value={val.loginTime}
                                                    onChange={(e) => handleLoginChange(e.target.value, index)}
                                                />
                                            </td>
                                            <td colSpan="2" className="border pl-5 py-1">
                                                <input
                                                    type="text"
                                                    value={val.logoutTime}
                                                    onChange={(e) => handlelogoutChange(e.target.value, index)}
                                                />
                                            </td>
                                            <td colSpan="2" className="border pl-5 py-1">{calculateQueryHandlingTime(val.AnswerTime)}</td>
                                            <td className="pl-8 justify-center py-2 flex"></td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                    </tbody>
                </table>
            </div>
            </div>
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName={'pagination-container'}
                previousLinkClassName={'previous-link'}
                nextLinkClassName={'next-link'}
                disabledClassName={'disabled'}
                activeClassName={'active'}
                className="flex flex-wrap mx-auto h-1/5 w-full justify-center py-1 items-center"
            />
        </div>
    );
}
