import React,{useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const Header = () => {
    const [pageState, setpageState] = useState('Sign In')
    const navigate = useNavigate()

    const auth = getAuth()
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setpageState('Profile')
            }else{
                setpageState("Sign In")
            }
        })

    },[auth])

    const location = useLocation()
    const pathMatchRoutes = (route)=>{
        if(route === location.pathname){
            return true
        }
    }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto '>
            <div>
                <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo " className='h-5 cursor-pointer' onClick={()=>{navigate('/')}}/>
            </div>

            <div>
                <ul className='flex space-x-10 '>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-grey-400 border-b-[3px] border-b-transparent ${pathMatchRoutes('/') && 'text-black border-b-red-500'}`} onClick={()=>{navigate('/')}}>Home</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-grey-400 border-b-[3px] border-b-transparent ${pathMatchRoutes('/offers') && 'text-black border-b-red-500'}`} onClick={()=>{navigate('/offers')}}>Offers</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-grey-400 border-b-[3px] border-b-transparent ${(pathMatchRoutes('/sign-in') || pathMatchRoutes('/profile')) && 'text-black border-b-red-500'}`} onClick={()=>{navigate('/profile')}}>{pageState}</li>
                </ul>
            </div>
        </header>
    </div>
  )
}

export default Header