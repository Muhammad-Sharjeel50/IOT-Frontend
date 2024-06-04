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





  return (
    <div className="home border flex">
      <div className=" flex flex-wrap bg-white rounded-xl h-full w-full">
        <div className=" w-2/12">
          <Sidebar  />
        </div>
        <div className="w-10/12 h-full flex-col flex flex-wrap rounded-r-lg">
      
          <div className="flex h-5/6 flex-wrap">
            <ActiveAgents
              // isAdmin={isAdmin}
              // filteredData={filteredData}
              // setUsers={setFilteredData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
