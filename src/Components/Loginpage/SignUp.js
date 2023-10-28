import  React, { useState } from 'react'
import loginSignupImage from '../../assest/login-animation.gif'
import { BiShowAlt } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import {Link, useNavigate} from 'react-router-dom'
import { ImageBase64} from '../../utility/Imageupload'
import {toast} from 'react-hot-toast' 

function SignUp() {
  const navigate=useNavigate()
  const [password, setpassword] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState(false);
  const [data, setdata] = useState({
    firstName: "",
    LastName: "",
    Email: "",
    Password: "",
    confirmpassword: "",
    image:""
  });
  console.log(data);
  const handlePassword = () => {
    setpassword(preve => !preve)
  }
  const handleconfirmpassword = () => {
    setconfirmpassword(preve => !preve)
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
  const handleUpload = async(e)=>{
  
    const data= await ImageBase64(e.target.files[0])
    console.log(data)
    setdata((preve)=>{
      return{
        ...preve,
        image:data
      }
    })


  }
   console.log(process.env.REACT_APP_SERVER_DOMAIN)
  const handleSubmit= async(e)=>{
    e.preventDefault()
    const {firstName,Email,Password,confirmpassword}=data
    if(firstName&&Email&&Password&&confirmpassword){
     if(Password===confirmpassword){
        const fetchData =await fetch(`${process.env.REACT_APP_SERVER_DOMAIN }/signup`,{
        method : "POST",
        headers :{
          "content-type" :"application/json"
        },
         body: JSON.stringify(data)
       })
       const datares= await fetchData.json()
       console.log(datares)
       //alert(datares.message)
       toast(datares.message)
       if(datares.alert){
        navigate("/Login")
       }
     }
     else{
      alert("password and confirm password not equal")
     }
    }
    else{
         alert("please check the details")
    }
  };
  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
        {/* <h1 className='text-center text-2xl front-bold'>Sign Up</h1>*/}
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
          <img src={ data.image?data.image:loginSignupImage} className='w-full' />
           <label htmlFor='ProfileImage'>
              <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-40 w-full text-center cursor-pointer'>
                <p className='text-sm p-1 text-white'>Upload</p>
              </div>
              <input type={"file"} id='ProfileImage' accept='image/' className='hidden' onChange={handleUpload}/>
           </label>
        </div>
        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='firstName' className=''>first Name</label>
            <input type={'text'} 
              id='FirstName'
              name='firstName'
              className=' mt-1 w-full bg-slate-200 px-2 py-1 rounded' 
              value={data.firstName}
              onChange={handleonchange}>

            </input>
          <label htmlFor='LastName' className=''>LastName</label>
          <input type={'text'} 
            id='LastName' 
            name='LastName'
            className=' mt-1 w-full bg-slate-200 px-2 py-1 rounded'
            value={data.LastName}
            onChange={handleonchange}>
              
           </input>
          <label htmlFor='Email' className=''>Email</label>
            <input type={'text'} 
              id='Email'
              name='Email'
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
          <label htmlFor='ConfirmPassword' className=''>Confirm Password</label>
          <div className='flex px-2 py-1 mt-1 w-full bg-slate-200  rounded'>
            <input type={confirmpassword ? 'text' : 'password'} 
            id='confirmpassword' 
            name='confirmpassword'
            className=' mt-1 w-full bg-slate-200  rounded border-none outline-none'
             value={data.confirmpassword}
             onChange={handleonchange}>

             </input>
            <span className='flex text-xl' onClick={handleconfirmpassword}> {confirmpassword ? <BiShowAlt /> : <BiHide />}</span>
          </div>
          <button className='max-w-[120px] m-auto w-full bg-slate-400 cursor-pointer text-white text-xl text-center text-medium py-1 rounded-full mt-4'>Sign Up</button>
        </form>
        <p className='text-left text-sm mt-3 '> Alerady Have An Account?<Link to={"/Login"} className='text-red-400 underline'>Login</Link></p>
      </div>


    </div>
  )
}

export default SignUp
