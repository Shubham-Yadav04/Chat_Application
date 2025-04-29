import React, { useEffect } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

import UserCreationBox from './components/UserCreationBox';
import Landing from './components/landingPage/Landing'
import SignUp from './components/SignUp';
import UserProfileDashboard from './components/dashbaord/UserProfileDashBoard';
function App() {

 
  return (
    
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/signup" element={<UserCreationBox />}>
    <Route index element={<SignUp />} />
    <Route path="login" element={<Login />} />
  </Route>
  
        <Route path="/home" element={<Home/>} />
        <Route path="/profile" element={<UserProfileDashboard/>}/>
      </Routes>
   
  );
}


export default App