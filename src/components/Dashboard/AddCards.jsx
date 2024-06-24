import React from "react";
import GaugeComponent from "react-gauge-component";

const AddCards = ({ icon, title, unit, count, gaugeProps, bgColor, smBgColor, onClick }) => {
  return (
    <div
      className={`rounded-lg flex-1 px-3 py-2 flex flex-col items-center h-[8.2rem] bg-white shadow-md ${bgColor} ${smBgColor}`}
      onClick={onClick} // Pass the onClick prop to the main div
    >
      <div className="w-full h-12 flex justify-center items-center mb-1 text-3xl text-blue-900">
        {icon}
      </div>
      <h3 className="text-center h-4 font-bold mb-2">{title}</h3>
      <p className="font-bold text-md mb-2 mt-2">
        {count}
        {unit}
      </p>
      {gaugeProps && (
        <div className="rounded-lg p-2 mt-2 w-full">
          <GaugeComponent {...gaugeProps} />
        </div>
      )}
    </div>
  );
};

export default AddCards;
