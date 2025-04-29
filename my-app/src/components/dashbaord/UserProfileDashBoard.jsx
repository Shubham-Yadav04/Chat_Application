import React from 'react';
import { useSelector } from 'react-redux';

const UserProfileDashboard = () => {
    const user = useSelector(state=>state.user).user;
  
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center gap-5 ">
      <div className='w-full h-fit p-3'>
      <h1 className='text-[1.375rem] font-bold text-[#111]'>Profile</h1>
      </div>
      <div className='w-full h-fit flex flex-col items-center justify-center gap-5'>
        <div className='rounded-full  h-[200px] bg-black  overflow-hidden  w-[200px]'>
          <img src={user.image} alt="" className='w-full h-full object-cover' />
        </div>
        <div className='w-full h-fit flex flex-col items-center justify-center gap-5 items-start p-5'>
        <h1 className='text-[1rem] font-bold text-black w-full'>Your Name </h1>
        <h1 className='text-[0.8rem] font-bold text-black w-full'>{user.username?user.username:"username"}</h1>
        </div>
        <div className='w-full h-fit flex flex-col items-center justify-center gap-5 items-start p-5'>
        <h1 className='text-[1rem] font-bold text-black w-full text-start'>Bio</h1>
        <p className='text-[0.8rem] font-bold h-[1.5rem] overflow-hidden text-black w-full'>{user.bio?user.bio:"this the bio of the user "}</p>
        </div>
    </div>
    </div>
  );
};

export default UserProfileDashboard;
