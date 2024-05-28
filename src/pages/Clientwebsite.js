import React, { useState } from "react";
import { AiOutlineWechat } from "react-icons/ai"; // Import your desired icon


// const questions = ["Name?", "Email?", "Contact No?"]

export default function Clientwebsite() {
  const [showChat, setShowChat] = useState(false);
  // const [currentQuestion, setCurrentQuestion] = useState(config.questions[0]);


  return (
    <div className="flex flex-col lg:flex-row text-center lg:text-justify justify-between items-center h-screen bg-gray-200">
      <div className="lg:ml-64">
        <h1 className="text-5xl font-bold">clientwebsite</h1>
      </div>
      <div className="live-chat ">
        <div className="lg:mr-16 h-32  bottom-0 right-0 p-2 live-chat-icon">


          <div onClick={() => setShowChat(!showChat)} >
            <AiOutlineWechat className="h-32 w-20 bottom-0 text-blue-500 object-bottom  cursor-pointer" />
          </div>

        </div>

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
  );


}
