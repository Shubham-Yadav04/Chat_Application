import React from 'react'
import {useNavigate} from "react-router-dom"
function Landing() {
    const navigate= useNavigate();
    const handleClick=()=>{
console.log("login button clicked ")
navigate("/signup/login");
    }
  return (
    <div className="h-full w-full flex justify-center items-center ">
        <h1> Landing Page </h1>
        <button onClick={handleClick} > Login</button>
      
    </div>
  )
}

export default Landing
