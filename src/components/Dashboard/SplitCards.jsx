import React from 'react'; 

const SplitCards = ({ bgColor,title,count,unit,smBgColor}) => {
    return (
        <>
          {/* <div className="bg-white rounded-lg justify-around py-2 flex flex-col items-center px-2 shadow-md">
      <div className="flex justify-center items-center mb-1 text-3xl text-black-500">
   
        <h3 className="text-center h-4 font-bold text-sm text-wrap">{title}</h3>
      </div>
      <p className="font-bold  mb-2 mt-2">{count}{unit}</p>

      
    </div> */}


    <div className={` rounded-lg flex-1 py-1 flex flex-col items-center flex-1 bg-white  shadow-md ${bgColor} ${smBgColor}`} >
        <div className=" flex justify-center items-center mb-1 text-blue-900">
        <h3 className="text-center h-4 font-bold mb-2 font-medium lg:white space-wrap text-black">{title}</h3>

        </div>
        <p className="font-bold">{count}{unit}</p>
      </div>

        </>
      




    );
};

export default SplitCards;

// xl:w-[140px] sm:w-auto 