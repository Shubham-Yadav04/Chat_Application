import React from 'react'
import { useState } from 'react';
import axios from 'axios';
function SignUp() {
    
    const [username,setUsername]= useState("");
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState("");
    const [confirmPassword,setConfirmPassword]= useState("");
    const [message,setMessage]=useState('')
    const handleOAuthLogin = (provider) => {
        console.log("outh2 login proceded")
      
        localStorage.setItem("loginType", "oauth2");
          window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
        };
        const handleSignUp= async(e)=>{
    e.preventDefault();
try {
    if(password === confirmPassword){
    const response= await axios.post("http://localhost:8080/auth/signup",{
        
        username,
        email,
        password
    },
    {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }

    )
    console.log(response.data)
    setMessage("Sign up successfully")
    console.log("user created successfully")
    
}
else{
    setMessage("password and confirm password are not same")
    console.log("password and confirm password are not same")
}
} catch (error) {
    console.log("error occurred",error)
}
setConfirmPassword('')
setPassword('')
setUsername('')
setEmail('')
        }
return (
    
    <div className="flex flex-col items-center justify-center h-full w-full bg-white  border border-2 border-black rounded-lg shadow-md">
        <form className='flex flex-col gap-4 w-full p-4 bg-gray-200 rounded-lg shadow-md justify-center items-center' >
           
            <div>
                <label htmlFor="username" className='text-black w-[132px] text-left inline-block text-lg text-gray-700 font-bold'>Username:</label>
                <input type="text" id="username" name="username" required className='bg-white text-black border border-2'
                value={username}
                onChange={e=>setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="email" className='text-black w-[132px] text-left inline-block text-lg text-gray-700 font-bold'>Email:</label>
                <input type="email" id="email" name="email" required className='bg-white text-black border border-2'onChange={e=>setEmail(e.target.value)} value={email}/>
            </div>
            <div>
                <label htmlFor="password" className='text-black w-[132px] text-left inline-block text-lg text-gray-700 font-bold'>Password:</label>
                <input type="password" id="password" name="password" required className='bg-white text-black border border-2' onChange={e=>setPassword(e.target.value)} 
                value={password}/>
            </div>
            <div>
                <label htmlFor="confirmPassword" className='text-black w-[132px] text-left inline-block text-lg text-gray-700 font-bold'>Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required className='bg-white text-black border border-2' onChange={e=>setConfirmPassword(e.target.value)}
                value={confirmPassword}/>
            </div>
            <button type="submit" className=' w-1/3' onClick={handleSignUp}>Sign Up</button>
        </form>
<>
{
  message?
  <div className="text-md w-full text-blue-600 text-center font-bold bg-gray-200">{ message}</div>
  :
  <></>
}
</>
        <div className="bg-gray-200 p-8  text-center">
       
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
    
)
}

export default SignUp
