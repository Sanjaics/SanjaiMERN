import React, { useEffect, useRef, useState } from 'react'
import HCard from './HCard'
import {useSelector}from 'react-redux'
import CardFeatures from './CardFeatures'
import {GrPrevious} from 'react-icons/gr'
import {GrNext} from 'react-icons/gr'
import FilterProducts from './FilterProducts'


const Home = () => {
  const productData=useSelector((state)=>state.product.productList)
  console.log(productData)
  const homeProductCard=productData.slice(0,4)
  const homeProductCardListVeg = productData.filter(el => el.Category=== "Vegetables")
  console.log(homeProductCardListVeg)
  const loadingArray=new Array(4).fill(null);
  const loadingArrayFreatures=new Array(10).fill(null);
   const slideProductref=useRef()
  const nextProduct =()=>{
    slideProductref.current.scrollLeft +=200
  }
  const preProduct=()=>{
    slideProductref.current.scrollLeft -=200
  }
  const CategoryList= [...new Set(productData.map(el=>el.Category))]
  console.log(CategoryList)

  
  const [datafilter,setdatafilter]=useState(productData)
  useEffect(()=>{
    setdatafilter(productData)
  },[productData])
  

  const handlefilterproduct=(Category)=>{
    const filter =productData.filter(el =>el.Category === Category)
    setdatafilter(()=>{
      return[
         ...filter
      ]
    })
    
  }

   
  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex'>
        <div className=' md:w-1/2'>
          <div className='flex gap-3 bg-slate-400 w-12 px-2'>
            <p className='text-sm  text-slate-600'>Bike Delivery</p>
             <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs6Sg-SFzfL4DboAFhv07BdgzMfZL1J4nk_Q&usqp=CAU' className='h-7'></img>
          </div>
          <h2 className='text-7xl font-bold py-3'>Choose Our Products  <span className='text-red-500 '>to your Home</span></h2>
           <p className='py-3 text-base'>Gone are the days when shoppers would be satisfied seeing some decent products and for the obvious lack of choice, buy them off the shelves anyway. This is the time when brands are locked in fierce competition and each one of them has to offer something valuable to the customer.
              Shoppers are worried more than ever about sustainability, ethics, 
              culture and the process through which products are manufactured and marketed.
            </p>
           <button className='font-bold bg-red-400 text-slate-200 px-4 py-2 rounded'>Order Now</button>
        </div>
        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center' >
          {
            homeProductCard[0] ? homeProductCard.map(el =>{
              return(
                <HCard
                key={el._id}
                image={el.image}
                name={el.name} 
                Price={el.Price}
                Category={el.Category}/>
                
              )
            }) : loadingArray.map(el =>{
                 return(
                   <HCard />
                 )
            })
          }
          
        </div>
       
      </div>
      <div>
      <div className='flex w-full items-center'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>Vegatables</h2>
          <div className='ml-auto flex gap-4 '>
            <button onClick={preProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext/></button>        
          </div>
          <div className='flex gap-5 overflow-scroll scroll-smooth scrollbar-none  transition-all' ref={slideProductref}>
            {
              homeProductCardListVeg[0] ? homeProductCardListVeg.map(el =>{
                return(
                  <CardFeatures
                    key={el._id}
                    name={el.name}
                    Category={el.Category}
                    Price={el.Price}
                    image={el.image}
                  />
                )
              })
              :loadingArrayFreatures.map((el,index) => <HCard
               key={index} loading={"loading..."}/>)
            }
            </div>
          </div>
        </div>
        <div className='my-5'>
        <h2 className='font-bold text-2xl text-slate-800'>Products</h2>
        <div className='flex gap-4 justify-center  scrollbar-none'>
          {
            CategoryList[0] && CategoryList.map(el=>{
              return(
                <FilterProducts Category={el} onClick={()=>handlefilterproduct(el)}/>
              )
            })
          }
         
        </div>
         <div className=' flex flex-wrap justify-center gap-4 my-4 overflow-scroll scroll-smooth scrollbar-none  transition-all'>
          {
            datafilter.map(el =>{
              return (
                <CardFeatures
                key={el.id}
                image={el.image}
                name={el.name}
                Category={el.Category}
                Price={el.Price}/>
              )
            })
          }
         </div>
        </div>
    </div>
  )
}

export default Home
