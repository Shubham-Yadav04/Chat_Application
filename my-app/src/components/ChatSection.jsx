import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCurrentChat } from '../utils/CurrentChatContext';

function ChatSection() {
  const [message, setMessage] = useState("");
  const user = useSelector(state => state.user).user;
  const { receiverProfile, addMessages } = useCurrentChat();
  const currentChatRoomMsg = useSelector(state => state.user.currentChatRoomMsg);

  const chatEndRef = useRef(null);  // Reference to the chat container for auto-scrolling

  const handleSendMessage = () => {
    // Message send logic
    const receiverName = receiverProfile.name;
    const senderName = user.username;
    const content = message;

    addMessages({ senderName, receiverName, content });
    setMessage(''); // clear the input field
  };

  // Sort messages in descending order based on the date
  const sortedMessages = [...currentChatRoomMsg]?.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Scroll to the bottom whenever the messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChatRoomMsg]);  // This will trigger whenever currentChatRoomMsg changes

  return (
    <div className='w-3/4 h-screen flex flex-col p-5 pb-1 gap-5 overflow-hidden'>
      {receiverProfile ? (
        <>
        <div className='chatBox h-[90%] w-[100%] flex flex-col '>
          <div className='header w-[100%] flex flex-row fixed z-40 bg-gray-200 h-[60px] items-center '>
            <div className='h-full w-fit flex flex-row justify-start items-start'>

            <div className='rounded-full h-[55px] bg-black overflow-hidden w-[55px]'>
              <img src={receiverProfile.image} alt="" className='w-full h-full object-cover' />
            </div>
            <h1 className='text-[1.5rem] font-bold text-black pl-4'>{receiverProfile.name}</h1>
            </div>
            <div className='w-fit h-full bg-blue-300'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="black"
                className="w-6 h-[50px] cursor-pointer "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 6a.75.75 0 110-1.5.75.75 0 010 1.5zm0 6a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </div>
          </div>

          <div className='flex flex-col overflow-y-auto my-2 h-[90%] w-full relative top-[8%] custom-scroll px-4'>
            {sortedMessages && sortedMessages.length > 0 ? (
              sortedMessages.map((message, index) => (
                <div key={index} className={`flex flex-col ${message.sender.username === user.username ? "items-end" : "items-start"}`}>
                  <div className={`rounded-lg p-2 my-1 ${message.sender.username === user.username ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                    <p className='text-[12px] font-bold'>{message.message}</p>
                  </div>
                  <p className='text-[10px] text-black font-semibold'>{message.sender.username}</p>
                </div>
              ))
            ) : (
              <div className='w-full h-full flex justify-center items-center'>
                <h1 className='text-[1.5rem] font-bold text-black'>No messages yet</h1>
              </div>
            )}
            <div ref={chatEndRef} /> 
          </div>

         
        </div>
         <div className='inputBox h-[8%] w-[100%] flex flex-row px-5 gap-4 pb-1 relative bottom-[0%]'>
         <textarea
           className='w-[90%] text-md pt-3 px-5 resize-none scrollbar-hidden rounded-lg focus:outline-none'
           type='text'
           placeholder='Type your message here'
           value={message}
           onChange={e => setMessage(e.target.value)}
           onKeyDown={(e) => {
             if (e.key === 'Enter' && !e.shiftKey) {
               e.preventDefault();
               handleSendMessage();
             }
           }}
         />
         <button className='bg-blue-500 text-white text-md px-3' onClick={handleSendMessage}>Send</button>
       </div>
       </>
      ) : (
        <div className='w-full h-full flex justify-center items-center'>
          <h1 className='text-[1.5rem] font-bold text-black'>WELCOME</h1>
        </div>
      )}
    </div>
  );
}

export default ChatSection;
