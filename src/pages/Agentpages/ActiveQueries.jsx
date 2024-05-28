import React, { useState, useEffect, useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiOutlineLockOpen } from "react-icons/hi";
import { BiSolidLock } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdKey } from "react-icons/io";
import Header from "../components/Header/Header";
import Sidebar from "../components/sidbar/sidbar";
import Widget from "../components/Widget/Widget";
import "../styles/ActiveQueries.css"; // Import your CSS file for styling

const itemsPerPage = 10; // Number of items to display per page

export default function ActiveQueries() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://172.20.10.2:8000/core/user/");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="active-queries-container">
      <Header />
      <div className="active-queries-content">
        <Sidebar />
        <div className="active-queries-main">
          <Widget
            className="widget"
            label="Total Accounts"
            count={data.length}
          />
          {/* Add more widgets here as needed */}
          <div className="queries-table">
            <h1 className="table-heading">Active Queries</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Active Assigned</th>
                  <th>Customer</th>
                  <th>Platform</th>
                  <th>Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((val, index) => (
                    <tr key={index}>
                      <td>{val.name}</td>
                      <td>{val.Email}</td>
                      <td>{val.loginTime}</td>
                      <td>{val.Details}</td>
                      <td className="actions">
                        <IoMdKey
                          className="action-icon"
                          onClick={() => handlePasswordReset(val)}
                        />
                        <FaEdit
                          className="action-icon edit"
                          onClick={() => handleUpdate(val)}
                        />
                        {val.is_active ? (
                          <HiOutlineLockOpen
                            className="action-icon lock"
                            onClick={() => handleLockToggle(val)}
                          />
                        ) : (
                          <BiSolidLock
                            className="action-icon lock"
                            onClick={() => handleLockToggle(val)}
                          />
                        )}
                        <FaTrash
                          className="action-icon delete"
                          onClick={() => handleDelete(val)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"pagination-container"}
              previousLinkClassName={"previous-link"}
              nextLinkClassName={"next-link"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
