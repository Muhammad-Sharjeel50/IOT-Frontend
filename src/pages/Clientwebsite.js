import React, { useState,useEffect} from "react";
import { AiOutlineWechat } from "react-icons/ai"; // Import your desired icon
import { useNavigate } from 'react-router-dom';

export default function Clientwebsite() {
  const navigate = useNavigate();

  const [showChat, setShowChat] = useState(false);

		// const userToken = localStorage.getItem('user-token')
		// if (userToken) {
		// 	window.location.href = '/Dashboard'
		// }
    //  else{
    //   window.location.href = '/login'
    //  }

  const handdlelogin = () => {
    navigate('/login');
  };

  const handdleregister = () => {
    navigate('/user');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Header with login and signup buttons */}
      <div className="flex justify-between items-center p-4 bg-blue-200 shadow-md">
        <div className="text-2xl font-bold">Smart Home Solution</div>
        <div>
          <button
            className="mx-2 w-24 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handdlelogin}
          >
            Login
          </button>
          <button
            className="mx-2 w-24 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={handdleregister}
          >
            Signup
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row text-center lg:text-justify justify-center items-center flex-grow">
        <div className="lg:ml-8 lg:mr-4 mt-8 lg:mt-0">
          <h1 className="text-4xl lg:text-5xl font-bold">Smart Home Solution</h1>
        </div>
        <div className="live-chat mt-8 lg:mt-0">
          <div className="h-42 w-42 p-2 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div onClick={() => setShowChat(!showChat)}>
              <AiOutlineWechat className="h-32   w-32 text-blue-500 cursor-pointer" />
            </div>
          </div>

          {/* Uncomment and implement the Chatbot component when ready */}
          {/* {showChat && (
            <Chatbot
              headerText="Chats"
              placeholderText="Send a message"
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
