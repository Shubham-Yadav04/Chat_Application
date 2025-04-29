import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


import { useWebSocket } from "../utils/WebSocketContext"
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate()

  const handleOAuthLogin = (provider) => {
    console.log("outh2 login proceded")
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  const handleLogin = async () => {
    try {
      console.log("request sended")
      console.log(username, password)
      const response = await axios.post("http://localhost:8080/login/auth", {
        username,
        password
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
      console.log("response received", response)

      const authenticated = document.cookie.includes('authenticated=true');
      if (authenticated) {

       
        setUsername('')
        setPassword('');

        Navigate('/home')
      }

    }
    catch (error) {
      console.log("error occured", error)
    }

  }
  
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 w-full">
      <div className="mb-6 w-96 flex flex-col items-center justify-center p-3">
        <label className="block mb-2 text-lg font-medium text-gray-700 w-full">Username :</label>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <label className="block mb-2 text-lg font-medium text-gray-700 w-full ">Password :</label>
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <button
          className="w-1/4 bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
          onClick={() => handleLogin()}
        >
          Login
        </button>

        <div className="bg-gray-100 p-8  text-center">

          <button
            onClick={() => handleOAuthLogin("google")}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-red-600"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => handleOAuthLogin("github")}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
          >
            Sign in with GitHub
          </button>

        </div>
      </div>
    </div>
  );
}

export default Login
