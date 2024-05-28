import React, { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import moment from 'moment/moment'
import { useNavigate } from "react-router-dom";

const itemsPerPage = 10; // Number of items to display per page

const ActiveAgents = ({ isAdmin, filteredData, setUsers }) => {
  const [data, setData] = useState([]);
  const [logoutData, setLogoutData] = useState([]);
  const [mergedData, setMergedData] = useState([]); // State variable for merged data
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const endPoint = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchLogoutData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${endPoint}:8000/core/user/`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchLogoutData = async () => {
    try {
      const response = await axios.get(`http://${endPoint}:8000/core/total-time-logged-in/`);
      setLogoutData(response.data.user_sessions);
    } catch (error) {
      console.error('Error fetching logout data:', error);
    }
  }
       
  useEffect(() => {
    // Merge user data with logout time
    const mergedData = data.map(user => {
      const logoutRecord = logoutData.find(record => record.name === user.name);
      return {
        ...user,
        logout_time: logoutRecord ? moment(logoutRecord.logout_time).format('LLL') : "N/A"
      };
    });
    setMergedData(mergedData);
  }, [data, logoutData]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  
  const filteredDataMemo = useMemo(() => {
    return mergedData.filter(user => {
      return user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [mergedData, searchTerm]);
  
  const pageCount = Math.ceil(filteredDataMemo.length / itemsPerPage);
  return (
    <div style={{ background: '#F4F4F5' }} className="h-full w-full p-8">
      <div className="activeagent rounded-lg bg-white shadow-lg mx-auto justify-start p-4">
        <h1 className="text-2xl font-bold">Active Agent</h1>
        <table className="table-auto text-left w-full mt-8 border-collapse h-52 font-medium">
          <thead className="bg-[#3E97CF] py-4 border">
            <tr className="h-14 p-4 border">
              <th className="border border-#B9B9B9 pl-4 text-white">Name</th>
              <th className="border pl-4 text-white">Email</th>
              <th className="border pl-4 text-white">LogoutTime</th>
              {/* <th className="border pl-4">Details</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredDataMemo
              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map((val, index) => (
                <React.Fragment key={index}>
                  <tr className="border">
                    <td className="border pl-5 py-1">{val.name}</td>
                    <td className="border pl-5 py-1">{val.email}</td>
                    <td className="border pl-5 py-1">{val.logout_time}</td> {/* Display logout time */}
                    {/* <td className="border pl-5 py-1">{val.Details}</td> */}
                  </tr>
                  {/* Edit row */}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination-container flex items-center"}
        previousLinkClassName={"previous-link"}
        nextLinkClassName={"next-link"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
        className="flex flex-wrap mx-auto h-1/6 justify-center  py-1 items-center"
      />









    </div>
  );
}

export default ActiveAgents;
