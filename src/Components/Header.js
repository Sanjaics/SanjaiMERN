import React, { useState } from 'react'
import logoes from "../assest/logoes.png"
import { Link, useSearchParams } from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {FaCartArrowDown} from 'react-icons/fa'
import Login from './Loginpage/Login'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutRedux } from '../Redux/UserSlc'
import  { toast } from 'react-hot-toast'
function Header() {
    const [shadow,setshadow]=useState(false);
    const userData=useSelector((state)=>state.user)
    console.log(userData.Email);
    const handleShow =()=>{
      setshadow(preve => !preve)
    }
    const dispatch=useDispatch()
    const handlelogout=()=>{
      dispatch(LogoutRedux())
      toast("logout successfully")

    }
    console.log(process.env.REACT_APP_ADMIN_EMAIL)
  return (
    <header className='fixed shadow-md w-full h-16 px-2 bg-emerald-200 md:px-4'>
        <div className='flex items-center h-full justify-between'>
          <Link to={""}>
            <div className='h-12'>
              <img src={ logoes} className='h-full'/>
            </div>
          </Link>
          <div className='flex items-center gap-4 md:gap-7'>
            <nav className='flex gap-4 md:gap-6 text-base'>
                 <Link to={""}>Home</Link>
                 <Link to={"Menu/651aac1c6e1383d4355ea2ee"}>Menu</Link>
                 <Link to={"About"}>About</Link>
                 <Link to={"Contact"}>Contact</Link>
            </nav>
           <div className='text-2xl text-slate-600 cursor-pointer ' onClick={handleShow}>
              <div className='border-2 border-solid border-slate-600 p-1 rounded-full w-10 h-10 overflow-hidden drop-shadow-md'>
                {userData.image ? <img src={userData.image} className='h-full w-full'/> :<FaUser/>}
                
              </div>
              {
                shadow && (<div className='absolute right-2 bg-white text-sm py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px]'>
                  {
                   userData.Email === process.env.REACT_APP_ADMIN_EMAIL || <Link to={"NewProduct"} className='whitespace-nowrap cursor-pointer'>New Product</Link>
                  }
                
                  {
                    userData.image ? <p className='cursor-pointer text-white' onClick={handlelogout}>logout</p> :<Link  to={"Login"} className='whitespace-nowrap cursor-pointer'>Login</Link>
                  } 
                  <nav className='text-base flex flex-col'>
                    <Link to={""}>Home</Link>
                    <Link to={"Menu/651aac1c6e1383d4355ea2ee"}>Menu</Link>
                    <Link to={"About"}>About</Link>
                    <Link to={"Contact"}>Contact</Link>
                  </nav>
                
                </div>)
              }
              
              
                
           </div>
           <div className='text-2xl text-slate-600 relative'>
             <FaCartArrowDown/>
              <div className='absolute -top-2 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm  text-center'>
                0
              </div>

           </div>

          </div>
        </div>
    </header>
  )
}

export default Header
