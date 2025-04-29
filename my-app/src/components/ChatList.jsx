import React, { useEffect } from 'react'
import Profiles from '././Profiles'

import { useDispatch, useSelector } from 'react-redux';
import { fetchChatrooms } from '../utils/UserRedux/UserSlice';
function ChatList() {
  
const user = useSelector(state=>state.user).user;
const chatroom= useSelector(state=> state.user.chatroom);

const dispatch= useDispatch();

useEffect(()=>{
if(user){
  dispatch(fetchChatrooms(user?.userId));
  
}
},[user])
console.log(chatroom)
  return (
  
    !user?
    <div className='h-screen w-screen flex justify-center items-center text-black font-bold'> Loading ....</div>
    
    :
    
      <div className='w-full h-full flex flex-col pt-4 px-2 min-w-[20rem]'>
      <h1 className='text-[1.5rem] font-bold text-black'>Chats</h1>
      <div className='scrollbar-y-hidden h-[94%] pt-4 overflow-y-auto flex flex-col gap-3'>
      {
      
    !chatroom 
      ?  <Profiles name={"mySelf"} msg={""} />
    
      :chatroom.map((chatProfile, index) => {
        const freind= chatProfile.participants.filter((u)=>u.username!=user.username)[0]
        

        return(
        <Profiles key={index} name={freind.username}  roomId={chatProfile.id}/>
        )
      }
      )
    }
      </div>
    </div>
    
  )
  
  
}


export default ChatList;
