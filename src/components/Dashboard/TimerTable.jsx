import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TimerComponent from './TimerComponent';

const API_URL = 'your_api_url_here';

function TimersTable() {
  const [isActivePhase1, setIsActivePhase1] = useState(false);
  const [isActivePhase2, setIsActivePhase2] = useState(false);
  const [isActivePhase3, setIsActivePhase3] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/sensors/data/${device_id}`);
        const data = response.data;
        
        // Assuming voltage data is retrieved and stored in variables like phase1voltage, phase2voltage, phase3voltage
        const phase1voltage = parseFloat(data.phase1Voltage);
        const phase2voltage = parseFloat(data.phase2Voltage);
        const phase3voltage = parseFloat(data.phase3Voltage);

        // Phase 1 Voltage conditions
        if (phase1voltage < 50 || phase1voltage >= 150) {
          setIsActivePhase1(phase1voltage < 50);
        }

        // Phase 2 Voltage conditions
        if (phase2voltage < 50 || phase2voltage >= 150) {
          setIsActivePhase2(phase2voltage < 50);
        }

        // Phase 3 Voltage conditions
        if (phase3voltage < 50 || phase3voltage >= 150) {
          setIsActivePhase3(phase3voltage < 50);
        }

      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch data every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Phase</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Phase 1</td>
            <td><TimerComponent name="phase1" isActive={isActivePhase1} /></td>
          </tr>
          <tr>
            <td>Phase 2</td>
            <td><TimerComponent name="phase2" isActive={isActivePhase2} /></td>
          </tr>
          <tr>
            <td>Phase 3</td>
            <td><TimerComponent name="phase3" isActive={isActivePhase3} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TimersTable;
