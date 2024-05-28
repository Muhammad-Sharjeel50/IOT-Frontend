import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidbar from '../../components/sidbar/sidbar';
import AgentHistoryPage from './AgentHistoryPage';

export default function Agenthistory() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const endPoint = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    loginData();
  }, []);

  const loginData = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    try {
      const response = await axios.get(`http://${endPoint}:8000/core/total-time-logged-in/`);
      setData(response.data.user_sessions);
      console.log("ddddddddddd",response.data.user_sessions)
      setFilteredData(response.data.user_sessions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  const handleSearch = (query) => {
	setSearchQuery(query);
	const filtered = data.filter((user) => {
	  return user && user.name && user.name.toLowerCase().includes(query.toLowerCase());
	});
	setFilteredData(filtered);
  };

  return (
    <div className="home border flex">
      <div className="flex flex-wrap bg-white rounded-xl h-full w-full">
        <div className="w-2/12">
          <Sidbar isAdmin={isAdmin} />
        </div>
        <div className="w-10/12 h-full flex-col flex flex-wrap rounded-r-lg">
          <div className="h-1/6">
            <Header
              withSearch="true"
              allUsers={data}
              setUsers={setData}
              setFiltered={setFilteredData}
              onSearch={handleSearch} // Pass the handleSearch function to the Header component
            />
          </div>
          <div className="flex h-5/6 flex-wrap">
            {!isAdmin && (
              <div className="w-full h-full">
                <AgentHistoryPage filteredData={filteredData} setUsers={setFilteredData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
