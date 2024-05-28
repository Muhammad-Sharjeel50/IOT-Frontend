import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/sidbar/sidbar';
import ActiveAgents from './ActiveAgents';

export default function ActiveAgentsmain() {
  const endPoint = process.env.REACT_APP_BASE_URL;
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState([]);
  const [logout, setLogout] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    setIsAdmin(JSON.parse(localStorage.getItem('is_admin')));
    try {
      const url = `http://${endPoint}:8000/core/user/`;
      const response = await axios.get(url);
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error fetching data',
        text: error,
        showCloseButton: true,
      });
    }
  };

  const loginData = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    try {
      const response = await axios.get(
        `http://${endPoint}:8000/core/total-time-logged-in/`
      );
      setLogout(response.data.user_sessions);
      setFilteredData(response.data.user_sessions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    loginData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((user) => {
      return user && user.name && user.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredData(filtered);
  };

  return (
    <div className="home border flex">
      <div className=" flex flex-wrap bg-white rounded-xl h-full w-full">
        <div className=" w-2/12">
          <Sidebar isAdmin={isAdmin} />
        </div>
        <div className="w-10/12 h-full flex-col flex flex-wrap rounded-r-lg">
          <div className="h-1/6">
            <Header
              // withSearch="true"
              allUsers={data}
              onSearch={handleSearch}
            />
          </div>
          <div className="flex h-5/6 flex-wrap">
            <ActiveAgents
              isAdmin={isAdmin}
              filteredData={filteredData}
              setUsers={setFilteredData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
