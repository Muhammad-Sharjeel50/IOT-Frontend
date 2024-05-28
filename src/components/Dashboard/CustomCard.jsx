import React, { useState } from 'react';

const CustomCard = ({ title, icon,name }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleStatus = () => {
    setIsActive(!isActive);
  };


  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
    <div className="bg-white flex flex-col justify-between rounded-lg h-[120px] p-4 shadow-md">
        <div className="flex justify-between items-center">
            <div className="text-2xl">{icon}</div>
            <div className="w-1/2">
                <label className="relative inline-flex items-center mb-1 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                    />
                    <div
                        className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                    />
                </label>
            </div>
        </div>
        <h1 className="px-4">{title}</h1>
    </div>
</div>
  );
};

export default CustomCard;
