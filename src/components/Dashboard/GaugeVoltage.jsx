import React from 'react';
import GaugeComponent from 'react-gauge-component'

const GaugeVoltage = ({ title, gaugeProps }) => {
  return (
<div className="rounded-lg flex-1 px-3 py-2  flex flex-col items-center shadow-md">
      <h3 className="text-center font-semibold text-sm text-white">{title}</h3>
      <div className="rounded-lg p-2 h-16 w-full flex items-center justify-center">
        
         {gaugeProps && <div style={{ width: '200px' }}><GaugeComponent {...gaugeProps} /></div>}
      </div>
    </div>
  );
};

export default GaugeVoltage;
