import React from 'react';
import GaugeComponent from 'react-gauge-component'
const AddCards = ({ icon, title, count,gaugeProps }) => {
    return (
        <div className="bg-white rounded-lg flex-1 px-3 py-2 flex flex-col items-center h-24">
            <div className="w-full h-4 rounded-lg mb-2"> {icon} </div>
            <h3 className="text-center font-semibold text-sm">{title}</h3>
            <p className="font-semibold text-sm">{count}</p>
            {gaugeProps && <GaugeComponent {...gaugeProps} />}
        </div>
    );
};

export default AddCards;