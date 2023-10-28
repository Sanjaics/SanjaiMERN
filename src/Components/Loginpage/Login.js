import React from 'react'
import  { useState } from 'react'
import loginSignupImage from '../../assest/login-animation.gif'
import { BiShowAlt } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoginRedux } from '../../Redux/UserSlc'

const Login = () => {
  const [password, setpassword] = useState(false);
  
  const [data, setdata] = useState({
   
    Email: "",
    Password: "",
  });
  const navigate=useNavigate()
//redux
  const userData=useSelector(state=>state)
  console.log(userData)
  const dispatch=useDispatch()
  
 
 
  const handlePassword = () => {
    setpassword(preve => !preve)
  }
  
 
  const handleonchange =(e)=>{
    const {name,value}=e.target
    setdata((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {Email,Password}=data
    if(Email&&Password){
      const fetchData =await fetch(`${process.env.REACT_APP_SERVER_DOMAIN }/login`,{
        method : "POST",
        headers :{
          "content-type" :"application/json"
        },
         body: JSON.stringify(data)
       })
       const datares= await fetchData.json()
       console.log(datares)
       toast(datares.message)
       
       if(datares.alert){
         dispatch(LoginRedux(datares))
         navigate("/")
       
        }
        console.log(userData)
      
     }
    else{
         alert("please enter the fields")
    }
  }  
  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
        {/* <h1 className='text-center text-2xl front-bold'>Sign Up</h1>*/}
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
          <img src={loginSignupImage} className='w-full' />
        </div>
        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          
          <label htmlFor='Email' className=''>Email</label>
            <input type={'text'} 
              id='Email'
              name='Email'use
              className=' mt-1 w-full bg-slate-200 px-2 py-1 rounded' 
              value={data.Email}
              onChange={handleonchange}>
                
              </input>
          <label htmlFor='Password' className=''>Password</label>
          <div className='flex px-2 py-1 mt-1 w-full bg-slate-200  rounded'>
            <input type={password ? 'text' : 'password'} 
                id='password' 
                name='Password'
                className=' mt-1 w-full bg-slate-200  rounded border-none outline-none'
                value={data.Password}
                onChange={handleonchange}>
                  
            </input>
            <span className='flex text-xl' onClick={handlePassword}> {password ? <BiShowAlt /> : <BiHide />}</span>

          </div>
          
         
          <button className='max-w-[120px] m-auto w-full bg-slate-400 cursor-pointer text-white text-xl text-center text-medium py-1 rounded-full mt-4'>Login</button>
        </form>
        <p className='text-left text-sm mt-3 '>   Don't Have An Account?<Link to={"/SignUp"} className='text-red-400 underline'>SignUp</Link></p>
      </div>


    </div>
  )
}

export default Login
