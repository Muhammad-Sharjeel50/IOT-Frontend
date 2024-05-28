import React from "react";
import Sidebar from "../../components/sidbar/sidbar";
import Header from "../../components/Header/Header";
// import AllUser from "./AllUser";
// import Dashboard from "./Dashboard";
import AgentHistoryPage from "../Agentpages/AgentHistoryPage";
import Agentsms from "./Agentsms";
import { useState, useEffect } from "react";

export default function Agentsmsmain() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  return (
    <div className="home border">
      {/* <div style={{ width: '1300px' }} className='  bg-gray-200'> */}
      {/* <div>
                    <Header />
                </div> */}
      {/* <div className='flex'> */}

      <div className=" w-full">
        <div className="relative flex">
          <div className=" ">
            <div>
              <Sidebar />
            </div>
          </div>
          <div className="w-full ">
            <Header allUsers={data} setUsers={setData}/>

            <Agentsms allUsers={data}
              filteredData={filteredData}
              setAgent={setFilteredData} />
            {/* <AgentHistoryPage/> */}
          </div>

          <div className="w-32 bg-background: #F4F4F5 absolute mt-0 right-12 h-full">
            
          </div>
        </div>
      </div>
    </div>
  );
}
