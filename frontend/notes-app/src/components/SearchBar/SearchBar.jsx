import React from 'react'
import { IoSearchSharp,IoClose   } from "react-icons/io5";

const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
     <div className="w-80 md:w-70 border-2 border-solid border-slate-200 dark:text-black dark:border-solid dark:border-2 dark:border-slate-400 sm:w-40 sm:ml-2 flex items-center px-4 bg-slate-100 rounded-md">
        <input type="text" placeholder='Search Notes' className="w-full text-xs bg-transparent py-[11px] outline-none" value={value} onChange={onChange}/>


        {value && <IoClose className='text-xl text-slate-500 cursor-pointer hover:text-black hover:dark:text-black mr-3' onClick={onClearSearch} />}
        <IoSearchSharp className='text-slate-400 hover:dark:text-black cursor-pointer hover:text-black' onClick={handleSearch}/>
     </div>
  )
}

export default SearchBar