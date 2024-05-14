import React from 'react'

const Header = () => {
  return (
    <div className='p-4  flex justify-between items-center border shadow-sm'>
      <h2>Notes</h2>
      <div className=''>
        <a href='/login' className='bg-white text-black px-3 py-1 rounded-lg border border-black mr-2'>Login</a>
        <a href='/signup' className='bg-black text-white px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:border hover:border-black'>SignUp</a>
      </div>

    </div>
  )
}

export default Header