import React, { useState } from 'react'
import {BsCloudUpload} from 'react-icons/bs'
import { ImageBase64 } from '../../utility/Imageupload'
import { json } from 'react-router-dom'
import toast from 'react-hot-toast'

function NewProduct() {

    const [data,setdata]=useState({
      name: "",
      Category:"",
      image:"",
      Price:"",
      Description:"",
    })

    const handleonchange =(e)=>{
      const {name,value}=e.target
      setdata((preve)=>{
        return{
          ...preve,
          [name]:value
        }
      })
    }
    const handleSubmit=async(e)=>{
      e.preventDefault()
      console.log(data)

      const {name,image,Category,Price}=data
      if(name && image && Category && Price){
        const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
          method:"POST",
          headers :{
            "content-type": "application/json"
          },
          body :JSON.stringify(data)
  
        })
         const fetchres=await fetchData.json()
         console.log(fetchres)
         toast(fetchres.message)
         setdata(()=>{
          return{
            name: "",
            Category:"",
            image:"",
            Price:"",
            Description:"",

          }
         })
      }
      else{
        toast("Enter the fields")
      }
      
    }
    const uploadImage=async(e)=>{
      const data= await ImageBase64(e.target.files[0])
     //console.log(data)
     setdata((preve)=>{
      return{
        ...preve,
        image:data
      }
     })

    }
  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md bg-white shadow flex flex-col p-3' onSubmit={handleSubmit}>
        <label htmlFor='name' >Name</label>
        <input type={"text"} name='name' className='bg-slate-300 p-1 my-1' onChange={handleonchange} value={data.name}/>
        <label htmlFor='Category'>Category</label>
          <select className='bg-slate-300 p-1' id='Category' name='Category' onChange={handleonchange}value={data.Category}>
            <option value={"other"}>Select Category</option>
            <option value={"Vegetables"}>Vegatables</option>
            <option value={"Icream"}>Icream</option>
            <option value={"Foods"}>Foods</option>
            <option value={"Rice"}>Rice</option>
            <option value={"Fruits"}>Fruits</option>
            <option value={"Cake"}>Cake</option>
          </select>
        <label htmlFor='image'>Image
          <div className='h-40 w-full bg-slate-300 my-3 rounded flex items-center justify-center cursor-pointer'>
            {
              data.image?<img src={data.image} className='h-full'/>:<span className='text-5xl'><BsCloudUpload/></span>
            }
             
            <input  id='image' type={'file'} accept="image/" name='image' onChange={uploadImage} className='hidden cursor-pointer' ></input>
          </div>
         </label>

         <label htmlFor='Price' className='my-1'>Price</label>
         <input type={'text'} className='bg-slate-400 p-1 my-1' name='Price' onChange={handleonchange} value={data.Price}></input>
         
         <label htmlFor='Description' className='my-1' name='Description'>Description</label>
         <textarea rows={2} className='bg-slate-400 p-1 my-1' name='Description'  onChange={handleonchange} value={data.Description}></textarea>

         <button className='bg-slate-500 hover:bg-slate-600 text-lg font-bold my-2 shadow'> Save</button>
      </form>

     
    </div>
  )
}

export default NewProduct
