import React from 'react'
import {FcGoogle} from 'react-icons/fc'

const OAuth = () => {
  return (
    <button className='w-full flex justify-center items-center gap-2 bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded'>
       <FcGoogle className='text-2xl  bg-white rounded-full'/> Continue with Google
    </button>
  )
}

export default OAuth