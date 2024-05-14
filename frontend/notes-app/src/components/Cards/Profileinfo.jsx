import React from 'react'
import { getinitials } from '../../utils/helper'

const Profileinfo = ({onLogout,userInfo}) => {
  return (
    <div className="flex items-center gap-3">
        <div className="w-12 sm:hidden ml-2 h-12 flex items-center justify-center rounded-full text-slate-950 dark:text-slate-800 font-medium bg-slate-200">{getinitials(userInfo?.fullName)}</div>

        <div className='sm:w-32 sm:ml-3'>
            <p className="text-sm font-medium dark:text-slate-800">{userInfo?.fullName}</p>
            <button className="text-sm text-slate-700 dark:text-slate-800 underline" onClick={onLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Profileinfo