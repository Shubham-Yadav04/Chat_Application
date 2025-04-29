import React, { useEffect } from 'react'
import Profiles from './Profiles'
import { useState } from 'react'
import axios from 'axios'
function Suggestion() {
    const [suggestions,setSuggestions]=useState([])
    const getSomeRandomUser= async ()=>{
        const response = await axios.get('http://localhost:8080/user/randomusers',{
            withCredentials:true
        })
     
        setSuggestions(response.data);

    }
    useEffect(()=>{
        getSomeRandomUser()
    },[])
  return (
    // this will contain the suggestion of the user with whom user can connect 
    <div className='w-full h-full flex flex-col pt-4 px-2 text-black overflow-y-scroll gap-3 '>
        <h1 className='text-[1.25rem] font-bold text-black'>Add Friends</h1>
    {
        suggestions && suggestions.length > 0 ? 
        suggestions.map((s, index) => 
            <Profiles key={index} name={s.username} />
        ) 
        : 
        "No suggestions right now"
    }

    </div>
  )
}

export default Suggestion
