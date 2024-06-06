import React from 'react'; 

const SplitCards = ({ phase1energy, phase2energy,icon,title,count,unit }) => {
    return (
        <div className="bg-white rounded-lg  px-3 justify-around py-2 flex flex-col items-center h-14 shadow-md">
      <div className="md:w-[140px] sm:w-auto flex justify-center items-center mb-1 text-3xl text-black-500">
   
        <h3 className="text-center h-4 font-bold text-sm ">{title}</h3>
      </div>
      <p className="font-bold  mb-2 mt-2">{count}{unit}</p>

      
    </div>
    );
};

export default SplitCards;
