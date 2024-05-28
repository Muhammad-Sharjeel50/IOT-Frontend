import React from "react";
import Sidbar from "../components/sidbar/sidbar";
import Header from "../components/Header/Header";
import Rightblock from "../components/Righticons/Rightblock";

import AgentHistoryPage from "./AgentHistoryPage";
import Agentvoice from "./Agentvoice";
export default function Agentvoicemain() {
  return (
    <div className="home border">
      <div className=" w-full">
        <div className="relative flex">
          <div className=" ">
            <div>
              <Sidbar />
            </div>
          </div>
          <div className="w-full ">
            <Header />

            <Agentvoice />
          </div>

          <div className="w-32 bg-background: #F4F4F5 absolute mt-0 right-12 h-full">
            <Rightblock />
          </div>
        </div>
      </div>
    </div>
  );
}
