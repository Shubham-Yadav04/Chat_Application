import React from 'react'
import { useCurrentChat } from '../utils/CurrentChatContext.jsx';

import { useWebSocket } from '../utils/WebSocketContext.jsx';
import { useDispatch } from 'react-redux';
import { setCurrentChatRoom } from '../utils/UserRedux/UserSlice.jsx';
import { addNewMessageToCurrentChatRoomMsg } from '../utils/UserRedux/UserSlice.jsx';
function Profiles(props) {
    const { setReceiverProfile } = useCurrentChat();
   const dispatch= useDispatch();
   const {stompClient}=useWebSocket()
    const handleProfileSelection=async(props)=>{
setReceiverProfile(props)
if(props.roomId && stompClient){
    stompClient.subscribe(`/topic/chatroom/${props.roomId}`, (message) => {
        const msg = JSON.parse(message.body);
        console.log(`Received new message in room ${props.roomId}:`, msg);
   
        dispatch(addNewMessageToCurrentChatRoomMsg(msg));
      })
}
dispatch(setCurrentChatRoom(props))
   }

 
  return (
    <div className='w-full flex px-4  items-center gap-4 hover:cursor-pointer' onClick={() => handleProfileSelection(props)}>
        <div className='rounded-full  h-[45px] bg-black  overflow-hidden  w-[45px]'>
        <img src={props.image} alt="" className='w-full h-full object-cover' />
        </div>
        <div className=' flex flex-col p-1 w-[80%]'>
            <h1 className='text-[1.25rem] font-bold text-black'>{
                props.name? props.name: "ContactName"
                }</h1>
        
           
            <p className='text-[1rem] font-bold h-[1.5rem] overflow-hidden text-black'>
                {
                    props.msg ? props.msg.slice(0,20)+"...": props.bio? props.bio:""
                    // if the current message is greater than the length of 20 characters, then we will show the first 20 characters of the message and then add "..." at the end of the message if there are multiple messages we will show x number of new messages 
                   
                }
      
            </p>
           

        </div>
      
    </div>
  )
}

export default Profiles
