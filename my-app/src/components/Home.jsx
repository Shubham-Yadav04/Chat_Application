import { React, useEffect } from 'react'
import ChatSection from './ChatSection'
import { useState } from 'react';
import ChatList from './ChatList';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import Suggestion from './Suggestion';
import UserProfileDashboard from './dashbaord/UserProfileDashBoard';
import { UserIcon } from './Svgs/UserIcon'
import { SettingsIcon } from './Svgs/SettingsIcon'
import { MessageIcon } from './Svgs/MessageIcon'
import { AddFriendsIcon } from './Svgs/AddFriendsIcon'
import { getUserFromUserId } from '../utils/UserRedux/UserSlice'
import { useWebSocket } from '../utils/WebSocketContext';
import SettingPage from './SettingPage';
import axios from 'axios';
function Home() {
  const [loading, setLoading] = useState(true);
  const [sectionValue, setSectionValue] = useState(1)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const checkAuth=async()=>{
const response = await axios.get("http://localhost:8080/check/auth",{
  withCredentials:true
})
  }
  const { connectWebSocket } = useWebSocket();
  useEffect(() => {
checkAuth()
    const authenticated = document.cookie.includes('authenticated=true');



    if (!authenticated) {
      navigate("/signup/login");
    }
    dispatch(getUserFromUserId());
    setLoading(false)
    connectWebSocket()

  }, [dispatch]);

  return (
    <>
      {loading ? <div className='flex flex-col items-center justify-center w-screen h-screen bg-gray-200'>
        <p>Loading...</p>
      </div>
        :
        <div className='w-screen h-screen bg-gray-200 flex flex-row   '>
          <div className="w-[50px] bg-gray-200 border-r-2 border-gray-400 flex flex-col items-center justify-between  h-full">
            <div className="mt-4">
              <div className="w-[32px] h-[32px]  rounded-full flex items-center justify-center mb-3 cursor-pointer" onClick={() => setSectionValue(1)}>
                <MessageIcon />
              </div>
              <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center mb-3 cursor-pointer" onClick={() => setSectionValue(2)}>
                <AddFriendsIcon />
              </div>
            </div>
            <div>
              <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center mb-3 cursor-pointer" onClick={() => setSectionValue(3)}>
                <SettingsIcon />
              </div>
              <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center mb-3 cursor-pointer" onClick={() => setSectionValue(4)}>
                <UserIcon />
              </div>
            </div>
          </div>
          <div className="w-1/4 min-w-[20rem] flex flex-col gap-2 bg-gray-200 border-r-2 border-gray-400">
            {(() => {
              switch (sectionValue) {
                case 1:
                  return <ChatList />;
                case 2:
                  return <Suggestion />;
                case 3:
                  return <SettingPage />;
                case 4:
                  return <UserProfileDashboard />;

                default:
                  return <ChatList />;
              }
            })()}
          </div>
          <ChatSection />
        </div>
      }
    </>
  )
}

export default Home
