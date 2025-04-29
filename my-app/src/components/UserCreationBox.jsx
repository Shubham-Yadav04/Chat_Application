import React from 'react'
import {Outlet,useNavigate} from 'react-router-dom'
function UserCreationBox() {
    const navigate= useNavigate();
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-white overflow-hidden  p-5 '>
<div  className='flex flex-col justify-center items-center h-fit w-500px bg-white py-2 px-5 gap-4 border border-2 rounded-lg shadow-2xl'>
    <div className='flex gap-4'>
        <button style={{ padding: '10px 20px', cursor: 'pointer' }} onClick={()=>navigate("/signup/login")}>Sign In</button>
        <button style={{ padding: '10px 20px', cursor: 'pointer' }}onClick={()=>navigate('/signup')}>Sign Up</button>
    </div>
    <Outlet />
</div>
</div>
  )
}

export default UserCreationBox
