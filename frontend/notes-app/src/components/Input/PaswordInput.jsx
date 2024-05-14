import React, { useState } from 'react'
import { FaEye,FaEyeSlash  } from "react-icons/fa";

const Passwordinput = ({value,onChange,placeholder}) => {

  const [isshowpassword,setisshowpassword]=useState(false);

  const toggleshowPassword=()=>{
    setisshowpassword(!isshowpassword);
  }



  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
      <input
        value={value}
        onChange={onChange}
        type={isshowpassword?'text':'password'}
        placeholder={placeholder||'Enter Your Password'}
        className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
      />

      {isshowpassword?<FaEye
        size={22}
        className='text-primary cursor-pointer '
        onClick={()=>toggleshowPassword()}
      />:<FaEyeSlash
      
        size={22}
        className='text-slate-400 cursor-pointer'
        onClick={()=>toggleshowPassword()}
        />}
      

    </div>
  )
}

export default Passwordinput